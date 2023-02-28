const express = require('express');
const checkServerrouter = express.Router();

const{
    checkServer,
}= require("../controllers/checkServer.controller")

checkServerrouter.get('/api/checkServer', checkServer);

module.exports = checkServerrouter;