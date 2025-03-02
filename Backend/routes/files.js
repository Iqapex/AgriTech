const filesRouter = require('express').Router();
const User = require('../models/User');
const File = require('../models/File');
const path = require('path');
const fs = require('fs');

//get all file objects
filesRouter.post('/', async (req, res) => {
    const storagePath = path.join(__dirname, "..", 'Storage');

    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath);
    }

    const testFolder = path.join(__dirname, "..", 'Storage', path.sep, req.body.userId);

    if (!fs.existsSync(testFolder)) {
        fs.mkdirSync(testFolder);
        return res.status(200).send([]);
    }


    try {
        const fileObjects = await File.find({ owner: req.body.userId, inBin: false });
        res.status(200).send(fileObjects);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get a file
filesRouter.get('/:userId/:storedName', async (req, res) => {

    try {
        const fileObj = await File.findOne({ storedName: req.params.storedName });
        if (fileObj.owner === req.params.userId || fileObj.sharedWith.includes(req.params.userId)) {
            const directoryPath = path.join(__dirname, "..", 'Storage', path.sep, fileObj.owner);

            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath);
            }
            res.sendFile(path.join(__dirname, "..", 'Storage', path.sep, fileObj.owner, path.sep, req.params.storedName));
        }
        else
            res.status(401).json({ error: "Cannot access this file!" });
    } catch (err) {
        res.status(500).json(err);
    }
})

//get a file object using fileObj._id
filesRouter.get('/shared/:userId/:fileId', async (req, res) => {

    try {
        const fileObj = await File.findById(req.params.fileId);
        if (fileObj.owner === req.params.userId || fileObj.sharedWith.includes(req.params.userId)) {
            const directoryPath = path.join(__dirname, "..", 'Storage', path.sep, fileObj.owner);

            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath);
            }
            res.send(fileObj);
        }
        else
            res.status(401).json({ error: "Cannot access this file!" });
    } catch (err) {
        res.status(500).json({ error: 'Invalid' });
    }
})


//upload a file
filesRouter.post('/fileUpload/', async (req, res) => {
    const userId = req.body.userId;
    const file = req.files.file;
    const storedName = `${Date.now()}${Math.round(Math.random() * 1E9)}${path.extname(file.name)}`;


    const newFile = new File({
        owner: userId,
        fileName: file.name,
        storedName,
    });

    const storagePath = path.join(__dirname, "..", 'Storage');

    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath);
    }

    const directoryPath = path.join(__dirname, "..", 'Storage', path.sep, userId);

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }

    const movePath = path.join(__dirname, "..", 'Storage', path.sep, userId, path.sep, storedName);


    file.mv(movePath, async (err) => {
        if (err)
            res.status(500).json(err);
        else {
            const savedPost = await newFile.save();
            res.status(200).send(savedPost);
        }
    })
})


//get directory size
filesRouter.post(`/directorySize`, async (req, res) => {

    const storagePath = path.join(__dirname, "..", 'Storage');

    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath);
    }

    const directoryName = req.body.userId;
    const directoryPath = path.join(__dirname, "..", 'Storage', path.sep, directoryName);

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }

    var totSize = 0;

    try {
        fs.readdir(directoryPath, (err, files) => {
            if (files === null)
                res.status(200).send(0);
            files.forEach(file => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                const filePath = path.join(directoryPath, path.sep, file);
                totSize += parseFloat(fs.statSync(filePath).size);
            });
            res.status(200).json(totSize);
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//update shared list
filesRouter.put('/shared/', async (req, res) => {

    try {
        const file = await File.findById(req.body.fileId);
        if (file.owner === req.body.userId) {
            await file.updateOne({
                $set: { sharedWith: req.body.sharedWith }
            });
            res.status(200).json(file);
        }
        else {
            res.status(401).json({ error: 'Unauthorized access' });
        }
    } catch (err) {

        res.status(500).json(err);
    }
});




//Bin

//get bin files
filesRouter.post('/bin', async (req, res) => {
    const storagePath = path.join(__dirname, "..", 'Bin');

    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath);
    }

    const testFolder = path.join(__dirname, "..", 'Bin', path.sep, req.body.userId);

    if (!fs.existsSync(testFolder)) {
        fs.mkdirSync(testFolder);
    }

    try {
        const fileObjects = await File.find({ owner: req.body.userId, inBin: true });
        res.status(200).send(fileObjects);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//Delete a file
filesRouter.post('/delete/:fileName', async (req, res) => {
    const binFolder = path.join(__dirname, "..", 'Bin', path.sep, req.body.userId);

    if (!fs.existsSync(binFolder)) {
        fs.mkdirSync(binFolder);
    }
    const file = await File.findOne({ storedName: req.params.fileName });



    try {
        if (file.owner === req.body.userId) {
            const currentPath = path.join(__dirname, "..", 'Storage', path.sep, req.body.userId, req.params.fileName);
            const destinationPath = path.join(__dirname, "..", 'Bin', path.sep, req.body.userId, req.params.fileName);

            fs.rename(currentPath, destinationPath, async (err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    const updatedFile = await File.findByIdAndUpdate(file._id, { $set: { inBin: true } });
                    res.status(200).json(updatedFile);
                }
            });
        }
        else {
            res.status(401).json({ error: "Unauthorized access" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



//restore file in bin
filesRouter.post('/bin/:fileName', async (req, res) => {
    const storagePath = path.join(__dirname, "..", 'Bin');

    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath);
    }

    const binFolder = path.join(__dirname, "..", 'Bin', path.sep, req.body.userId);
    const file = await File.findOne({ storedName: req.params.fileName });

    if (!fs.existsSync(binFolder)) {
        fs.mkdirSync(binFolder);
    }



    try {
        if (file.owner === req.body.userId) {
            const currentPath = path.join(__dirname, "..", 'Bin', path.sep, req.body.userId, req.params.fileName);
            const destinationPath = path.join(__dirname, "..", 'Storage', path.sep, req.body.userId, req.params.fileName);

            fs.rename(currentPath, destinationPath, async (err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    const updatedFile = await File.findByIdAndUpdate(file._id, { $set: { inBin: false } });
                    res.status(200).json(updatedFile);
                }
            });
        }
        else {
            res.status(401).json({ error: "Unauthorized access" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

filesRouter.delete('/permanentDelete', async (req, res) => {

    try {
        console.log(req.body.fileId + " " + req.body.userId)
        const fileObj = await File.findById(req.body.fileId);
        if (fileObj.owner === req.body.userId) {
            const destinationPath = path.join(__dirname, "..", 'Bin', path.sep, req.body.userId, fileObj.storedName);
            fs.unlinkSync(destinationPath);
            await fileObj.remove();
            res.status(200).send('Deleted!');
        }
        else {
            res.status(401).json({ error: 'Unauthorized' })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//others

//upload Profile pic
filesRouter.post('/uploadProfilePic/', async (req, res) => {
    const userId = req.body.userId;
    const file = req.files.file;

    const fileExt = path.extname(file.name);
    const profilePic = `${userId}_profilePic_${Date.now()}${fileExt}`;

    try {
        const user = await User.findByIdAndUpdate(userId, {
            $set: { profilePic }
        });

        const movePath = path.join(__dirname, "..", 'uploads', path.sep, profilePic);


        file.mv(movePath, err => {
            if (err)
                res.status(500).json(err);
            else {
                res.status(200).send(profilePic);
            }
        })
    }
    catch (err) {
        res.status(500).json(err);
    }

});

//get profile pic
filesRouter.get('/get/profilePic/:fileName', async (req, res) => {

    try {
        res.sendFile(path.join(__dirname, "..", 'uploads', path.sep, req.params.fileName));
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = filesRouter;