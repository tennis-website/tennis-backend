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
    location: {
        type: String,
        required: false
    }
}, {
    versionKey: false
})

mongoose.model('lesson', lessonSchema);