const mongoose = require('mongoose');
const usermodel = mongoose.model('user');
const ObjectId = require('mongoose').Types.ObjectId;

async function getReminderEmailList(lesson){
    try{
        console.log(lesson)
        let list = ""
        if(lesson.students.length ==0){
            return "Error"
        }
        for(let i = 0; i <lesson.students.length; i++){
            if(ObjectId.isValid(lesson.students[i])){
                let user = await usermodel.findById(lesson.students[i])       
                console.log(user)
                if(user != null && user.email != null && list.indexOf(String(user.email)) == -1){
                    list += String(user.email) + ", ";
                }
            }
        }
        return  list[list.length-2] == ","? list.substring(0, list.length-2):list;
    }
    catch(err){
        console.log("ERROR " + err)
        return "ERROR"
    }
}

module.exports = {getReminderEmailList}