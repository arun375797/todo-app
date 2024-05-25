import React from 'react';

const Filter = ({ setFilter }) => (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
    <button
      style={{
        marginRight: '10px',
        padding: '5px 10px',
        borderRadius: '3px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#2196f3',
        color: 'white',
      }}
      onClick={() => setFilter('all')}
    >
      All
    </button>
    <button
      style={{
        marginRight: '10px',
        padding: '5px 10px',
        borderRadius: '3px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#4caf50',
        color: 'white',
      }}
      onClick={() => setFilter('completed')}
    >
      Completed
    </button>
    <button
      style={{
        padding: '5px 10px',
        borderRadius: '3px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#ff5722',
        color: 'white',
      }}
      onClick={() => setFilter('ongoing')}
    >
      Incomplete
    </button>
  </div>
);

export default Filter;
