const https = require('https');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const mongoose = require('mongoose');
const mongo =`mongodb+srv://sagicd:a37qQJeHtBn7xMhF@cluster0.s4bdp.mongodb.net/interview?retryWrites=true&w=majority`

mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(data => {
        console.log('connected');
            addUser('https://randomuser.me/api/?results=1000');
    })
    .catch(err => {
        console.log(err);
})


function addUser(url){

        https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
           data = JSON.parse(data);
           const results = data.results;

           const users = results.map(result => {
              const user = {};
              user.name = `${result.name.first} ${result.name.last}`;
              user.email = result.email;
              const salt = bcrypt.genSaltSync(10);
              user.password =  bcrypt.hashSync(user.email, salt);
              return user;
           })
           users.map(user=>{
              User.create({email:user.email,name:user.name,password:user.password})
             .then(result => {
                console.log("add user successfully")
             })
             .catch(err => {
                console.log(err);
             })              
           })


        });

      })
       .on("error", (err) => {
        console.log(err);
      });
}

