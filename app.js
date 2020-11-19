const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bParser = require('body-parser');

const register = require('./controllers/register');
const login = require('./controllers/login');
const profile = require('./controllers/profile');

const validate = require('./middlewares/validation');
const requiredAuth = require('./middlewares/authorized');

const app = express();

app.use(cors());
app.use(bParser.json())

app.post('/register',validate('email','password','name'), register);
app.post('/login', validate('email','password','name'), login.postLogin);
app.get('/login',requiredAuth,login.getLogin);
app.post('/profile',requiredAuth,profile.addToWishList)
app.get('/profile',requiredAuth,profile.getProfile)
app.delete('/profile',requiredAuth,profile.removeFromWishList)



const mongo =`mongodb+srv://sagicd:a37qQJeHtBn7xMhF@cluster0.s4bdp.mongodb.net/interview?retryWrites=true&w=majority`

mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(data => {
        console.log('connected');
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => {
        console.log(err);
    })
