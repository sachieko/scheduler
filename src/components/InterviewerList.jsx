import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';
import PropTypes from 'prop-types';

// { interviewers:arr of [{ id:int, name:str, avatar:urlstr }], onChange:func to set interviewer, value:int of interviewer }
const InterviewerList = props => {
  const interviewers = props.interviewers.map(interviewer => {
     return <InterviewerListItem 
      key={interviewer.id} 
      name={interviewer.name}
      avatar={interviewer.avatar}
      onChange={(event) => props.onChange(interviewer.id)} 
      selected={props.value === interviewer.id} />;
    });

  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>{interviewers}</ul>
    </section>
  )
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;