import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";

const Application = props => {
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
  const [currentDay, setCurrentDay] = useState(days[0].name);

  return (
    <React.StrictMode>
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList days={days} day={currentDay} setDay={setCurrentDay} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      
      </section>
    </main>
    </React.StrictMode>
  );
};
export default Application;
