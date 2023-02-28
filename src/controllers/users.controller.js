const mongoose = require('mongoose');
const usermodel = mongoose.model('user');

async function makeUser(req, res){
    const { email,password,username,firstName,lastName} = req.body;
    try{
        var myId = mongoose.Types.ObjectId()

        await usermodel.create({ 
            _id: myId,
            email: String(email), 
            password: String(password), 
            username: String(username),
            firstName: String(firstName),
            lastName: String(lastName)
        })
        return res.json(myId)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

async function authenticateUsername(req,res){
    const {username} = req.query;
    try{
        var query = {username: username}
        var users = await usermodel.find(query)
        if(users.length>0){
            return res.json("Username Taken") 
        }
        return res.json("Valid Username")
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }

}

async function authenticatePassword(req,res){
    const {username, password} = req.query;
    try{
        var query = {username: username, password: password}
        var user = await usermodel.findOne(query)
        if(user != undefined){
            return res.json(user._id)
        }
        return res.json("Incorrect Password")
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }

}
async function getUser(req, res){
    const {_id} = req.query;
    try{
        var query = {_id: _id}
        user = await usermodel.findOne(query)
        return res.json(user)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
async function patchUser(req, res){
    const {_id} = req.body;
    try{
        var query = {_id: _id}
        user = await usermodel.findOne(query)
        console.log(user)
        if(req.body.email != undefined){
            user.email = req.body.email
        }
        if(req.body.username != undefined){
            user.username = req.body.username
        }
        if(req.body.firstName != undefined){
            user.firstName = req.body.firstName
        }
        if(req.body.lastName != undefined){
            user.lastName = req.body.lastName
        }
        if(req.body.password != undefined){
            user.password = req.body.password
        }
        await user.save();
        return res.json(user)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
module.exports = {
    patchUser,
    makeUser,
    getUser,
    authenticateUsername,
    authenticatePassword
}