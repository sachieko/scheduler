import React, { useState } from 'react';
// { interviewers:[arr], setInterviewer:func, interviewer:int }
const InterviewerList = props => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  )
};

export default InterviewerList;