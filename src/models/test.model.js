const mongoose = require('mongoose');

const test = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    tester: {
        type: String,
        required: false
    }
})

mongoose.model('test', test);