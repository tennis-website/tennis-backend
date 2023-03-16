const mongoose = require('mongoose');
const lessonmodel = mongoose.model('lesson');
const convertTime = require('convert-time');
const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    apiKey: 'AIzaSyB3V2yTv11sv-RvJwjAGeu2x6LKEavAsTA',
  };

const geocoder = NodeGeocoder(options);

async function makeLesson(req, res){
    var { date,instructors,time, location,address, maxStudents} = req.body;
    try{
        if(typeof(date) == "number"){
            date = new Date(date * 1000)
        }
        if(typeof(date) == "string"){
            date = new Date(date)
        }
        if(date == null){
            return res.status(401).send({ error: "Please Enter a Date" })
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
        if(time == null){
            return res.status(408).send({ error: "Please Enter Time" })
        }
        try{
            time = convertTime(String(time), "hh:MM A")
        }
        catch(err){
            return res.status(403).send({ error: "Invalid Time" })
        }
        if(location == null){
            return res.status(409).send({ error: "Please Enter Location" })
        }
        if(address == null){
            return res.status(407).send({ error: "Please Enter Address" })
        }
        let coordinates =[]
        await geocoder.geocode(String(address)).then((res) => {
            if(res.length === 0) {
                return res.status(410).send({ error: "Invalid Address" })
            } 
            else {
                coordinates = [res[0].latitude, res[0].longitude]
                address = res[0].formattedAddress.substring(0, res[0].formattedAddress.lastIndexOf(","))
            }
        })
        .catch((err) => {
            return res.status(411).send({ error: "Try Changing Address" })
        });
        if(coordinates.length !=2){
            return res.status(412).send({ error: "Coordinate Error" })
        }
        if(maxStudents == null){
            return res.status(405).send({ error: "Please Enter Max Students" })
        }
        if(maxStudents < 1){
            return res.status(399).send({ error: "Max Students must be positive" })
        }
        if(instructors == null || instructors.length ==0){
            return res.status(406).send({ error: "Please Enter Instructors" })
        }

        var myId = mongoose.Types.ObjectId()
        await lessonmodel.create({ 
            _id: myId,
            maxStudents: maxStudents,
            date: date, 
            instructors: instructors, 
            students: [],
            studentsNames: [],
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
        lessons = await lessonmodel.find(query).sort({ date: 1 })
        return res.json(lessons)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
async function getPastLessonsbyStudentID(req, res){
    const {studentID} = req.query;
    try{
        var query = {students: studentID, date: { $lt: new Date() } }
        lessons = await lessonmodel.find(query).sort({ date: 1 })
        return res.json(lessons)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
async function getFutureLessonsbyStudentID(req, res){
    const {studentID} = req.query;
    try{
        var query = {students: studentID,  date: { $gte: new Date() }}
        lessons = await lessonmodel.find(query).sort({ date: 1 })
        return res.json(lessons)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
async function getPastLessonsbyStudentName(req, res){
    const {studentName} = req.query;
    try{
        var query = {studentsNames: studentName, date: { $lt: new Date() } }
        lessons = await lessonmodel.find(query).sort({ date: 1 })
        return res.json(lessons)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
async function getFutureLessonsbyStudentName(req, res){
    const {studentName} = req.query;
    try{
        var query = {studentsNames: studentName, date: { $gte: new Date() } }
        lessons = await lessonmodel.find(query).sort({ date: 1 })
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
        const offset = now.getTimezoneOffset() * 60000; // Convert to milliseconds
        const utcDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) - offset);
        const ending = await lessonmodel.find({ date: { $gte: utcDate } }).sort({ date: 1 });
        return res.json(ending);
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

async function deletelessons(req, res){
    const {_id} = req.query
    try{
        lessonmodel.deleteOne({_id: _id}).then(function(){
            return res.json("Data deleted"); // Success
        })
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

module.exports = {
    deletelessons,
    makeLesson,
    getLessonbyID,
    getLessonsbyStudentID,
    getPastLessonsbyStudentName,
    getFutureLessonsbyStudentName,
    getPastLessonsbyStudentID,
    getFutureLessonsbyStudentID,
    patchLessonAddStudent,
    patchLesson,
    getAllLessons
}