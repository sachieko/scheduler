import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
import useVisualMode from 'hooks/useVisualMode';



const Appointment = (props) => {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CONFIRM = 'CONFIRM';
  const SAVE = 'SAVE';
  const CREATE = 'CREATE';
  const EDIT = 'EDIT';
  const DELETE = 'DELETE';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    return interview;
  };

  return (
    <article className='appointment' data-testid='appointment'>
      <Header time={props.time} />
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer} 
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        /> 
      )} 
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={(student, interviewer) => {
            transition(SAVE);
            props.bookInterview(props.id, save(student, interviewer))
              .then(() => {
                transition(SHOW);
              })
              .catch(err => {
                transition(ERROR_SAVE, true);
              });
          }}
        />
      )}
      {mode === SAVE && (
        <Status 
          message={'Saving...'}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={'Delete the appointment?'}
          onConfirm={() => {
            transition(DELETE, true);
            props.cancelInterview(props.id)
              .then(() => {
                transition(EMPTY);
              })
              .catch(err => {
                transition(ERROR_DELETE, true);
              });
          }}
          onCancel={back}
        />
      )}
      {mode === DELETE && (
        <Status 
          message={'Deleting...'}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={(student, interviewer) => {
            transition(SAVE);
            props.bookInterview(props.id, save(student, interviewer))
              .then(() => {
                transition(SHOW);
              })
              .catch(err => {
                transition(ERROR_SAVE, true);
              });
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message={'There was an error while deleting the appointment, please try again.'} onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message={'There was an error while saving the appointment, please try again.'} onClose={back} />
      )}
    </article>
  )
};

export default Appointment;