const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    tester: {
        type: String,
        required: false
    }
})

mongoose.model('test', testSchema);