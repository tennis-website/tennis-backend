const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    emailList:{
        type: Boolean,
        required: false
    },
    admin:{
        type: Boolean,
        required: false
    }
}, {
    versionKey: false
})

mongoose.model('user', userSchema);