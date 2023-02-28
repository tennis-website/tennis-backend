const mongoose = require('mongoose');
const testmodel = mongoose.model('test');

async function checkServer(req, res){
    try{
        var query = {tester: "true"}
        var found = await testmodel.findOne(query)
        return res.json(found.message)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

module.exports = {
    checkServer
}