require("dotenv").config();

const express = require("express");
const app = express();
const cors= require("cors");

app.use(cors('*'));
app.use(express.json());


const PORT =process.env.PORT|| 5000;

let todos =[
    { id: 1, task: "Clean kitty litter", completed: false, dueDate: null },
    { id: 2, task: "Do laundry", completed: false, dueDate: null }
];
//VIEW ALL TODOS
app.get('/todos', (req, res) =>{
    res.status(200).json(todos);
});
//CREATE TODO
app.post('/todos', (req, res) => {
    const {task} = req.body;
    if(!task) return res.status(400).json({error: 'Task is required'});
    const newTodo={
        id: todos.length+1,
        task: req.body.task,
        completed: false,
        dueDate: req.body.dueDate||null
    };
    todos.push(newTodo);
    res.status(201).json({message: 'Todo added', newTodo});
});
//VIEW TODO BY ID
app.get('/todos/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const todo = todos.find((item)=>item.id===id);
    if(!todo) return res.status(400).json({error: 'Not found'});
    res.status(200).json(todo);
});
//UPDATE TODO BY ID
app.patch('/todos/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const todo= todos.find((t)=>t.id===id);
    if(!todo) return res.status(400).json({error: 'Not found'});
    Object.assign(todo, req.body);
    res.status(200).json({message: 'Todo updated', todo});
});
//DELETE TODO BY ID
app.delete('/todos/:id', (req, res) =>{
    const id= parseInt(req.params.id);
    const lenb4= todos.length;
    todos= todos.filter((t)=>t.id !==id);
    if(todos.length===lenb4) return res.status(400).json({error: 'Not found'});
    res.status(200).json({message: 'Todo deleted'});
});
app.listen(PORT, () => 
    console.log(`API alive on ${PORT}`));