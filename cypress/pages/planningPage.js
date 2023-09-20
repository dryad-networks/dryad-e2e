export class planningPage {

  static elements = {
    addPacketBtn: () => cy.get('[label="Add Packet"]'),
    packetInfoSection: () => cy.get('p-card[class="p-element ng-star-inserted"]'),
    rightCardPanel: () => cy.get('p-card[class="p-element ng-star-inserted"]'),
    editIcon: () => cy.get('span[class="p-button-icon ph ph-2x ph-pencil-simple"]'),
    deleteIcon: () => cy.get('button[class="p-element p-ripple p-button p-button-rounded p-button-text p-button-danger p-component p-button-icon-only"]'),
    confirmDeleteBtn: () => cy.get('button[ng-reflect-label="Confirm"]')
  }

  static clickAddPacketBtn() {
    this.elements.addPacketBtn().click();
  }

  static clickEditPacketIcon() {
    this.elements.packetInfoSection().within(() => {
        this.elements.editIcon().click();
    });
  }

  static clickDeletePacketIcon() {
    this.elements.rightCardPanel().within(() => {
      this.elements.deleteIcon().click();
    });
  }

  static clickConfirmDeleteBtn() {
    this.elements.confirmDeleteBtn().click();
  }

  static selectPacket(packetName) {
    cy.contains('span[class="flex-label"]', packetName).click();
  }
}





