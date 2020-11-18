const User = require('../models/User');
const Auth = require('../utils/Auth');

const register = (req, res) => {
    
    const { email, name, password } = req.body;
    if (!email || !name || !password)
        return res.status(422).json("Please fill all fields.");
    
    User.exists({ email })
    .then(exist => {
        console.log(exist);
        if (exist)
            return res.status(422).json("Email already exist");
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