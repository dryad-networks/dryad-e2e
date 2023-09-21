import {sitesPage} from "../../pages/sitesPage";

describe('Verify sites page', () => {
  const siteName = "Eberswalde B";
  const siteNameEdited = "Berlin";

    before(() => {
        sitesPage.visitSitesPage();
    })

    it("Site title should be displayed on site tile", () => {
      cy.get('app-site').contains('a', siteName, {timeout: 10000}).should('be.visible');
    })

    it("Map of site should be displayed in sites page", () => {
      cy.contains('a', siteName).parentsUntil('app-site')
        .within(() => {
        cy.get('[aria-label=Map]').should('be.visible')
      })
    })

  it('Updating the site name should be possible', () => {
    sitesPage.clickEditSite(siteName);

    sitesPage.updateSiteName(siteNameEdited);

    sitesPage.clickSubmitInEditWindow();
  });

  it('Updated site name should be reflected on sites page', () => {
    cy.wait(500);

    cy.get('app-site').contains('a', siteNameEdited, {timeout: 10000}).should('be.visible');
  });

  after('cleaning up - reverting site name', () => {
    sitesPage.clickEditSite(siteNameEdited);

    sitesPage.updateSiteName(siteName);

    sitesPage.clickSubmitInEditWindow();
  });

});
