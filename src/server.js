require('dotenv').config();


require('./models/test.model');
require("./models/request.model")
require('./models/user.model');
require('./models/lesson.model')
require('./models/application.model')

const app = require('./app');
const mongoose = require('mongoose');


// Use Port 8080 for google cloud
//const PORT = 3000;
const PORT = process.env.PORT || 8080;

const mongoUri = process.env.MONGO_URI
//for gcloud make sure to not use env
//const mongoUri = url here
mongoose.connect("PUBLIC VERSION", {dbName: 'TennisInitiativeDB', useUnifiedTopology: true});

require("./agendaJobs/agenda")

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
