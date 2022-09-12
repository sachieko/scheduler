import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import useVisualMode from 'hooks/useVisualMode';



const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CONFIRM = "CONFIRM";
  const SAVE = "SAVE";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const DELETE = "DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  return (
    <article className="appointment">
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
          onCancel={() => back()}
          onSave={() => transition(SAVE)}
        />
      )}
      {mode === SAVE && (
        <Status 
          message={"Saving..."}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Delete the appointment?"}
          onConfirm={() => transition(DELETE)}
          onCancel={() => back()}
        />
      )}
      {mode === DELETE && (
        <Status 
          message={"Deleting..."}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={() => transition(SAVE)}
        />
      )}
    </article>
  )
};

export default Appointment;

// .add("Empty", () => <Empty onAdd={action("onAdd")} />)
// .add("Show", () => <Show student="Lydia Miller-Jones" interviewer={interviewer} onEdit={action("onEdit")} onDelete={action("onDelete")} />)
// .add("Confirm", () => <Confirm message={"Delete the appointment?"} onConfirm={action("onConfirm")} onCancel={action("onCancel")} />)
// .add("Status", () => <Status message={"Deleting"} />)
// .add("Error", () => <Error message={"Could not delete appointment."} onClose={action("onClose")} />)
// .add("Create Form", () => <Form interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)
// .add("Edit Form", () => <Form student="Sachieko" interviewer={interviewer.id} interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)
