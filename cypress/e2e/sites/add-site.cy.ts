import {sitesPage} from "../../pages/sitesPage";

describe('Verify adding a new site', () => {
  before(() => {
    sitesPage.visitSitesPage();
  })

  it("Should open a model dialog on add button click", () => {
    cy.get("[data-cy=add-button").click()
  })

  it("The Submit button should be disabled when the form is invalid", () => {
    cy.get('[data-cy=name]').clear()
    cy.get('dryad-button[label=Submit]').should('be.disabled')
  })

  it("The Submit button should be enabled when the form is valid", () => {
    cy.get('[data-cy=name]').type('Berlin new site')
    cy.get('dryad-button[label=Submit]').should('not.be.disabled')
  })

  it("Emergency contact tab need to be visible when click on Submit", () => {
    cy.get('dryad-button[label=Submit]').click()
    cy.get('[data-cy=name]').should('be.visible')
    cy.get('[data-cy=phone]').should('be.visible')
    cy.get('[data-cy=email]').should('be.visible')
    cy.get('[data-cy=btn-prev]').should('be.visible')
  })

  it("Submit button should be visible on after filling the information", () => {
    cy.get('[data-cy=name]').type('Contact one')
    cy.get('[data-cy=phone]').type('11111111111')
    cy.get('[data-cy=email]').type('contact@con.com')
    cy.get('[data-cy=btn-next] > button').click()
    cy.get('[data-cy=btn-submit]').should('be.visible')
  })
});
