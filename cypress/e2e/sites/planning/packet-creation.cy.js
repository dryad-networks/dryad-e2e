import {siteInformationPage} from "../../../pages/siteInformationPage";
import {planningPage} from "../../../pages/planningPage";
import {createPacketsPage} from "../../../pages/createPacketsPage";

describe('Verify creating packets', () => {
  const siteName = "Berlin Demonstration";
  const packetName = "Demo Packet";
  const noOfSensors = "2";
  const noOfBgs = "1";
  const sensorNode1 = "SensorNode 1";
  const sensorNode2 = "SensorNode 2";
  const borderGateway1 = "Border Gateway 1";

  before(() => {
    cy.viewport(1920, 1080);
    cy.loginViaUi('ravinda@dryad.net','nawodi89');

    //cy.loginViaApi();
    //cy.setCookie('X-XSRF-TOKEN', '27d34e67480f3c55354ed73e76e79f3167eba064-1693829331099-78e6bd6b8eee517b902574f5')
  })

  it("Planning button should be visible in site page", () => {
    siteInformationPage.visitSiteInformationPage(siteName);

    cy.wait(500)

    // cy.scrollTo('top');
    cy.get('[label=Planning]').should('be.visible');

    siteInformationPage.clickPlanningBtn();
    cy.url().should('include', '/packets');

  //it("Add packet button should be available in packets page", () => {
    cy.get('[label="Add Packet"]').should('be.visible');
  //});

  //it("Create packet page should be open when add packet button is clicked", () => {
    planningPage.clickAddPacketBtn();
    cy.url().should('include', '/packets/_create');
  //});

  //it("It should be possible to enter the packet name", () => {
    createPacketsPage.enterPacketName(packetName);
  //});

    cy.wait(1500);

  //it("It should be possible to add Sensors to the packet", () => {
    createPacketsPage.addSensors(noOfSensors)
  //});

  //it("Added sensor nodes should be listed in the packet", () => {
    cy.get('p-table').within(() => {
      cy.get('tr').contains(sensorNode1).should('be.visible')
      cy.get('tr').contains(sensorNode2).should('be.visible')
    });
  //});

  //it("It should be possible to add a Boarder Gateway to the packet", () => {
    createPacketsPage.addBoarderGateways(noOfBgs);
  //});

  //it("Added Border Gateway should be listed in the packet", () => {
    cy.wait(500)
    cy.get('p-table').within(() => {
      cy.get('tr').contains(borderGateway1).should('be.visible');
    });
  //});

  //it("User should be able to select and place devices on map", () => {
    //cy.scrollTo('top');
    createPacketsPage.selectOneDeviceFromList(sensorNode1);
    createPacketsPage.selectOneDeviceFromList(sensorNode2);
    createPacketsPage.clickPlaceOnMapBtn();

  //});

  //it("Latitude and Longitude of only the devices placed on map should get updated on the list", () => {
  //   verifyLatLong(sensorNode1, true);
  //   verifyLatLong(sensorNode2, true);
  //   verifyLatLong(borderGateway1, false);
  //});

  //it("User should be able to place all the devices on map at once", () => {
    //cy.scrollTo('top');
    createPacketsPage.selectAllDevices();
    createPacketsPage.clickPlaceOnMapBtn();
    cy.wait(500);
  //});

  //it("Latitude and Longitude of all the devices should get updated on the list", () => {
  //   verifyLatLong(sensorNode1, true);
  //   verifyLatLong(sensorNode2, true);
  //   verifyLatLong(borderGateway1, true);
  //});

  //it("User should be able to save the packet", () => {
    createPacketsPage.clickSubmitBtn();
  //});

  //it("Created packet should be listed in Packets view", () => {
    //cy.scrollTo("bottom");

    cy.wait(500);

    createPacketsPage.clickBackBtn();

    cy.get('[class="p-element"]').contains(packetName).should('be.visible');
  //});

  //it("Assigning a user for the packet should be possible", () => {
    cy.contains('span[class="flex-label"]', packetName).parentsUntil('[ng-reflect-ng-class="[object Object]"]').within(() => {
      cy.get('i[class="ph ph-2x ph-user-circle-plus clickable"]').click();
    });

    cy.wait(500);

    cy.get('td').contains('Tester').parent()
      .within($tr => {
          cy.get('p-tableradiobutton').click();
    });

    cy.get('[label="Assign"]').click();
  //});

  //it("Information of the packet should be displayed on the right side", () => {
    cy.get('p-card[class="p-element ng-star-inserted"]')
      .within(() => {
          cy.get('h2').contains(packetName).should('be.visible');
          cy.get('h5').contains(' 3 devices are planned to set up in forest ').should('be.visible');
          cy.get('tr').contains(sensorNode1).should('be.visible');
          cy.get('tr').contains(sensorNode2).should('be.visible');
          cy.get('tr').contains(borderGateway1).should('be.visible');
      });
  //});

  //it("User should be able to delete the created packet", () => {
    planningPage.selectPacket(packetName);
    planningPage.clickDeletePacketIcon();
    planningPage.clickConfirmDeleteBtn();
    cy.get('[class="p-element"]').should('not.have.text', packetName);
  });

  function verifyLatLong(deviceName,isDevicePlaced){
    cy.contains('td', deviceName).parent()
      .within($tr => {
        if (isDevicePlaced) {
          cy.get('td:nth-child(3)').should('not.have.text', ' ');
          cy.get('td:nth-child(4)').should('not.have.text', ' ');
        } else {
          cy.get('td:nth-child(3)').should('have.text', ' ');
          cy.get('td:nth-child(4)').should('have.text', ' ');
        }
      });
   }

});
