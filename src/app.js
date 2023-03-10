const express = require('express');
const app = express();

const checkServer = require('./routes/checkServer.routes')
const user = require("./routes/user.routes")
const lesson = require("./routes/lessons.routes")
const request = require("./routes/request.routes")

const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(checkServer)
app.use(user)
app.use(lesson)
app.use(request)

app.get('/', (req, res) => {
    const name = process.env.NAME || 'World';
    res.send(`Hello ${name}!`);
  });

module.exports = app;