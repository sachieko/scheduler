import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

const Form = (props) => {
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const validate = () => {
    if (student === '') {
      setError('Student name cannot be blank');
      return;
    }
    if (!interviewer) {
      setError('Please select an interviewer');
      return;
    }
    setError('');
    props.onSave(student, interviewer);
  }

  return (
    <main className='appointment__card appointment__card--create'>
  <section className='appointment__card-left'>
    <form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
      <input
        className='appointment__create-input text--semi-bold'
        name='name'
        type='text'
        value={student}
        placeholder={student || 'Enter Student Name'}
        onChange={(event) => setStudent(event.target.value)}
      />
    </form>
    {error && (<section className="appointment__validation">{error}</section>)}
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      onChange={setInterviewer}
    />
  </section>
  <section className='appointment__card-right'>
    <section className='appointment__actions'>
      <Button danger={'true'} onClick={cancel}>Cancel</Button>
      <Button confirm={'true'} onClick={() => validate()}>Save</Button>
    </section>
  </section>
</main>
  )
};

export default Form;