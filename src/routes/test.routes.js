const express = require('express');
const router = express.Router();

const{
    test,
}= require("../controllers/test.controller")

router.post('/api/testServer', test);

module.exports = router;