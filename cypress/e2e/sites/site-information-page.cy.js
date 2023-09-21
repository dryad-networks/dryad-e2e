import {siteInformationPage} from "../../pages/siteInformationPage";
import {sitesPage} from "../../pages/sitesPage";

describe('Verify site information page', () => {
  const siteName = "Eberswalde B";
  const siteNameEdited = "Berlin";
  const gatewayName = "Eberswalde BG Hdy5h";
  const noOfSensors = 10;
  const firstSensorId = 113;

    before(() => {
      sitesPage.visitSitesPage();

      cy.wait(500);

      //Simulate environment monitoring up-links from the sensors
      for(let i=firstSensorId; i<firstSensorId+noOfSensors+1; i++){
        cy.simulateEnvMonitoring(i, 0,(d) => console.log(d));
      }
    })

  it("Site information page should load when clicked on site name", () => {
    siteInformationPage.visitSiteInformationPage(siteName);
  });

  it("Site name should be displayed on top", () => {
    cy.get('h2').contains(siteName);
  });

  // it("Update site name from site information page", () => {
  //   cy.wait(500);
  //
  //   cy.get('app-site-action-buttons').click();
  //
  //   cy.get('li').contains('Edit').click();
  //
  //   cy.get('input[data-cy=name]').clear().type(siteNameEdited);
  //
  //   cy.get('dryad-button[label=Submit]').click();
  // });
  //
  // it("Updated site name should be reflected", () => {
  //   cy.wait(500);
  //   cy.get('app-site').contains('a', siteNameEdited).should('be.visible');
  // });

  it("Site map should be available", () => {
    cy.get('[aria-label=Map]').should('be.visible');
  });

  it("Gateway name should be displayed in gateway tab", () => {
    siteInformationPage.navigateToGatewaysTab();
    cy.get('app-gateway').contains(gatewayName).should('be.visible');
  });

  // after('cleaning up - reverting site name', () => {
  //   cy.get('app-site-action-buttons').click();
  //
  //   cy.get('li').contains('Edit').click();
  //
  //   cy.get('input[data-cy=name]').clear().type(siteName);
  //
  //   cy.get('dryad-button[label=Submit]').click();
  // });

  it('All the sensors should be listed in sensors tab', () => {
    siteInformationPage.navigateToSensorsTab();

    cy.get('app-sensor-node-list')
      .find('dryad-web-app-row-expansion')
      .should('have.length', noOfSensors);
  });

  it('Data graphs should be available for each sensor node', () => {
    for (let i = 0; i < noOfSensors; i += 1) {
      cy.get(`dryad-web-app-row-expansion > :nth(${i})`)
        .find('button[type=button]')
        .click()
        .wait(500)
        .then(() => {
          cy.get(`dryad-web-app-row-expansion > :nth(${i})`)
            .find(`app-sensor-data`)
            .should('be.visible');
          cy.get(`dryad-web-app-row-expansion > :nth(${i})`)
            .find('span')
            .should('not.contain', 'No data available');
        });
    }
  });
});
