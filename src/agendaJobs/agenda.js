require("dotenv").config();

require("./definitions/sendAnnouncement")
const uri = "mongodb+srv://Jai_Garg:H3wHp60utQZeZNpN@tennisinitiativecluster.t5zacqa.mongodb.net/?retryWrites=true&w=majority";
const { allDefinitions } = require("./definitions");
const Agenda = require('agenda');
const agenda = new Agenda({
    db: { 
        address: uri, 
        //while testing change collection to agenda
        collection: 'agendaJobs', 
        options: { useUnifiedTopology: true }, 
        },
        processEvery: "10 seconds",
        maxConcurrency: 30,
    });


agenda
 .on('ready', () => {
    agenda.start();
    console.log("Agenda started!")
    //agenda.every("9 * * * * *", "sendAnnouncement")
    agenda.every("0 0 12 * * 0", "sendAnnouncement")

})
.on('error', () => console.log("Agenda connection error!"));

allDefinitions(agenda)

console.log({ jobs: agenda._definitions });

module.exports = agenda
