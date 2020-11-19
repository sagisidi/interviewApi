const User = require('../models/User');
const Auth = require('../utils/Auth');
const bcrypt = require('bcrypt');   

/*
Search for user with the same name and email
    If user exist:
        -Compare between provided and svaed password
            -If password match:
                -Generate token and send userid and token to the client
            Else
                Send response with error
    If user doesnt exist:
        send response with error
*/

const postLogin = (req, res) => {
    
    const { email, name, password } = req.body;


    
    User.findOne({ email:email, name:name })
        .then(user => {
            if (user && user._id && bcrypt.compareSync(password, user.password)) {
                token = Auth.generateToken(user._id);
                return res.status(200).json({ userid: user._id, token: token });
            }
            return res.status(422).json(["Email, Name or password are incorrect"]);

        })
        .catch(err => {
            console.log(err);
    })

}

/*
Check if token already exist and if its verified token 
*/
const getLogin = (req, res) => {
    const { authorization } = req.headers;
    const userid = req.userid;

    
    return res.status(200).json({ userid: userid, token: authorization });

}

module.exports = {
    postLogin,
    getLogin
}