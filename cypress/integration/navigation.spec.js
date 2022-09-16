/* eslint-disable no-undef */
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");

    cy.contains('Monday')
      .click();

  });
  it('should navigate to Tuesday', () => {
    cy.visit('/');
    cy.contains('[data-testid=day]', 'Tuesday').click().should('have.class', 'day-list__item--selected');
  });
  it("should nav to Tuesday, and see that day's schedule instead", () => {
    cy.visit("/")
      .get('[data-testid=schedule]')
      .should('contain', 'Archie Cohen');

    cy.contains('[data-testid=day]', 'Tuesday')
      .click();

    cy.get('[data-testid=schedule]')
      .should('not.contain', 'Archie Cohen');

    cy.get('.day-list__item--selected')
      .should('contain', 'Tuesday');
  });
});