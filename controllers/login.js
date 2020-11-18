const User = require('../models/User');
const Auth = require('../utils/Auth');
const bcrypt = require('bcrypt');   

const postLogin = (req, res) => {
    
    const { email, name, password } = req.body;
    if (!email || !name || !password)
        return res.status(422).json("Please fill all fields.");
    if(!Auth.ValidateEmail(email))
        return res.status(422).json('Email is invalid');
    
    User.findOne({ email:email, name:name })
        .then(user => {
            if (user && user._id && bcrypt.compareSync(password, user.password)) {
                token = Auth.generateToken(user._id);
                return res.status(200).json({ userid: user._id, token: token });
            }
            return res.status(422).json("Email or password are incorrect");

        })
        .catch(err => {
            console.log(err);
    })

}

const getLogin = (req, res) => {
    const { authorization } = req.headers;
    const userid = Auth.verifyToken(authorization);

    if (!userid)
        return res.status(401).json("Not authorized");

    
    return res.status(200).json({ userid: userid, token: authorization });

}

module.exports = {
    postLogin,
    getLogin
}