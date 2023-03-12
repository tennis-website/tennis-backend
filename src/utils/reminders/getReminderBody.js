const mongoose = require('mongoose');
const lessonmodel = mongoose.model('lesson');
const reminderEmail = require("./reminderEmail")
const googleURl = require("./getGoogleMapsUrl")

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

async function getReminderBody(lesson){
    try{
        let info = lesson.date.toUTCString().split(" ")
        let date = abbrevDayToFull[info[0].replace(",", "")]+", "+ abbrevMonthToFull[info[2]]+" "+String(parseInt(info[1]))+", "+info[3]

        let instructors = lesson.instructors

        let googleMapsUrl = googleURl.getGoogleMapsURl(lesson.address)

        const endtime = new Date(`March 12, 2023 ${lesson.time}`);
        endtime.setHours(endtime.getHours() + 1);
        const updatedTimeStr = endtime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        let time = lesson.time + " - "+ updatedTimeStr

        let streetAddress = lesson.address.subString(0, lesson.address.indexOf(","))
        let cityStateZipaddress = lesson.address.subString(lesson.address.indexOf(",")+1, lesson.address.length)
        reminderEmail.generateEmailBodyHTML(date,time,instructors,location,googleMapsUrl,streetAddress,cityStateZipaddress)
    }
    catch(err){
        console.log("ERROR")
        return "ERROR"
    }
}
module.exports = {getReminderBody}