export class createPacketsPage {

  static elements = {
    addDevicesBtn: () => cy.get('[data-cy="add-devices"]'),
    packetNameTxt: () => cy.get('[data-cy="packetName"]'),
    chooseDevicesDdl: () => cy.get('[data-cy="choose-device"]'),
    noOfDevicesTxt: () => cy.get('[data-cy="amount"]'),
    addBtn: () => cy.get('[data-cy="button"]'),
    ddlItemSensor: () => cy.get('[data-cy="Sensor"]'),
    ddlItemBg: () => cy.get('[data-cy="bg"]'),
    ddlItemMg: () => cy.get('[data-cy="mg"]'),
    checkBox: () => cy.get('div[role="checkbox"]'),
    placeOnMapBtn: () => cy.get('[data-cy="place-on-map"]'),
    removeDeviceBtn: () => cy.get('[data-cy="remove"]'),
    saveBtn: () => cy.get('[data-cy="save"]'),
    backBtn: () => cy.get('[data-cy="back"]')
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

    this.elements.chooseDevicesDdl().click();
    this.elements.ddlItemSensor().click();

    this.elements.noOfDevicesTxt().type(noOfDevices);
    this.elements.addBtn().click();
  }

  static addBoarderGateways(noOfDevices) {
    createPacketsPage.clickAddDevicesBtn();

    this.elements.chooseDevicesDdl().click();
    this.elements.ddlItemBg().click();

    this.elements.noOfDevicesTxt().type(noOfDevices);
    this.elements.addBtn().click();
  }

  static addMeshGateways(noOfDevices) {
    createPacketsPage.clickAddDevicesBtn();

    this.elements.chooseDevicesDdl().click();
    this.elements.ddlItemMg().click();

    this.elements.noOfDevicesTxt().type(noOfDevices);
    this.elements.addBtn().click();
  }

  static clickSubmitBtn(){
    this.elements.saveBtn().click();
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
