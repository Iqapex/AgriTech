const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const path = require('path');
const { Blob } = require('buffer');

//Update User
userRouter.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).send("You can update only your account");
    }
});

//Delete User
userRouter.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account Deleted!");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).send("You can delete only your account");
    }
});

//Get a User
userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, isAdmin, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Get contacts
userRouter.get("/contacts/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const contacts = await Promise.all(
            user.contacts.map(contactId => {
                const contact = User.findById(contactId);
                if (contact.profilePic)
                    contact.profilePic = URL.createObjectURL(new Blob(path.join(__dirname, "..", 'uploads', path.sep, contact.profilePic)));
                return contact;
            })
        )
        let contactList = [];
        contacts.map(contact => {
            const { _id, firstname, lastname, isLawyer, profilePic } = contact;
            contactList.push({ _id, firstname, lastname, isLawyer, profilePic });
        });
        res.status(200).json(contactList);

    } catch (err) {
        res.status(500).json(err);
    }
})

//Connect User
userRouter.put('/:id/requestConnect', async (req, res) => {
    if (req.body.userId != req.params.id) {
        try {
            const user = await User.findById(req.body.userId);
            const to_user = await User.findById(req.params.id);
            if (!to_user.contacts.includes(req.body.userId) && !user.sentContact.includes(req.params.id)) {
                await to_user.updateOne({ $push: { pendingContacts: { contactorId: req.body.userId, seen: false } } });
                await user.updateOne({ $push: { sentContact: req.params.id } });
                res.status(200).json("Request Sent!");
            }
            else if (user.sentContact.includes(req.params.id)) {
                await to_user.updateOne({ $pull: { pendingContacts: { contactorId: req.body.userId, seen: false } } });
                await user.updateOne({ $pull: { sentContact: req.params.id } });
                res.status(200).json("Request Unsent!");
            }
            else {
                res.status(403).json("Invalid");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
});
userRouter.put('/:id/acceptConnect', async (req, res) => {
    if (req.body.userId != req.params.id) {
        try {
            const user = await User.findById(req.body.userId);
            const to_user = await User.findById(req.params.id);
            if (!to_user.contacts.includes(req.body.userId)) {
                await to_user.updateOne({ $push: { contacts: req.body.userId } });
                await user.updateOne({ $push: { contacts: req.params.id } });

                //Removing from pending Contacts and sent Contact
                await to_user.updateOne({ $pull: { sentContact: req.body.userId } });
                await user.updateOne({ $pull: { pendingContacts: { contactorId: req.params.id, seen: { $in: [true, false] } } } });
                res.status(200).json("Request Accepted!");
            } else {
                res.status(403).json("Invalid");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
});

//Disconnect User
userRouter.put('/:id/deleteConnect', async (req, res) => {
    if (req.body.userId != req.params.id) {
        try {
            const user = await User.findById(req.body.userId);
            const to_user = await User.findById(req.params.id);
            if (to_user.contacts.includes(req.body.userId)) {
                await to_user.updateOne({ $pull: { contacts: req.body.userId } });
                await user.updateOne({ $pull: { contacts: req.params.id } });
                res.status(200).json("Connection Deleted!");
            } else {
                res.status(403).json("Invalid");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't disConnect yourself");
    }
});

// search for lawyers
userRouter.post(`/search/lawyers`, async (req, res) => {
    var regex = new RegExp(req.body.name, 'i');
    try {
        const users = req.body.city ? await User.find(
            {
                firstname: regex,
                isLawyer: req.body.isLawyer,
                'geoLocation.city': req.body.city,
            }) :
            await User.find(
                {
                    firstname: regex,
                    isLawyer: req.body.isLawyer,
                });

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

//search for users
userRouter.post(`/search/users`, async (req, res) => {
    var regexfirstname = new RegExp(req.body.firstname, 'i');
    var regexlastname = new RegExp(req.body.lastname, 'i');
    try {
        const users = await User.find(
            {
                firstname: regexfirstname,
                lastname: regexlastname,
            })

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

//rate a user
userRouter.put(`/rate/:userId`, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user.rating.some(rating => rating.userId === req.body.userId)) {
            await user.updateOne({ $pull: { rating: { userId: req.body.userId } } });
            await user.updateOne({ $push: { rating: { userId: req.body.userId, rating: req.body.rating } } });
        } else {
            await user.updateOne({ $push: { rating: { userId: req.body.userId, rating: req.body.rating } } });
        }
        res.status(200).json("Rated");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = userRouter;