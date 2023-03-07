const mongoose = require('mongoose');
const lessonmodel = mongoose.model('lesson');

async function getTodayLesson(){
    try{
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0); // set to start of today
        
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999); // set to end of today
        
        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
        startOfTomorrow.setHours(0, 0, 0, 0); // set to start of tomorrow
        
        const endOfTomorrow = new Date(endOfToday);
        endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);
        endOfTomorrow.setHours(23, 59, 59, 999); // set to end of tomorrow
        
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
        console.log("ERROR")
        return "ERROR"
    }
}
module.exports = getTodayLesson