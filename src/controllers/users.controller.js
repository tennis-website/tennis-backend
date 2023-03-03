const mongoose = require('mongoose');
const usermodel = mongoose.model('user');

async function makeUser(req, res){
    const { email,password,username,emailList } = req.body;
    try{
        var myId = mongoose.Types.ObjectId()

        await usermodel.create({ 
            _id: myId,
            email: String(email), 
            password: String(password), 
            username: String(username),
            emailList: Boolean(emailList),
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
    const {username, password} = req.body;
    try{
        var query = {username: username, password: password}
        console.log(username)
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
        user = await usermodel.findById(_id)
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
        if(req.body.email != undefined){
            user.email = req.body.email
        }
        if(req.body.username != undefined){
            user.username = req.body.username
        }
        if(req.body.emailList != undefined){
            user.emailList = req.body.emailList
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