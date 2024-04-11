const mongoose = require('mongoose');
const applicationmodel = mongoose.model('application');

async function submitApplication(req, res){
    const {type,lastName, firstName, dob, email, age,phone,utr,school,experience,why} = req.body
    try{
        await applicationmodel.create({ 
            type:type,
            lastName:lastName, 
            firstName:firstName,
            dob: Date(dob), 
            email:email, 
            age:age,
            phone:phone,
            utr:utr,
            school:school,
            experience:experience,
            why:why
        })
        return res.json("uploaded successfully")
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

async function getApplication(req, res){
    try{
        var applications = await applicationmodel.find({})
        return res.json(applications)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

module.exports = {
    submitApplication,
    getApplication
}