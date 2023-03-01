
//const sendEmail = require('../../factoids/weeklyfactoids/factoidlist');
//const subjects = require('../../factoids/weeklyfactoids/factoidlist');
//const bodies = require('../../factoids/weeklyfactoids/factoidlist');
//const address = require()

const sendAnnouncementDefinition = (agenda) => {
     
    agenda.define("sendAnnouncement",  { shouldSaveResult: true }, async(job, done)=>{
        
        //var addresses = await address.getusers()
        //var subjects = await subject.getsubjects(addresses)
        //var bodies = await body.getsubjects(bodies)
        //await sendEmail.sendEmail(addresses, subjects, bodies)
        console.log("messages sent")
        done();
    })
}
module.exports = {sendAnnouncementDefinition}



