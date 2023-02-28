const express = require('express');
const userRouter = express.Router();

const{
    makeUser,
    patchUser,
    getUser,
    authenticateUsername,
    authenticatePassword
}= require("../controllers/users.controller")

userRouter.post('/api/user', makeUser);
userRouter.get('/api/user', getUser);
userRouter.patch('/api/user', patchUser)
userRouter.get('/api/authUsername', authenticateUsername);
userRouter.get('/api/authPassword', authenticatePassword);


module.exports = userRouter;