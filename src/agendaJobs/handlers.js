

const JobHandlers = {
    /*
    dailyNotification: async (job, done) => {
        var user = await users.getusers()
        var notibody = await body.getbody(user)
        var titles = await title.getTitle(user)
        var tickets = await message.sendTitledNotification(user, notibody, titles)
        console.log("daily notifications sent")
        receipt.getreceipts(tickets)
        done();
    },
    */
};
  
module.exports = { JobHandlers }