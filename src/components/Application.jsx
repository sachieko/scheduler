import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "./DayList";
import Appointment  from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

const Application = props => {
  const [state, setState] = useState({ 
    days: [],
    appointments: {},
    interviewers: {},
    currentDay: 'Monday'
  });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ])
      .then(all => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);
  const interviewers = getInterviewersForDay(state, state.currentDay);

  const dailyAppointments = getAppointmentsForDay(state, state.currentDay).map(app => {
    const interview = getInterview(state, app.interview);
    return (
      <Appointment key={app.id} {...app} interview={interview} interviewers={interviewers} />
    )
  });
  dailyAppointments.push(<Appointment key="last" time="5pm" />);
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
  <DayList days={state.days} value={state.currentDay} onChange={setState} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {dailyAppointments}
      </section>
    </main>
    </React.StrictMode>
  );
};
export default Application;
