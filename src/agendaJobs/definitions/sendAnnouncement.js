const Send = require("../../utils/reminders/sendEmail");
const EmailList = require("../../utils/reminders/getReminderEmailList");
const Subject = require("../../utils/reminders/getReminderSubject");
const Body = require("../../utils/reminders/getReminderBody");
const Lesson = require("../../utils/reminders/getTodayLesson");
const Schedule = require("../../utils/reminders/getLessonScheduling")

const sendAnnouncementDefinition = (agenda) => {
    agenda.define("scheduleAnnouncements", { shouldSaveResult: true, concurrency: 100, priority: 10 }, async(job, done)=>{
        let dates = await Schedule.getLessonScheduling()
        for(let i = 0; i<dates.length;i++){
            agenda.schedule(dates[i], "sendAnnouncement")
        }
        console.log("announcements scheduled")
    })
    agenda.define("sendAnnouncement",  { shouldSaveResult: true, concurrency: 100, priority: 10 }, async(job, done)=>{
        let lesson = await Lesson.getTodayLesson()
        if(lesson == "Error"){ 
            console.log("ERRORR LESSSON ISSUE ")
            done()
        } 
        let emails = await EmailList.getReminderEmailList(lesson)
        if(emails == "Error"){ 
            console.log("ERRORR EMAIL ISSUE ")
            done()
        } 
        let body = await Body.getReminderBody(lesson)
        if(body == "Error"){ 
            console.log("ERRORR BODY ISSUE ")
            done()
        } 
        let subject = await Subject.getReminderSubject(lesson)
        if(subject == "Error"){ 
            console.log("ERRORR SUBJECT ISSUE ")
            done()
        } 
        let result = await Send.sendMail(emails,subject, body)
        if(result == "Error"){ 
            console.log("ERRORR SENDING ISSUE ")
            done()
        } 
        console.log("mail sent")
        done();
    })
}
module.exports = {sendAnnouncementDefinition}



