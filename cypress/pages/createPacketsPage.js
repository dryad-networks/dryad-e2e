export class createPacketsPage {

  static elements = {
    addDevicesBtn: () => cy.get('dryad-button[label="Add devices to packet"]'),
    packetNameTxt: () => cy.get('[name=packetName]'),
    noOfDevicesTxt: () => cy.get('[id=integeronly]'),
    addBtn: () => cy.get('dryad-button[label=Add]'),
    addDevicesDdl: () => cy.get('p-dropdown'),
    ddlItemSensor: () => cy.get('[aria-label="Sensor"]'),
    ddlItemBg: () => cy.get('[aria-label="Border Gateway "]'),
    ddlItemMg: () => cy.get('[aria-label="Mesh Gateway "]'),
    submitBtn: () => cy.get('[data-cy="btn-submit"]'),
    backBtn: () => cy.get('[label="Back"]'),
    checkBox: () => cy.get('div[role="checkbox"]'),
    placeOnMapBtn: () => cy.get('button[label="Place on map"]'),
    removeDeviceBtn: () => cy.get('button[label="Remove"]')
  }

  static clickAddDevicesBtn(){
    this.elements.addDevicesBtn().click();
  }

  static enterPacketName(packetName) {
    this.elements.packetNameTxt().type(packetName);
  }

  static removePacketName() {
    this.elements.packetNameTxt().clear();
  }

  static addSensors(noOfDevices) {
    createPacketsPage.clickAddDevicesBtn();

    this.elements.addDevicesDdl().click();
    this.elements.ddlItemSensor().click();

    this.elements.noOfDevicesTxt().type(noOfDevices);
    this.elements.addBtn().click();
  }

  static addBoarderGateways(noOfDevices) {
    createPacketsPage.clickAddDevicesBtn();

    this.elements.addDevicesDdl().click();
    this.elements.ddlItemBg().click();

    this.elements.noOfDevicesTxt().type(noOfDevices);
    this.elements.addBtn().click();
  }

  static addMeshGateways(noOfDevices) {
    createPacketsPage.clickAddDevicesBtn();

    this.elements.addDevicesDdl().click();
    this.elements.ddlItemMg().click();

    this.elements.noOfDevicesTxt().type(noOfDevices);
    this.elements.addBtn().click();
  }

  static clickSubmitBtn(){
    this.elements.submitBtn().click();
  }

  static clickBackBtn(){
    this.elements.backBtn().click();
  }

  static selectOneDeviceFromList(deviceName){
    cy.contains('td', deviceName).parent()
      .within($tr => {
        this.elements.checkBox().click();
    });
  }

  static selectAllDevices() {
    cy.get('thead')
      .within($tr => {
        this.elements.checkBox().click();
      });
  }

  static clickPlaceOnMapBtn() {
    this.elements.placeOnMapBtn().click();
  }

  static clickRemoveDeviceBtn() {
    this.elements.removeDeviceBtn().click();
  }
}
