import {sitesPage} from "../../pages/sitesPage";
import {mapPage} from "../../pages/mapPage";

describe("Verify behavior when phase 1 alerts are received", () => {

  const sensorId = 107;

  before(() => {
    // //Opening Applitools eyes
    // cy.eyesOpen({
    //   appName: 'Dryad Silvanet',
    //   testName: Cypress.currentTest.title,
    // })

    // Visit sies page
    sitesPage.visitSitesPage();

    cy.wait(2000);
    //Simulate a warning alert
    cy.simulateEnvMonitoring(sensorId, 1,(d) => console.log(d));
  })

  // // This method performs after all the tests.
  // after(() => {
  //   // Close Eyes to tell the server it should display the results.
  //   cy.eyesClose()
  // })

  it('Warning alert should be indicated on the map view', ()=> {
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

  it('Warning alert indicator should be shown on top bar', ()=> {
    cy.get('i[class="ph ph-warning"]', {timeout: 10000}).should('be.visible');
  });

  it('Fire alert indicator should not be shown', ()=> {
    cy.get('[data-cy=fire-alert-minimised]').should('not.exist');
  });

});
