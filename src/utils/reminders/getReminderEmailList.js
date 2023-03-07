const mongoose = require('mongoose');
const usermodel = mongoose.model('user');

async function getReminderEmailList(lesson){
    try{
        let list = ""
        if(lesson.students.length ==0){
            return "Error"
        }
        for(let i = 0; i <lesson.students.length; i++){
            let user = usermodel.findById(students[i])
            i<lesson.students.length-1?list += String(user.email) + ", ": list += String(user.email);
        }
        return list;
    }
    catch(err){
        console.log("ERROR")
        return "ERROR"
    }
}
module.exports = getReminderEmailList