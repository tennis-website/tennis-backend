const mongoose = require('mongoose');
const requestmodel = mongoose.model('request');

async function makeRequest(req, res){
    var { date, users, messages} = req.body;
    try{
        var myId = mongoose.Types.ObjectId()
        if(typeof(date) == "number"){
            date = new Date(date * 1000)
        }
        if(typeof(date) == "string"){
            date = new Date(date)
        }
        
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        // find documents where the 'date' field falls within the target day
        
        const matchingDocuments = await requestmodel.find({
        date: {
            $gte: startOfDay,
            $lt: endOfDay,
        },
        });

        if(matchingDocuments.length >0){
            res.status(402).send({ error: "A request is already on that Date" })
            return
        }
        
        await requestmodel.create({ 
            _id: myId,
            date: date, 
            users: users,
            messages: messages
        })
        return res.json(myId)
    }
    catch(err){
        try{
            console.log(err)
            res.status(422).send({ error: err.message })
        }
        catch(err){
            console.log(err)
            res.status(422).send({ error: err.message })
        }
    }
}
async function getRequestbyID(req, res){
    const {_id} = req.query;
    try{
        var query = {_id: _id}
        let request = await requestmodel.findOne(query)
        return res.json(request)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

async function addUser(req, res){
    const {_id, user} = req.body;
    try{
        let request =  await requestmodel.findOne({_id: _id})
        console.log(request.users)
        if(request.users.indexOf(user) == -1){
            request.users.push(user)
        }
        else{
           return res.status(402).send({ error: "User already requested" })
        }
        await request.save();
        return res.json(request)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

async function removeUser(req, res){
    const {_id, user} = req.body;
    try{
        let request =  await requestmodel.findOne({_id: _id})
        if(request.users.indexOf(user) != -1){
            request.users.splice(request.users.indexOf(user),1)
        }
        else{
            return res.status(402).send({ error: "User has not requested" })
        }
        await request.save();
        return res.json(request)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

async function addMessage(req, res){
    const {_id, message} = req.body;
    try{
        let request =  await requestmodel.findOne({_id: _id})
        request.messages.push(message)
        await request.save();
        return res.json(request)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
async function getAllRequests(req, res){
    try{
        return res.json(await requestmodel.find({}))
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}
async function patchRequest(req, res){
    const {_id} = req.body;
    try{
        var query = {_id: _id}
        let request = await requestmodel.findOne(query)
        if(req.body.date != undefined){
            request.date = req.body.date
        }
        if(req.body.users != undefined){
            request.users = req.body.users
        }
        if(req.body.messages != undefined){
            request.messages = req.body.messages
        }
        await request.save();
        return res.json(request)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

async function deleteRequest(req, res){
    const {_id} = req.query
    try{
        requestmodel.deleteOne({_id: _id}).then(function(){
            return res.json("Data deleted"); // Success
        })
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

module.exports = {
    getRequestbyID,
    deleteRequest,
    makeRequest,
    removeUser,
    patchRequest,
    getAllRequests,
    addMessage,
    addUser
}