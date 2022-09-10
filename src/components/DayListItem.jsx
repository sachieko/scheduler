import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss'

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item',
   { 
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots 
    });

  const Spots = (props) => {
    if (props.spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    }
    return props.spots === 1 ? <h3 className="text--light">{props.spots} spot remaining</h3> : <h3 className="text--light">{props.spots} spots remaining</h3>;
  };

  return (
    <li className={dayClass} onClick={() => props.onChange(prev => ({...prev, currentDay: props.name}))}>
      <h2 className="text--regular">{props.name}</h2> 
      <Spots spots={props.spots} />
      
    </li>
  );
};