const mongoose = require('mongoose');
const usermodel = mongoose.model('user');

async function getReminderBody(lesson){
    try{
        return "<b>Hello World? <b>"
    }
    catch(err){
        console.log("ERROR")
        return "ERROR"
    }
}
module.exports = getReminderBody