const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb+srv://arun3757979:life@cluster0.yxsd0j4.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB Schema and Model
const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, required: true, enum: ['ongoing', 'completed'], default: 'ongoing' },
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const { description, status } = req.body;
    const newTodo = new Todo({
      description,
      status,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error adding todo' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const { description, status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { description, status },
      { new: true, runValidators: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
