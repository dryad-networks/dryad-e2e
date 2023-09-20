import {mapPage} from "../../pages/mapPage";
import {alertPage} from "../../pages/alertPage";
import {sitesPage} from "../../pages/sitesPage";

describe("Verify behavior when phase 1 alerts are received", () => {

  const siteId = 18;
  const sensorId = 109;
  const sensorName = 'Eberswalde SN rwdH6';

  before(() => {
    // //Opening Applitools eyes
    // cy.eyesOpen({
    //   appName: 'Dryad Silvanet',
    //   testName: Cypress.currentTest.title,
    // })

    // Visit sies page
    sitesPage.visitSitesPage();

    cy.wait(2000);

    //Change Alert Configuration
    cy.changeAlertConfig(siteId, (d) => console.log(d));

    //Clear db cache
    cy.clearCache();

    //Simulate phase 1 alert
    cy.simulateEnvMonitoring(sensorId, 1,(d) => console.log(d));

    //Simulate gas scans
    for (let i = 1; i < 7; i++)
    {
      cy.simulateGasScan(sensorId, 70, 30, i, (d) => console.log(d));
    }

    //Simulate phase 2 alert
    cy.simulateEnvMonitoring(sensorId, 2,(d) => console.log(d));
  })

  // // This method performs after all the tests.
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
    cy.wait(2000)

    mapPage.clickOnFireAlertIcon();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/alert-centre')
    });
  });

  it('The alert received should be listed in alert center',()=> {
    cy.wait(2000)
    cy.get('table').contains('td', sensorName, {timeout: 10000});
  });

  it('The listed alert should have the "Fire" text',()=> {
    cy.get('table').contains('span', 'Fire', {timeout: 10000});
  });

  it('The listed alert should have the "Wildfire" text',()=> {
    cy.get('table').contains('span', 'Wildfire', {timeout: 10000});
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
