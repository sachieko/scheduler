import React from "react";
import DayListItem from "./DayListItem";

// days:Array an array of objects (each object represents a day and includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday"

const DayList = props => {

  const dayComponents = props.days.map((day, index) => {
    return <DayListItem key={index} name={day.name} spots={day.spots} selected={day.name === props.value} onChange={props.onChange} /> 
  });
  return (
  <ul>
    {dayComponents}
  </ul>
  );
};

export default DayList;