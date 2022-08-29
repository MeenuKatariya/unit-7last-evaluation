const express = require('express');
const cors = require('cors');
const { connectDB } = require('./Database/index');
const userRouter = require('./Routes/user');

const TodosRouter = require('./Routes/todos');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter)
app.use(TodosRouter);


app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});

connectDB().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`listening on port ${process.env.PORT}`);
})});

