import {mapPage} from "../../pages/mapPage";
import {sitesPage} from "../../pages/sitesPage";

describe("Verify behavior when clean air uplinks are received", () => {

  const sensorId = 108;

  before(() => {
    // //Opening Applitools eyes
    // cy.eyesOpen({
    //   appName: 'Dryad Silvanet',
    //   testName: Cypress.currentTest.title,
    // })

    // Visit sites page
    sitesPage.visitSitesPage();

    cy.wait(2000);
    //Simulate clean air uplink
    cy.simulateEnvMonitoring(sensorId, 0,(d) => console.log(d));
  })

  // // This method performs after all the tests.
  // after(() => {
  //   // Close Eyes to tell the server it should display the results.
  //   cy.eyesClose()
  // })

  it('Fire alerts should not be indicated on the map view', ()=> {
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

    // // Verify window using Applitools eyes
    // cy.eyesCheckWindow({
    //   tag: "Map page",
    //   target: 'window',
    //   fully: true,
    //   matchLevel: 'Layout'
    // });
  })

  it('Fire alert indicator should not be shown', ()=> {
    cy.get('[data-cy=fire-alert-minimised]').should('not.exist');
  });

  it('Warning alert indicator should not be shown', ()=> {
    cy.get('i[class="ph ph-warning"]').should('not.exist');
  });
});
