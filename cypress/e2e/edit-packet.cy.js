import {siteInformationPage} from "../../../../dryad-qa-ui/dryad-cypress-tests/cypress/pages/siteInformationPage";
import {planningPage} from "../../../../dryad-qa-ui/dryad-cypress-tests/cypress/pages/planningPage";
import {createPacketsPage} from "../../../../dryad-qa-ui/dryad-cypress-tests/cypress/pages/createPacketsPage";

describe('Verify editing packets', () => {
  const siteName = "Berlin Demonstration";
  const packetName = "Demo Packet";
  const packetNameEdited = "Demo Packet Edited";
  const sensorNode1 = "SensorNode 1";
  const sensorNode2 = "SensorNode 2";
  const emptyPacketNameError = "Packet name can't be empty";
  const infoMsg = " Before placing devices on the map, please ensure that the map is centered on your site location. "

  before(() => {
    cy.viewport(1920, 1080);
    cy.loginViaUi('ravinda@dryad.net','nawodi89');
    siteInformationPage.visitSiteInformationPage(siteName);
    siteInformationPage.clickPlanningBtn();
    planningPage.clickAddPacketBtn();

    createPacketsPage.enterPacketName(packetName);
    createPacketsPage.addSensors('2');

    createPacketsPage.clickSubmitBtn();
    cy.wait(500);
    createPacketsPage.clickBackBtn();
  })

  after("Delete the created packet", () => {
    planningPage.selectPacket(packetNameEdited);
    planningPage.clickDeletePacketIcon();
    planningPage.clickConfirmDeleteBtn();
    cy.get('[class="p-element"]').should('not.have.text', packetNameEdited);
  });

  it("When clicked on edit icon, edit packet view should be opened with packet info", () => {
    planningPage.selectPacket(packetName);
    planningPage.clickEditPacketIcon();

    cy.wait(500);

    cy.get('[name=packetName]').should('have.value', packetName);

    cy.get('p-table').within(() => {
      cy.get('tr').contains(sensorNode1).should('be.visible')
      cy.get('tr').contains(sensorNode2).should('be.visible')
    });
  // });
  //
  // it("If user tries to clear packet name and save, error should be shown", () => {
    createPacketsPage.removePacketName();
    createPacketsPage.clickSubmitBtn();

    cy.get('p-toastitem').contains(emptyPacketNameError).should('be.visible');
  // });
  //
  // it("User should be able to save the Packet with an edited name", () => {
    createPacketsPage.enterPacketName(packetNameEdited);
    createPacketsPage.clickSubmitBtn();
  // });
  //
  // it("User should be able to select a device from the list and remove it and save packet", () => {
    cy.scrollTo('top');
    createPacketsPage.selectOneDeviceFromList(sensorNode1);
    createPacketsPage.clickRemoveDeviceBtn();
    createPacketsPage.clickSubmitBtn();
  // });
  //
  // it("Removed sensor node should not be visible in list but the existing one", () => {
    cy.get('tbody[class="p-element p-datatable-tbody"]')
      .find("tr")
      .should('have.length',1);
  // });
  //
  // it("An information message should be shown when user selects a device", () => {
    cy.scrollTo('top');

    createPacketsPage.selectOneDeviceFromList(sensorNode2);

    cy.get('[class="planing-warning"]').contains(infoMsg).should('be.visible');
  // });
  //
  // it("Edited packet information should be reflected in Packets view", () => {
    cy.scrollTo("bottom");
    cy.wait(500);

    createPacketsPage.clickBackBtn();

    cy.wait(500);

    planningPage.selectPacket(packetNameEdited);
    cy.get('[class="p-element"]').contains(packetNameEdited).should('be.visible');

    cy.get('p-card[class="p-element ng-star-inserted"]')
      .within(() => {
        cy.get('h2').contains(packetNameEdited).should('be.visible');
        cy.get('h5').contains(' 1 devices are planned to set up in forest ').should('be.visible');
        cy.get('tr').contains(sensorNode2).should('be.visible');
      });
  });

});
