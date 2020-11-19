const User = require('../models/User');
const Auth = require('../utils/Auth');

/*
    If user exist:
        Send response with error;
    Else
        Create new user, generate token and sent it to the client
*/

const register = (req, res) => {
    
    const { email, name, password } = req.body;

    User.exists({ email })
    .then(exist => {
        if (exist)
            return res.status(422).json(["Email already exist"]);
    })

    User.create({ email,name,password })
        .then(user => {
            if (user._id) {
                token = Auth.generateToken(user._id);
                return res.status(200).json({ userid: user._id, token: token });
            }
        })
        .catch(err => {
            console.log(err);
    })

}

module.exports = register;