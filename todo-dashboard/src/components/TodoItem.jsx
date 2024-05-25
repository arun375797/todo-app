import React from 'react';

const TodoItem = ({ todo, deleteTodo, toggleTodo }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <input 
      type="checkbox" 
      checked={todo.status === 'completed'} 
      onChange={() => toggleTodo(todo._id)} 
    />
    <span 
      style={{ 
        textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
        marginLeft: '10px',
        flexGrow: 1
      }}
    >
      {todo.description}
    </span>
    <button 
      style={{ 
        padding: '5px 10px',
        borderRadius: '3px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#f44336',
        color: 'white',
        marginLeft: '10px'
      }}
      onClick={() => deleteTodo(todo._id)}
    >
      Delete
    </button>
  </div>
);

export default TodoItem;
