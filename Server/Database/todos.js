const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: String,
    status: String,
    tag: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


const Todos = mongoose.model('Todos', TodoSchema);

module.exports = { Todos };