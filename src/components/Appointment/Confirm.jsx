import React from 'react';
import Button from 'components/Button';

const Confirm = (props) => {
  return (
    <main className='appointment__card appointment__card--confirm'>
  <h1 className='text--semi-bold'>{props.message}</h1>
  <section className='appointment__actions'>
    <Button onClick={props.onCancel} danger={'true'} data-testid={'cancelDelete'}>Cancel</Button>
    <Button onClick={props.onConfirm} danger={'true'} data-testid={'confirmDelete'}>Confirm</Button>
  </section>
</main>
  )
};

export default Confirm;