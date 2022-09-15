import React from 'react';
import { render, cleanup, prettyDOM } from '@testing-library/react';

import Appointment from 'components/Appointment';

afterEach(cleanup);

const interviewers = [
  { id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png' },
  { id: 2, name: 'Tori Malcolm', avatar: 'https://i.imgur.com/Nmx0Qxo.png' },
  { id: 3, name: 'Mildred Nazir', avatar: 'https://i.imgur.com/T2WwVfS.png' },
  { id: 4, name: 'Cohana Roy', avatar: 'https://i.imgur.com/FK8V841.jpg' },
  { id: 5, name: 'Sven Jones', avatar: 'https://i.imgur.com/twYrpay.jpg' }
];

const interview = {
  student:  "Sachieko Test",
  interviewer: interviewers[1]
};

describe('Appointment Component', () => {
  it('renders without crashing', () => {
    render(<Appointment />);
  });
  it('shows empty if there are no interviews', () => {
    const { getByRole } = render(<Appointment time='1pm' />);
    expect(getByRole('img')).toHaveClass('appointment__add-button');
  });
  it('shows an interview if there is an interview with the interviewers name', () => {
    const { getByRole } = render(<Appointment time='1pm' interview={interview} />);
    expect(getByRole('main')).toHaveClass('appointment__card--show')
    expect(getByRole('main')).toHaveTextContent('Tori Malcolm');
  });
  it('shows an interview if there is an interview with the student\'s name', () => {
    const { getByRole } = render(<Appointment time='1pm' interview={interview} />);
    expect(getByRole('main')).toHaveTextContent('Sachieko Test');
  });
});

