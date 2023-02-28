const mongoose = require('mongoose');
const testmodel = mongoose.model('test');
const random = require("../utils/randomnum")

async function test(req, res){
   const { number } = req.body;
    try{
        var output = []
        for(var i =0; i <number; i++){
            temp = await testmodel.find()
            output.push(temp[random.rand(0,temp.length-1)].message)
        }
        return res.json(output)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

module.exports = {
    test
}