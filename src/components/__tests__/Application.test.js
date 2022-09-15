import React from 'react';
import { render, cleanup, waitForElement, fireEvent, queryByText, findByAltText,
   getAllByRole, getByAltText, getByPlaceholderText, getByText, findByText, findAllByText, findByPlaceholderText } from '@testing-library/react';
import Application from 'components/Application';
import axios from 'axios';

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
    const { container } = render(<Application />);

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
  it('loads data, cancels an interview, and increases the spots remaining for the first day by 1 to 2', async() => {
    const  { container } = render(<Application />);

    await waitForElement(() => container);

    const secondBookedAppointment = getAllByRole(container, 'article')[1];
    const deleteButton = getByAltText(secondBookedAppointment, 'Delete');
    
    expect(getByText(secondBookedAppointment, 'Archie Cohen')).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(getByText(secondBookedAppointment, 'Delete the appointment?')).toBeInTheDocument();
    
    fireEvent.click(getByText(secondBookedAppointment, 'Confirm'));
    expect(getByText(secondBookedAppointment, 'Deleting...')).toBeInTheDocument();

    const addButton = await findByAltText(secondBookedAppointment, 'Add');
    expect(addButton).toBeInTheDocument();

    const spots = await findAllByText(container, 'spot', { exact: false })
    expect(getByText(spots[0], '2 spots remaining', {exact: false})).toBeInTheDocument();
  });
  it('allows users to edit an interview and keep spots on Monday remaining the same', async() => {
    const  { container } = render(<Application />);

    await waitForElement(() => container);

    const secondBookedAppointment = getAllByRole(container, 'article')[1];
    const editButton = getByAltText(secondBookedAppointment, 'Edit');
    
    expect(getByText(secondBookedAppointment, 'Archie Cohen')).toBeInTheDocument();

    fireEvent.click(editButton);

    fireEvent.change(getByPlaceholderText(secondBookedAppointment, /Archie Cohen/i), {
      target: { value: 'The Rat Prince' }
    });

    fireEvent.click(getByText(secondBookedAppointment, 'Save'));
    expect(getByText(secondBookedAppointment, 'Saving...')).toBeInTheDocument();
    
    const studentName = await findByText(secondBookedAppointment, 'The Rat Prince');
    expect(studentName).toBeInTheDocument();
    
    const spots = await findAllByText(container, 'spot', { exact: false })
    expect(getByText(spots[0], '1 spot remaining', {exact: false})).toBeInTheDocument();
    
  });
  it('shows the save error when failing to save an appointment', async() => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => container);

    const firstAppointment = getAllByRole(container, 'article')[0];
    const firstAddButton = getByAltText(firstAppointment, 'Add');

    fireEvent.click(firstAddButton);
    expect(queryByText(firstAppointment, 'The Rat Prince')).not.toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(firstAppointment, /Enter Student Name/i), {
      target: { value: 'The Rat Prince' }
    });

    const firstInterviewer = getAllByRole(firstAppointment, 'img')[0];
    fireEvent.click(firstInterviewer);
    expect(getByPlaceholderText(firstAppointment, 'The Rat Prince')).toBeInTheDocument();

    fireEvent.click(getByText(firstAppointment, 'Save'));
    expect(getByText(firstAppointment, 'Saving...')).toBeInTheDocument();
    
    const errorMsg = await findByText(firstAppointment, 'There was an error while saving the appointment, please try again.');
    expect(errorMsg).toBeInTheDocument();

    fireEvent.click(getByAltText(firstAppointment, 'Close'));
    const emptyInput = await findByPlaceholderText(firstAppointment, /Enter Student Name/i);
    expect(emptyInput).toBeInTheDocument();

    const spots = await findAllByText(container, 'spot', { exact: false })
    expect(getByText(spots[0], '1 spot remaining', {exact: false})).toBeInTheDocument();

  });
  it('shows the delete error when failing to delete an appointment', async() => {
    axios.delete.mockRejectedValueOnce();
    const  { container } = render(<Application />);

    await waitForElement(() => container);

    const secondBookedAppointment = getAllByRole(container, 'article')[1];
    const deleteButton = getByAltText(secondBookedAppointment, 'Delete');
    
    expect(getByText(secondBookedAppointment, 'Archie Cohen')).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(getByText(secondBookedAppointment, 'Delete the appointment?')).toBeInTheDocument();
    expect(queryByText(secondBookedAppointment, 'Archie Cohen')).not.toBeInTheDocument();
    
    fireEvent.click(getByText(secondBookedAppointment, 'Confirm'));
    expect(queryByText(secondBookedAppointment, 'Deleting...')).toBeInTheDocument();

    const errorMsg = await findByText(secondBookedAppointment, 'There was an error while deleting the appointment, please try again.');
    expect(errorMsg).toBeInTheDocument();

    fireEvent.click(getByAltText(secondBookedAppointment, 'Close'));
    const sameAppointment = await findByText(secondBookedAppointment, 'Archie Cohen');
    expect(sameAppointment).toBeInTheDocument();
  });
  it('Does not change an appointment when a user begins to delete an interview but clicks cancel', async() => {
    const  { container } = render(<Application />);

    await waitForElement(() => container);

    const secondBookedAppointment = getAllByRole(container, 'article')[1];
    const deleteButton = getByAltText(secondBookedAppointment, 'Delete');
    
    expect(getByText(secondBookedAppointment, 'Archie Cohen')).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(getByText(secondBookedAppointment, 'Delete the appointment?')).toBeInTheDocument();
    expect(queryByText(secondBookedAppointment, 'Archie Cohen')).not.toBeInTheDocument();
    
    fireEvent.click(getByText(secondBookedAppointment, 'Cancel'));
    expect(queryByText(secondBookedAppointment, 'Deleting...')).not.toBeInTheDocument();

    const studentName = getByText(secondBookedAppointment, 'Archie Cohen');
    expect(studentName).toBeInTheDocument();

    const spots = await findAllByText(container, 'spot', { exact: false })
    expect(getByText(spots[0], '1 spot remaining', {exact: false})).toBeInTheDocument();
  });
});
