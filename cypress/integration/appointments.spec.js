/* eslint-disable no-undef */
describe('Appointments', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should book an interview', () => {
    cy.get('[data-testid="addButton"]').eq(0).click();

    cy.get('[data-testid=appInput').type('Sachieko means child with the grace of helping to know');

    cy.get('[data-testid=interviewerList] li').eq(0).click();

    cy.get('[data-testid=save]').click();

    const cyschedule = cy.get('[data-testid=schedule]');
    
    cyschedule.should('contain', 'Sachieko means child with the grace of helping to know');
  });
  it('should edit an interview', () => {
    cy.contains('[data-testid=appointment]', 'Sachieko').get('[data-testid=editButton').invoke('show').eq(1).click();

    cy.get('[data-testid=appInput').type('{selectAll}{backspace}Psycho-pass');

    cy.get('[data-testid=save]').click();

    cy.get('[data-testid=schedule]').should('contain', 'Psycho-pass');
  });
  it('should delete an interview', () => {
    cy.get('[data-testid=schedule]').should('contain', 'Psycho-pass');

    const cyappointment = cy.contains('[data-testid=appointment]', 'Psycho-pass');

    cyappointment.get('[data-testid=deleteButton').invoke('show').eq(1).click();

    cy.contains('[data-testid=appointment]', 'Delete the appointment?').should('exist');

    cyappointment.get('[data-testid=confirmDelete]').click();

    cy.contains('[data-testid=statusMsg]', 'Deleting...').should('exist');

    cyappointment.should('not.contain', 'Psycho-pass');
  });
});