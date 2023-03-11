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
            admin: false
        })
        return res.json(myId)
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

async function authenticateUser(req,res){
    const {username, email, password} = req.body;
    try{
        if(username == undefined || username === ""){
            return res.status(402).send({ error: "Missing Username" })
        }
        else if(email == undefined || email === ""){
            return res.status(403).send({ error: "Missing Email" })
        }
        else if(password == undefined || password === ""){
            return res.status(401).send({ error: "Missing Password" })
        }
        else if(username.length <4){
            return res.status(398).send({ error: "Short Username" })
        }
        else if(username.length <4){
            return res.status(398).send({ error: "Short Username" })
        }
        else if(email.indexOf("@") == -1){
            return res.status(395).send({ error: "Inavlid Email" })
        }
        else if(password.length <6){
            return res.status(399).send({ error: "Short Password" })
        }
        var query = {username: username}
        var users = await usermodel.find(query)
        if(users.length>0){
            return res.status(397).send({ error: "Username Taken" })
        }
        var query = {email: email}
        var emails = await usermodel.find(query)
        if(emails.length>0){
            return res.status(396).send({ error: "Email Taken" })
        }
        return res.json("Valid User")
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }

}

async function authenticatePassword(req,res){
    const {username, password} = req.body;
    try{
        if(username == undefined || username === ""){
            return res.status(402).send({ error: "Missing Username" })

        }
        else if(password == undefined || password === ""){
            return res.status(401).send({ error: "Missing Password" })
        }
        else if(username.indexOf("@") == -1){
            var query = {username: username, password: password}
            var user = await usermodel.findOne(query)
            if(user != undefined){
                return res.json(user)
            }
        }
        else{
            var query = {email: username, password: password}
            var user = await usermodel.findOne(query)
            if(user != undefined){
                return res.json(user._id)
            }
        }
        return res.status(400).send({ error: "Incorrect Password" })
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
            if(req.body.email.indexOf("@") == -1){
                return res.status(398).send({ error: "Invalid Email" })
            }
            let check = await usermodel.find({email: req.body.email, _id: {$ne: _id}})
            if(check.length == 0){
                user.email = req.body.email
            }
            else{
                return res.status(397).send({ error: "Email Taken" })
            }
        }
        if(req.body.username != undefined){
            if(req.body.username.length < 4){
                return res.status(399).send({ error: "Username must be 4 characters" })
            }
            let check = await usermodel.find({username: req.body.username, _id: {$ne: _id}})
            console.log(check)
            if(check.length == 0){
                user.username = req.body.username
            }
            else{
                return res.status(396).send({ error: "Username Taken" })
            }
        }
        if(req.body.emailList != undefined){
            user.emailList = req.body.emailList
        }
        if(req.body.password != undefined){
            if(req.body.password.length <6){
                return res.status(400).send({ error: "Short Password" })
            }
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
async function deleteUser(req, res){
    const {_id} = req.query
    try{
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // Convert to milliseconds
        const utcDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) - offset);
        const lessons = await lessonmodel.find({ date: { $gte: utcDate }, students: studentID })
        for(let j = 0; j < lessons.length; i++){
            if(lessons[i].students.indexOf(_id) != -1)
                lessons[i].students.splice(lessons[i].student.indexOf(_id),1)
                lessons[i].studentsNames.splice(lessons[i].student.indexOf(_id),1)
                await lessons[i].save();
        }
        usermodel.deleteOne({_id: _id}).then(function(){
            return res.json("Data deleted"); // Success
        })
    }
    catch(err){
        console.log(err)
        res.status(422).send({ error: err.message })
    }
}

module.exports = {
    deleteUser,
    patchUser,
    makeUser,
    getUser,
    authenticateUser,
    authenticatePassword
}