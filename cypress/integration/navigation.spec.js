/* eslint-disable no-undef */
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");

    cy.contains('Monday')
      .click();

  });
  it('should navigate to Tuesday', () => {
    cy.visit('/');
    cy.contains('li', 'Tuesday').click().should('have.css', 'background-color', 'rgb(242, 242, 242)');
  });
  it("should nav to Tuesday, and see that day's schedule instead", () => {
    cy.visit("/")
      .get('section.schedule')
      .should('contain', 'Archie Cohen');

    cy.contains('Tuesday')
      .click();

    cy.get('section.schedule')
      .should('not.contain', 'Archie Cohen');

    cy.get('li.day-list__item--selected')
      .should('have.css', 'background-color', 'rgb(242, 242, 242)')
      .should('contain', 'Tuesday');
  });
});