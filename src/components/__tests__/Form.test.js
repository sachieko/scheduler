import React from 'react';
import { render, cleanup, prettyDOM } from '@testing-library/react';

import Form from 'components/Appointment/Form';

afterEach(cleanup);




describe('Appointment Form Component', () => {
  const interviewers = [
    { id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png' },
    { id: 2, name: 'Tori Malcolm', avatar: 'https://i.imgur.com/Nmx0Qxo.png' },
    { id: 3, name: 'Mildred Nazir', avatar: 'https://i.imgur.com/T2WwVfS.png' },
    { id: 4, name: 'Cohana Roy', avatar: 'https://i.imgur.com/FK8V841.jpg' },
    { id: 5, name: 'Sven Jones', avatar: 'https://i.imgur.com/twYrpay.jpg' }
  ];

  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('')
  });
  it('renders with initial student name', () => {
    const { getByRole } = render(<Form interviewers={interviewers} student={'Sachieko Test'} />);
    const testSelector = getByRole("textbox");
    expect(testSelector).toHaveValue('Sachieko Test');
  });


});

