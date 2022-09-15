// Return array of the appointment objects using the appointment array 
// Refactor with map/filter/reduce functions later! This is a lot of wasteful code!
const getAppointmentsForDay = (state, day) => {
  let appointmentArray = [];
  for (const stateDay of state.days) { // days is an array of objects
    if (stateDay.name === day) {
      appointmentArray = stateDay.appointments;
    }
  }
  const appointments = [];
  for (const appId of appointmentArray) { // appointment array is an array of ids
    appointments.push(state.appointments[appId]) // state.appointments is an object of objects, where the key is the id.
  }
  return appointments;
};

exports.getAppointmentsForDay = getAppointmentsForDay;
// Return interviewers information for that day as an array
const getInterviewersForDay = (state, day) => {
  let interviewersArray = [];
  for (const stateDay of state.days) {
    if (stateDay.name === day) {
      interviewersArray = stateDay.interviewers;
    }
  }
  const interviewers = [];
  for (const intId of interviewersArray) {
    interviewers.push(state.interviewers[intId])
  }
  return interviewers;
};

exports.getInterviewersForDay = getInterviewersForDay;

// Return interview object or null if it doesn't exist
const getInterview = (state, interview) => {
  return interview ? { interviewer: state.interviewers[interview.interviewer], student: interview.student } : null;
};

exports.getInterview = getInterview;