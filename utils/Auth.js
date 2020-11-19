const jwt = require('jsonwebtoken');

function generateToken(userid) {
    return jwt.sign({ userid: userid }, 'SECRET-KEY-INTERVIEW');
}

function verifyToken(token) {
    return jwt.verify(token, 'SECRET-KEY-INTERVIEW', function(err, decoded) {
        if (err || !decoded || !decoded.userid)
            return false;
        else
            return decoded.userid
    });
}


module.exports = {
    generateToken,
    verifyToken
}