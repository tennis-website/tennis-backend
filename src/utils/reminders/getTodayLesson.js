const mongoose = require('mongoose');
const lessonmodel = mongoose.model('lesson');


async function getTodayLesson(){
    try{
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0); // set to start of today in UTC

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999); // set to end of today in UTC

        const startOfTomorrow = new Date(Date.UTC(startOfToday.getUTCFullYear(), startOfToday.getUTCMonth(), startOfToday.getUTCDate() + 1, 0, 0, 0)); // set to start of tomorrow in UTC

        const endOfTomorrow = new Date(Date.UTC(startOfTomorrow.getUTCFullYear(), startOfTomorrow.getUTCMonth(), startOfTomorrow.getUTCDate(), 23, 59, 59, 999)); // set to end of tomorrow in UTC  

        // find documents where the 'date' field falls within tomorrow's date range
        const matchingDocuments = await lessonmodel.find({
        date: {
            $gte: startOfTomorrow,
            $lte: endOfTomorrow,
        },
        });
        if (matchingDocuments.length === 1) {
        return matchingDocuments[0];
        } else {
            return "Error";
        }
    }
    catch(err){
        console.log("ERROR Lesson"+ err.message)
        return "ERROR"
    }
}
module.exports = {getTodayLesson}