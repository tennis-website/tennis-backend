const express = require('express');
const app = express();

const test = require('./routes/test.routes')
const checkServer = require('./routes/checkServer.routes')
const user = require("./routes/user.routes")


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(test)
app.use(checkServer)
app.use(user)


app.get('/', (req, res) => {
    const name = process.env.NAME || 'World';
    res.send(`Hello ${name}!`);
  });

module.exports = app;