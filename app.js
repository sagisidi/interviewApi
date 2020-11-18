const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bParser = require('body-parser');

const register = require('./controllers/register');
const login = require('./controllers/login');
const profile = require('./controllers/profile');

const app = express();

app.use(cors());
app.use(bParser.json())

app.post('/register', register);
app.get('/login', login.getLogin);
app.post('/login', login.postLogin);
app.get('/profile',profile.getProfile)
app.post('/profile',profile.addToWishList)
app.delete('/profile',profile.removeFromWishList)



const mongo =`mongodb+srv://sagicd:a37qQJeHtBn7xMhF@cluster0.s4bdp.mongodb.net/interview?retryWrites=true&w=majority`

mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(data => {
        console.log('connected');
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    })
