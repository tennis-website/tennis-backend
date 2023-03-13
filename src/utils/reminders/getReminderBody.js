

const reminderEmail = require("./reminderEmail")
const googleURl = require("./getGoogleMapsUrl")





async function getReminderBody(lesson){
    try{
        let info = lesson.date.toUTCString().split(" ")
        let date = abbrevDayToFull[info[0].replace(",", "")]+", "+ abbrevMonthToFull[info[2]]+" "+String(parseInt(info[1]))+", "+info[3]

        let instructors = Object.values(lesson.instructors)

        let googleMapsUrl = await googleURl.getGoogleMapsURl(lesson.address)

        const endtime = new Date(`March 12, 2023 ${lesson.time}`);
        endtime.setHours(endtime.getHours() + 1);
        const updatedTimeStr = endtime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        let time = lesson.time + " - "+ updatedTimeStr

        let streetAddress = lesson.address.substring(0, lesson.address.indexOf(","))
        let cityStateZipaddress = lesson.address.substring(lesson.address.indexOf(",")+2, lesson.address.length)
        console.log(date)
        console.log(instructors)
        console.log(googleMapsUrl)
        console.log(time)
        console.log(streetAddress)
        console.log(cityStateZipaddress)
        return reminderEmail.generateEmailBodyHTML(date,time,instructors,lesson.location,googleMapsUrl,streetAddress,cityStateZipaddress)
    }
    catch(err){
        console.log("ERROR Body"+ err.message)
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

module.exports = {getReminderBody}
