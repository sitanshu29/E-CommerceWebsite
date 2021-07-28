const User = require("../models/user")

exports.createOrUpdateUser = async (req, res) => {

    const { name, email, picture } = req.user;

    const user = await User.findOneAndUpdate({ email },
        { name: email.split("@")[0], picture },
        { new: true });

    if (user) {
        console.log("User Updated", user);
        res.json(user);
    }
    else {
        const newUser = await new User({
            email,
            picture,
            name: email.split("@")[0],
        }).save();
        console.log("User Cretaed", newUser);
        res.json(newUser);
    }
};

exports.currentUser = async (req, res) => {
    User.findOne({ email: req.user.email }).exec((err, user) => {
        if (err) {
            console.log("here");
            throw new Error(err);
        }
        else
            res.json(user);

    })
}