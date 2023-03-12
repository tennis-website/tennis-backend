/*
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
//async function sendMail(emaillist, subject, htmltext) {
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
        html: "<html><head><title>Online HTML Editor</title><style>.Title{text-align: center;font-weight: bold;font-size: 350%;}@font-face {font-family: 'Raleway';src: url('raleway.woff2') format('woff2'), url('raleway.woff') format('woff'); }body {font-family: Raleway, sans-serif;}.TopDate{text-align: center;font-weight: bold;font-size: 200%;}.hr-style {width: 85%;border: 0;height: 2px;background: black;background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));}.backgroundborder-radius: 20px;margin-left:12.5%;width: 75%;background-color: #E3E3E3;text-align: center;font-size: 175%;padding-top: 5%;padding-bottom: 5%;}.instructors{display: flex;flex-direction: row; }</style></head><body><h1 class='Title'>Lesson Reminder</h1><h2 class ='TopDate'>Monday, April 2, 2023</h2><hr class='hr-style'><h2 class ='TopDate'>10:00 AM-11:00 AM</h2><div class = 'background'><h4 class = 'InTitle'>INSTRUCTORS:</h4><div class = 'instructors'><p>Jai Garg</p>    </p> Ethan Kang</p></div></div></body></html>", // html body
        });
        
        console.log("Message sent: %s", info.messageId);
        return("Message sent: %s", info.messageId)
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }
    catch(err){
        console.log("error " + err.message)
        console.log("ERROR")
        return "ERROR"
    }
  }
  sendMail()
module.exports =  {sendMail}
*/

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line*/
    html: "<html><head><title>Online HTML Editor</title><style>.Title{text-align: center;font-weight: bold;font-size: 350%;}@font-face {font-family: 'Raleway';src: url('raleway.woff2') format('woff2'), /* Modern Browsers */url('raleway.woff') format('woff'); /* Legacy Browsers */}body {font-family: Raleway, sans-serif;}.TopDate{text-align: center;font-weight: bold;font-size: 200%;}.hr-style {width: 85%;border: 0;height: 2px;background: black;background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));}.background {border-radius: 20px;margin-left:12.5%;width: 75%;background-color: #E3E3E3;text-align: center;font-size: 175%;padding-top: 5%;padding-bottom: 5%;}.instructors{display: flex;flex-direction: row; }</style></head><body><h1 class='Title'>Lesson Reminder</h1><h2 class ='TopDate'>Monday, April 2, 2023</h2><hr class='hr-style'><h2 class ='TopDate'>10:00 AM-11:00 AM</h2><div class='background'><h4 class='InTitle'>INSTRUCTORS:</h4><div class='instructors'><p>Jai Garg</p><p>Ethan Kang</p></div></div></body></html>",
  })
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);