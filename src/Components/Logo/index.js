import React from 'react';

export default props => (
  <div
    style={{
      background: 'white',
      padding: '8px',
      height: props.height,
      boxSizing: 'border-box',
      borderRadius: '5px'
    }}
  >
    <img
      src={require('../../assests/burger.png')}
      alt="burger logo"
      style={{
        height: '100%'
      }}
    />
  </div>
);
