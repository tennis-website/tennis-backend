const express = require('express');
const requestRouter = express.Router();

const{
    deleteRequest,
    makeRequest,
    patchRequest,
    removeUser,
    getAllRequests,
    addMessage,
    getRequestbyID,
    addUser
}= require("../controllers/request.controller")

requestRouter.delete('/api/request', deleteRequest);
requestRouter.post('/api/request', makeRequest);
requestRouter.patch('/api/request', patchRequest)
requestRouter.get('/api/requestByID', getRequestbyID);
requestRouter.get('/api/getAllRequests', getAllRequests);
requestRouter.patch('/api/requestAddMessage', addMessage);
requestRouter.patch('/api/requestAddUser', addUser)
requestRouter.patch('/api/requestRemoveUser', removeUser)


module.exports = requestRouter;