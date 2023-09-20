export class siteInformationPage{

  static elements = {
    planningBtn: () => cy.get('[label=Planning]')
  }

  static visitSiteInformationPage(siteName) {
    cy.visit("/sites");

    cy.wait(2000)

    cy.get('app-site').contains('a', siteName, {timeout: 10000}).should('be.visible').click();
  }

  static clickPlanningBtn() {
    this.elements.planningBtn().click();
  }

  static navigateToGatewaysTab() {
    cy.get('ul[role=tablist]').within(() => {
      cy.get('span').contains('Gateway').click();
    });
  }

  static navigateToSensorsTab() {
    cy.get('ul[role=tablist]').within(() => {
      cy.get('span').contains('Sensors').click();
    });
  }

}
