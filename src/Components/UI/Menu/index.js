import React from 'react';

export default props => (
  <div
    onClick={props.clicked}
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}
  >
    <div
      style={{
        color: 'white',
        border: '1px solid white',
        width: '20px',
        margin: '2px'
      }}
    />
    <div
      style={{
        color: 'white',
        border: '1px solid white',
        margin: '2px',
        width: '20px'
      }}
    />
    <div
      style={{
        color: 'white',
        border: '1px solid white',
        margin: '2px',
        width: '20px'
      }}
    />
  </div>
);
