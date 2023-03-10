const express = require('express');
const userRouter = express.Router();

const{
    makeUser,
    patchUser,
    getUser,
    authenticateUser,
    authenticatePassword,
    deleteUser
}= require("../controllers/users.controller")

userRouter.post('/api/user', makeUser);
userRouter.get('/api/user', getUser);
userRouter.patch('/api/user', patchUser)
userRouter.post('/api/authUser', authenticateUser);
userRouter.post('/api/authPassword', authenticatePassword);
userRouter.delete('/api/user', deleteUser);


module.exports = userRouter;