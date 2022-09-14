
import { useEffect, useState } from 'react';
import axios from 'axios';

const useApplicationData = function() {
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

  const updateSpots = function(state, appointments) {
    // get the current day's appointments
    const dayObj = state.days.find(day =>  day.name === state.currentDay);
    // Reduce the days appointments to a number that counts null interviews
    const spots = dayObj.appointments.reduce((counter, currentAppId) => {
      return appointments[currentAppId].interview ? counter : counter += 1; // only increase count if the interview is null
    }, 0);
    const day = {
      ...dayObj,
      spots
    };
    const days = state.days.map(dayItem => dayItem.name === state.currentDay ? day : dayItem);
    return days;
  };

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`api/appointments/${id}`, { interview: appointment.interview })
      .then(() => {
        setState(prev => ({ ...prev, appointments, days: updateSpots(prev, appointments) }));
      });
  };

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`api/appointments/${id}`)
      .then(res => {
        setState(prev => ({ ...prev, appointments, days: updateSpots(prev, appointments) }));
      });
  };

  const setDay = function(day) {
    setState(prev => ({...prev, currentDay: day}));
  };

  return {
    state,
    bookInterview,
    cancelInterview,
    setDay
  };
};

export default useApplicationData;