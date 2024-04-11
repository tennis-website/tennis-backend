const express = require('express');
const applicationrouter = express.Router();

const{
    submitApplication,
    getApplication
}= require("../controllers/application.controller")

applicationrouter.get('/api/getApplications', getApplication);
applicationrouter.post('/api/submitApplication', submitApplication)

module.exports = applicationrouter;
