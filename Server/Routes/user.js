const express = require('express');
const cors = require('cors');
const { createUser, userLogin, checkUserNyToken } = require('../Handlers/user');

const userRouter = express.Router();

userRouter.post("/createUser",createUser);
userRouter.post("/login",userLogin);
userRouter.post("/checkUserByToken",checkUserNyToken);

module.exports = userRouter;