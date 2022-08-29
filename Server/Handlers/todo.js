const {  Todos } = require('../Database/todos');
const jwt = require('jsonwebtoken');

const getAllTodos = async (req, res) => {
    try {
        const { token } = req.headers;
        const {status, tag}=req.query;
        if(status && tag){
            let user = jwt.decode(token);
            const todos = await Todos.find({ user: user.id, tag, status });
            return res.status(200).send(todos);
        }else if(status){

            let user = jwt.decode(token);
            const todos = await Todos.find({ user: user.id, status });
           return res.status(200).send(todos);
        }
        let user = jwt.decode(token);
        const todos = await Todos.find({ user: user.id });
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createTodo = async (req, res) => {
    try {
        const { token } = req.headers;
        // console.log(token)
        let user = jwt.decode(token);
        // console.log(user)
        let newTodo = req.body;
        newTodo.user = user.id;
        let todo = await todos(newTodo);
        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateTodo = async (req, res) => {
    try {
        const { token } = req.headers;
        let user = jwt.decode(token);
        let todo = req.body;
        todo.user = user.id;
        let updatedtodo = await Todos.findByIdAndUpdate(todo.id, todo, { new: true });
        res.status(200).send(updatedtodo);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteTodo = async (req, res) => {
    try {
        let {id} = req.body;
        console.log(id)
        await Todos.findByIdAndDelete(id);
        res.status(200).send({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getTodoById = async (req, res) => {
    try {
        const { token } = req.headers;
        const {todoID} =req.params;
        let user = jwt.decode(token);
        const todos = await Todos.find({ user: user.id, _id:todoID });
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}





module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById
}