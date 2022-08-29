const express = require('express');
const { getAllTodos, createTodo, deleteTodo, updateTodo, getTodoById,  } = require('../Handlers/todo');

const TodosRouter = express.Router();

TodosRouter.get('/todos',getAllTodos);
TodosRouter.post('/createTodo',createTodo);
TodosRouter.put('/updateTodo',updateTodo);
TodosRouter.delete('/deleteTodo',deleteTodo);
TodosRouter.get('/todos/:todoID',getTodoById);




module.exports = TodosRouter;