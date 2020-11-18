const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
 
const moviesSchema = new Schema({
    title: {
        type: String,
        required:true,
    },

    imagesUrl:[
        {
            type:String
        }
    ]
})


module.exports = mongoose.model('Movie', moviesSchema);