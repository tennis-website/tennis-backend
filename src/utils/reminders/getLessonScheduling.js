const mongoose = require('mongoose');
const lessonmodel = mongoose.model('lesson');

async function getLessonScheduling(){
    try{
        dates = []
        const now = new Date();
        const utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
        utcDate.setUTCDate(utcDate.getUTCDate() - 1);
        const lessons = await lessonmodel.find({ reminded: false, date: { $gt: utcDate } });
        for(let i =0; i < lessons.length;i++){
            let timedate = new Date(lessons[i].date)
            timedate.setUTCHours(12, 0, 0, 0)
            timedate.setHours(timedate.getHours() + 8)
            timedate.setDate(timedate.getDate() - 1);
            if(timedate.getTime() >= now.getTime()){
                dates.push(timedate)
                lessons[i].reminded = true
                await lessons[i].save();
            }
        }
        return dates
    }
    catch(err){
        console.log("ERROR Lesson"+ err.message)
        return "ERROR"
    }
}
module.exports = {getLessonScheduling}