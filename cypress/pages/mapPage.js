export class mapPage{

  static elements = {
    zoomInBtn: () => cy.get('button[aria-label="Zoom in"]'),
    zoomOutBtn: () => cy.get('button[aria-label="Zoom out"]'),
    mapArea: () => cy.get('[aria-label="Map"]', { timeout: 10000 }),
    fireAlertIcon: () => cy.get('[data-cy=fire-alert-minimised]', {timeout: 3000})
  }

  static visitMapPage(){
    cy.visit('/map');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/map')
    })
  }

  static zoomInMap(){
    this.elements.zoomInBtn().click();
  }

  static zoomOutMap(){
    this.elements.zoomOutBtn().click();
  }

  static waitForMapToLoad() {
    cy.wait(2000)

    // Give these elements 10 seconds to appear
    this.elements.mapArea().should('be.visible');
  }

  static clickOnFireAlertIcon() {
    this.elements.fireAlertIcon().click();
  }
}
