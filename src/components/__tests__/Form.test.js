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
    const testSelector = getByRole('textbox');
    expect(testSelector).toHaveValue('Sachieko Test');
  });
  it('validates that the student name is not blank', () => {
    const onSave = jest.fn();
    const { getByText } = render(<Form interviewers={interviewers} interviewer={interviewers[1]} student={''} onSave={onSave} />);
    fireEvent.click(getByText('Save'));
    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it('validates that the interviewer cannot be null', () => {
    const onSave = jest.fn();
    const { getByText } = render(<Form interviewers={interviewers} student={'Sachieko Test'} onSave={onSave} />);
    fireEvent.click(getByText('Save'));
    /* 3. validation is shown */
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
  
    /* 4. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  xit('calls onSave function when the name and interviewer is defined', () => { // Replaced by refactor
    const onSave = jest.fn();
    const { getByText, queryByText } = render(<Form interviewers={interviewers} interviewer={interviewers[1].id} student={'Sachieko Test'} onSave={onSave} />);
    fireEvent.click(getByText('Save'));
    /* 5. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
  
    /* 6. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
  
    /* 7. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith('Sachieko Test', interviewers[1].id);
  });
  xit('submits the name entered by the user', () => { // replaced by refactor
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(<Form interviewers={interviewers} interviewer={interviewers[1].id} onSave={onSave} />);
    const input = getByPlaceholderText('Enter Student Name');
    fireEvent.change(input, {target: { value: 'Sachieko Test' } });
    fireEvent.click(getByText('Save'));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Sachieko Test', interviewers[1].id);
  });
  it('can successfully save after trying to submit an empty student name', () => { // Refactor covers multiple previous tests now
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={interviewers[1].id} />
    );
  
    fireEvent.click(getByText('Save'));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Sachieko Test' }
    });
  
    fireEvent.click(getByText('Save'));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Sachieko Test', interviewers[1].id);
  });
  it('calls onCancel and resets the input field', () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText('Save'));
  
    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Sachieko Test' }
    });
  
    fireEvent.click(getByText('Cancel'));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

