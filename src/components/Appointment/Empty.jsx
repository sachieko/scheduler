import React from 'react';

const Empty = (props) => {
  return (
  <main onClick={props.onAdd} className='appointment__add'>
    <img
      className='appointment__add-button'
      src='images/add.png'
      alt='Add'
    />
  </main>
  )
};

export default Empty;