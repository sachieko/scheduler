import React from 'react';
import 'components/Application.scss';
import DayList from './DayList';
import Appointment  from './Appointment';
import useApplicationData from 'hooks/useApplicationData';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';

const Application = props => {
  const { 
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.currentDay);

  const dailyAppointments = getAppointmentsForDay(state, state.currentDay).map(app => {
    const interview = getInterview(state, app.interview);
    return (
      <Appointment key={app.id}
       {...app}
      interview={interview} 
      interviewers={interviewers} 
      bookInterview={bookInterview} 
      cancelInterview={cancelInterview} />
    )
  });
  dailyAppointments.push(<Appointment key='last' time='5pm' />); // No appointments starting at 5 pm, push for formatting purposes.
  return (
    <React.StrictMode>
    <main className='layout'>
      <section className='sidebar'>
      <img
  className='sidebar--centered'
  src='images/logo.png'
  alt='Interview Scheduler'
/>
<hr className='sidebar__separator sidebar--centered' />
<nav className='sidebar__menu'>
  <DayList days={state.days} value={state.currentDay} onChange={setDay} />
</nav>
<img
  className='sidebar__lhl sidebar--centered'
  src='images/lhl.png'
  alt='Lighthouse Labs'
/>
      </section>
      <section className='schedule' data-testid='schedule'>
      {dailyAppointments}
      </section>
    </main>
    </React.StrictMode>
  );
};
export default Application;
