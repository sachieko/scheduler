import React from 'react';
import { render, cleanup, waitForElement, fireEvent, queryByText, findAllByRole,
   getAllByRole, getByAltText, getByPlaceholderText, getByText, findByText, findAllByText } from '@testing-library/react';
import Application from 'components/Application';

afterEach(cleanup);

describe('Application tests', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', async() => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Sachieko Test")).toBeInTheDocument();
    expect(getByText("Cohana Roy")).toBeInTheDocument();
  });
  it('loads data, books an interview, and reduces the spots remaining for the first day by 1 to 0', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => container);

    const firstAppointment = getAllByRole(container, 'article')[0];
    const firstAddButton = getByAltText(firstAppointment, 'Add');
    fireEvent.click(firstAddButton);
    expect(queryByText(firstAppointment, 'Sachieko Test')).not.toBeInTheDocument();
    fireEvent.change(getByPlaceholderText(firstAppointment, /Enter Student Name/i), {
      target: { value: 'Sachieko Test' }
    });
    const firstInterviewer = getAllByRole(firstAppointment, 'img')[0];
    fireEvent.click(firstInterviewer);
    expect(getByPlaceholderText(firstAppointment, 'Sachieko Test')).toHaveValue('Sachieko Test');
    fireEvent.click(getByText(firstAppointment, 'Save'));
    expect(getByText(firstAppointment, 'Saving...')).toBeInTheDocument();
    const studentName = await findByText(firstAppointment, 'Sachieko Test');
    expect(studentName).toBeInTheDocument();
    const spots = await findAllByText(container, 'spot', { exact: false })
    expect(getByText(spots[0], 'no spots remaining', {exact: false})).toBeInTheDocument();
  });
});
