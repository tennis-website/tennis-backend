const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    instructors: [
        { type: String },
    ],
    students: [
        { type: String },
    ],
    studentsNames: [
        { type: String },
    ],
    time:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: false
    },
    coordinates:{
        type: String,
        required: false
    },
    maxStudents:{
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: false
    }
}, {
    versionKey: false
})

mongoose.model('lesson', lessonSchema);