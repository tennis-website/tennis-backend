const mongoose = require('mongoose');
const lessonmodel = mongoose.model('lesson');

async function makeLesson(req, res){
    var { date,instructors,time, students,studentsNames, location,address, coordinates, maxStudents} = req.body;
    try{
        var myId = mongoose.Types.ObjectId()
        if(typeof(date) == "number"){
            date = new Date(date * 1000)
        }
        if(typeof(date) == "string"){
            date = new Date(date)
        }
        
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        // find documents where the 'date' field falls within the target day
        
        const matchingDocuments = await lessonmodel.find({
        date: {
            $gte: startOfDay,
            $lt: endOfDay,
        },
        });

        if(matchingDocuments.length >0){
            res.status(402).send({ error: "A lesson is already on that Date" })
            return
        }
        
        await lessonmodel.create({ 
            _id: myId,
            maxStudents: maxStudents,
            date: date, 
            instructors: instructors, 
            students: students,
            studentsNames: studentsNames,
            address: address,
            coordinates: coordinates,
            time: time,
            location: String(location),
            reminded: false
        })
        return res.json(myId)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

async function getLessonbyID(req, res){
    const {_id} = req.query;
    try{
        var query = {_id: _id}
        lesson = await lessonmodel.findOne(query)
        return res.json(lesson)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

async function getLessonsbyStudentID(req, res){
    const {studentID} = req.query;
    try{
        var query = {students: studentID}
        lessons = await lessonmodel.find(query)
        return res.json(lessons)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
async function getLessonsbyStudentName(req, res){
    const {studentName} = req.query;
    try{
        var query = {studentsNames: studentName}
        lessons = await lessonmodel.find(query)
        return res.json(lessons)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
async function patchLessonAddStudent(req, res){
    const {student, studentName} = req.body;
    try{
        if(req.body._id != null){
            let query = {_id: req.body._id }
            var lesson = await lessonmodel.findOne(query)
        }
        else if(req.body.date != null){
            let query = {date: req.body.date}
            var lesson = await lessonmodel.findOne(query)
        }
        else{
            res.status(422).send({ error: "Please enter Date or ID" })
            return
        }
        lesson.students.push(student)
        lesson.studentsNames.push(studentName)
        await lesson.save();
        return res.json(lesson)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
async function patchLesson(req, res){
    const {_id} = req.body;
    try{
        var query = {_id: _id}
        lesson = await lessonmodel.findOne(query)
        if(req.body.date != undefined){
            lesson.date = req.body.date
        }
        if(req.body.time != undefined){
            lesson.time = req.body.time
        }
        if(req.body.maxStudents != undefined){
            lesson.maxStudents = req.body.maxStudents
        }
        if(req.body.instructors != undefined){
            lesson.instructors = req.body.instructors
        }
        if(req.body.address != undefined){
            lesson.address = req.body.address
        }
        if(req.body.coordinates != undefined){
            lesson.coordinates = req.body.coordinates
        }
        if(req.body.students != undefined){
            lesson.students = req.body.students
        }
        if(req.body.studentsNames != undefined){
            lesson.studentsNames = req.body.studentsNames
        }
        if(req.body.location != undefined){
            lesson.location = req.body.location
        }
        await lesson.save();
        return res.json(lesson)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
async function getAllLessons(req, res){
    try{
        const now = new Date();
        const utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
        console.log(utcDate)
        const ending = await lessonmodel.find({ date: { $gte: utcDate } }).sort({ date: 1 });
        console.log(ending)
        return res.json(ending);
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

module.exports = {
    makeLesson,
    getLessonbyID,
    getLessonsbyStudentID,
    getLessonsbyStudentName,
    patchLessonAddStudent,
    patchLesson,
    getAllLessons
}