import {sitesPage} from "../../pages/sitesPage";
import {mapPage} from "../../pages/mapPage";
import {alertPage} from "../../pages/alertPage";

describe("Verify behavior when phase 2 alerts are received", () => {

  const sensorId = 110;
  const sensorName = "Eberswalde SN R9qkF";

  before(() => {
    //Opening Applitools eyes
    // cy.eyesOpen({
    //   appName: 'Dryad Silvanet',
    //   testName: Cypress.currentTest.title,
    // })

    // Visit sites page
    sitesPage.visitSitesPage();

    //Simulate phase 1 alert
    cy.simulateEnvMonitoring(sensorId, 1,(d) => console.log(d));

    cy.wait(2000);
    //Simulate a fire alert
    cy.simulateEnvMonitoring(sensorId, 2,(d) => console.log(d));
  })

  // This method performs after all the tests.
  // after(() => {
  //   // Close Eyes to tell the server it should display the results.
  //   cy.eyesClose()
  // })

  it('Fire alert should be indicated on the map view', ()=> {
    mapPage.visitMapPage();

    mapPage.waitForMapToLoad();

    cy.get('div[aria-label="Map"]').then($canvas => {
      cy.wrap($canvas).dragMapFromCenter({
        // Go 1/6 of map container width to the right (positive direction)
        xMoveFactor: -1 / 2.5,
        // Go 1/3 of map container height to top (positive direction)
        yMoveFactor: 1 / 3
      })
    })

    mapPage.zoomInMap();

    // // Verify window using Applitools eyes
    // cy.eyesCheckWindow({
    //   tag: "Map page",
    //   target: 'window',
    //   fully: true,
    //   matchLevel: 'Layout'
    // });
  })

  it('Fire alert indicator should be shown', ()=> {
    cy.get('[data-cy=fire-alert-minimised]', {timeout: 10000}).should('be.visible');
  });

  it('Warning alert indicator should not be shown', ()=> {
    cy.get('i[class="ph ph-warning"]').should('not.exist');
  });

  it('Alert centre should be shown when clicked on alert indicator',()=> {
    cy.wait(2000);

    mapPage.clickOnFireAlertIcon();

    cy.wait(2000);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/alert-centre');
    });
  });

  it('Alert centre should show the alert received',()=> {
    cy.wait(500)
    cy.get('table').contains('td', sensorName);
  });

  it('It should be possible to resolve the alerts from alert centre',()=> {
    alertPage.clickClearAllAlerts();

    alertPage.selectTestAlertFromPopUp();
  });

  it('Move to map and verify that alerts are not shown',()=> {
    mapPage.visitMapPage();

    mapPage.waitForMapToLoad();

    cy.get('div[aria-label="Map"]').then($canvas => {
      cy.wrap($canvas).dragMapFromCenter({
        // Go 1/6 of map container width to the right (positive direction)
        xMoveFactor: -1 / 2.5,
        // Go 1/3 of map container height to top (positive direction)
        yMoveFactor: 1 / 3
      })
    })

    mapPage.zoomInMap();

    // cy.eyesCheckWindow({
    //   tag: "Map page",
    //   target: 'window',
    //   fully: true,
    //   matchLevel: 'Layout'
    // });
  });

  it('Fire alert indicator should not be shown', ()=> {
    cy.get('[data-cy=fire-alert-minimised]').should('not.exist');
  });

  it('Warning alert indicator should not be shown', ()=> {
    cy.get('i[class="ph ph-warning"]').should('not.exist');
  });

});
