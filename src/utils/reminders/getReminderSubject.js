
async function getReminderSubject(lesson){
    try{
        info = lesson.date.toUTCString().split(" ")
        //Mon Apr 03 2023 21:34:01 GMT-0700 (Pacific Daylight Time)
        //Appointment Reminder: Student Meeting is on Friday, March 3, 2023 6:00pm PST
        return "Lesson Reminder: Your Next Lesson is on " + abbrevDayToFull[info[0].replace(",", "")]+", "+ abbrevMonthToFull[info[2]]+" "+String(parseInt(info[1]))+", "+info[3] +" "+lesson.time+" PST"
    }
    catch(err){
        console.log("ERROR subject"+ err.message)
        return "ERROR"
    }
}


const abbrevDayToFull = {
    'Sun': 'Sunday',
    'Mon': 'Monday',
    'Tue': 'Tuesday',
    'Wed': 'Wednesday',
    'Thu': 'Thursday',
    'Fri': 'Friday',
    'Sat': 'Saturday'
};
const abbrevMonthToFull = {
'Jan': 'January',
'Feb': 'February',
'Mar': 'March',
'Apr': 'April',
'May': 'May',
'Jun': 'June',
'Jul': 'July',
'Aug': 'August',
'Sep': 'September',
'Oct': 'October',
'Nov': 'November',
'Dec': 'December'
};

module.exports = {getReminderSubject}