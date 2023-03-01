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
    maxStudents:{
        type: String,
        required: false
    },
    location: {
        type: Number,
        required: false
    }
}, {
    versionKey: false
})

mongoose.model('lesson', lessonSchema);