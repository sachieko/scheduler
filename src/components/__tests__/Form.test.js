import React from 'react';
import { render, cleanup, fireEvent, prettyDOM } from '@testing-library/react';

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
  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(<Form interviewers={interviewers} interviewer={interviewers[1]} student={''} onSave={onSave} />);
    fireEvent.click(getByText("Save"));
    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();
    const { getByText } = render(<Form interviewers={interviewers} student={'Sachieko Test'} onSave={onSave} />);
    fireEvent.click(getByText("Save"));
    /* 3. validation is shown */
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
  
    /* 4. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name and interviewer is defined", () => {
    const onSave = jest.fn();
    const { getByText, queryByText } = render(<Form interviewers={interviewers} interviewer={interviewers[1].id} student={'Sachieko Test'} onSave={onSave} />);
    fireEvent.click(getByText("Save"));
    /* 5. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
  
    /* 6. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
  
    /* 7. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Sachieko Test", interviewers[1].id);
  });
});

