const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Sr. Instructor', 'Jr. Instructor','Advertising Manager'],
        required: true
    },
    lastName: { 
        type: String,
        required: true
    },
    firstName: { 
        type: String,
        required: true
    },
    dob: { 
        type: Date,
        required: true
    },
    email: { 
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    utr:{
        type: String,
        required: false
    },
    school:{
        type: String,
        required: false
    } 
}, {
    versionKey: false
})

mongoose.model('application', applicationSchema);