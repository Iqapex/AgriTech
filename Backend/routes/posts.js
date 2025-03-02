const Post = require('../models/Post');
const User = require('../models/User');
const postRouter = require('express').Router();
const path = require('path');

//create a post
postRouter.post('/', async (req, res) => {
    const newPost = new Post(req.body);

    // postId = newPost._id

    // console.log(req.body)

    const savePost = async () => {
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (req.files) {
        const uid = req.body.userId

        const file = req.files.file

        const fileExt = path.extname(file.name)

        const mFileName = `${uid}_post_${Date.now()}${fileExt}`

        newPost.fileName = mFileName

        movePath = path.join(__dirname, "..", 'uploads', path.sep, mFileName)

        file.mv(movePath, err => {
            if (err) {
                console.log("File upload error: " + err)
                res.status(500).json({ error: "File upload failed" });
            } else {
                savePost()
            }
        })
    }
    else {
        savePost();
    }
});

//update a post
postRouter.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.updateOne({ $set: req.body });
            res.status(200).json("Post Updated");
        } else {
            res.status(403).json("You can update only your Posts");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete a post
postRouter.delete('/:id/:userId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.params.userId) {
            await Post.deleteOne();
            res.status(200).json("Post deleted");
        } else {
            res.status(403).json("You can delete only your Posts");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//like / dislike a post
postRouter.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("UnLiked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//comment on a post
postRouter.put(`/addcomment/:id`, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        await post.updateOne({ $push: { comments: req.body } });
        res.status(200).json("Comment Posted!");
    } catch (err) {
        res.status(500).json(err);
    }
})

//get a post
postRouter.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})

//get the file of the post
postRouter.get('/:currentUid/:postId/file', async (req, res) => {

    const postId = (req.params.postId).toString()
    const currentUserId = (req.params.currentUid).toString()

    const getUserContactList = async (userId) => {
        const user = await User.findById(userId);
        const contacts = await Promise.all(
            user.contacts.map(contactId => {
                return User.findById(contactId);
            })
        )
        let contactList = [];
        contacts.map(contact => {
            const { _id, firstname, lastname, isLawyer, profilePic } = contact;
            contactList.push(_id.toString());
        });
        return contactList;
    }

    try {
        const post = await Post.findById(postId);

        postedByUserId = post.userId
        //we need userId from req.body
        const contactList = await getUserContactList(postedByUserId)

        const isInContactList = contactList.includes(currentUserId) //this is also false if currentUserId == null

        // console.log(postedByUserId)
        // console.log(currentUserId)


        const isAllowed = (postedByUserId === currentUserId) || isInContactList

        if (isAllowed) {
            // send file
            res.sendFile(path.join(__dirname, "..", 'uploads', path.sep, post.fileName))
        } else {
            res.status(500).send("Not allowed")
        }

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

//feed
postRouter.get('/feed/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: user._id });
        const contactPosts = await Promise.all(
            user.contacts.map((userId) => {
                return Post.find({ userId: userId });
            })
        );
        res.status(200).json(userPosts.concat(...contactPosts));
    } catch (err) {
        res.status(500).json(err);
    }
})

//timeline
postRouter.get('/timeline/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: user._id });
        res.status(200).json(userPosts);
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = postRouter;