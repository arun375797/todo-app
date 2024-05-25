import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import Filter from './Filter';
import './Dashboard.css'; // Import CSS file for styling

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (description, status) => {
    try {
      const response = await axios.post('http://localhost:5000/api/todos', { description, status });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(todo => todo._id === id);
      const updatedStatus = todo.status === 'completed' ? 'ongoing' : 'completed';
      const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { status: updatedStatus });
      const updatedTodo = response.data;
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    return filter === 'completed' ? todo.status === 'completed' : todo.status === 'ongoing';
  });

  return (
    <div className="dashboard-container">
      <h1>Todo Dashboard</h1>
      <div className="dashboard-controls">
        <Filter setFilter={setFilter} />
        <AddTodo addTodo={addTodo} />
      </div>
      <div className="todo-list">
        {filteredTodos.map((todo, index) => (
          <React.Fragment key={todo._id}>
            <TodoItem todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
            {index !== filteredTodos.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
