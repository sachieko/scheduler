import React, { useState } from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';
// { interviewers:arr of [{ id:int, name:str, avatar:urlstr }], setInterviewer:func, interviewer:int }
const InterviewerList = props => {
  const [currentInterviewer, setCurrentInterviewer] = useState(props.interviewer);
  const interviewers = props.interviewers.map(interviewer => {
     return <InterviewerListItem 
      key={interviewer.id} 
      {...interviewer}
      setInterviewer={setCurrentInterviewer} 
      selected={currentInterviewer === interviewer.id} />;
    });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
};

export default InterviewerList;