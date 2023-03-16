
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(emaillist, subject, htmltext) {
    try{
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "thewestlaketennisacademy@gmail.com", // your Gmail email address
            pass: "rkgb aruj nrre jksu", // your Gmail password or app-specific password
        },
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: 'Westlake Tennis Academy" <thewestlaketennisacademy@gmail.com>', // sender address
        to: String(emaillist), // list of receivers
        subject: String(subject), // Subject line
        html: htmltext
        });
        
        console.log("Message sent: %s", info.messageId);
        return("Message sent: %s", info.messageId)
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }
    catch(err){
        console.log("error sending" + err.message)
        return "ERROR"
    }
  }
module.exports =  {sendMail}