import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('ongoing');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(description, status);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new task"
        required
        style={{
          padding: '8px',
          marginRight: '10px',
          borderRadius: '3px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
          width: '200px',
        }}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '3px',
          border: '1px solid #ccc',
          cursor: 'pointer',
        }}
      >
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      <button
        type="submit"
        style={{
          padding: '8px 15px',
          borderRadius: '3px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: '#4caf50',
          color: 'white',
          marginLeft: '10px',
        }}
      >
        Add
      </button>
    </form>
  );
};

export default AddTodo;
