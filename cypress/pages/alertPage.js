export class alertPage{

  static elements = {
    clearAllAlertsBtn: () => cy.get('[class="ph ph-2x ph-dots-three-vertical clickable"]'),
    clearAllMenuItem: () => cy.get('[class="p-menuitem-link ng-star-inserted"]'),
    testAlertRadioBtn: () => cy.get('[ng-reflect-label="Test Alert"]').children('[class="p-radiobutton p-component"]')

  }

  static clickClearAllAlerts() {
    this.elements.clearAllAlertsBtn().click();

    this.elements.clearAllMenuItem().click();
  }

 static selectTestAlertFromPopUp() {
    this.elements.testAlertRadioBtn().click();
 }

}
