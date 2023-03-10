const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    users: [
        { type: String },
    ],
    messages: [
        { type: String },
    ],
}, {
    versionKey: false
})

mongoose.model('request', requestSchema);