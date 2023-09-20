export class sitesPage{

  static visitSitesPage() {
    cy.visit("/sites");
  }

  static clickEditSite(siteName){
    cy.contains('a', siteName).parentsUntil('app-site')
      .within(() => {
        cy.get('app-site-action-buttons').click()
        cy.get('li').contains('Edit').click()
      })
  }

  static updateSiteName(newSiteName){
    cy.get('input[data-cy=name]').clear()
      .type(newSiteName);
  }

  static clickSubmitInEditWindow(){
    cy.get('dryad-button[label=Submit]').click();
  }

}
