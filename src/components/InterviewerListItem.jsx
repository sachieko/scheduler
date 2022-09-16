import React from 'react';
import 'components/InterviewerListItem.scss'
import classNames from 'classnames';
// { id:int, name:str, avatar:url, selected:bool, setInterviewer:func }
const InterviewerListItem = props => {
  const classes = classNames(
    'interviewers__item',
    { 
      'interviewers__item--selected': props.selected
    });
  return (
    <li onClick={props.onChange} className={classes}>
      <img
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
        data-testid='interviewerItem'
      />
    {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;