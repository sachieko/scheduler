import React from "react";
import DayListItem from "./DayListItem";

// days:Array an array of objects (each object represents a day and includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday"

export default function DayList(props) {

  const dayComponents = props.days.map(day => {
    return <DayListItem key={day.id} name={day.name} spots={day.spots} selected={day.name === props.day} setDay={props.setDay} /> 
  });
  return (
  <ul>
    {dayComponents}
  </ul>
  );
};