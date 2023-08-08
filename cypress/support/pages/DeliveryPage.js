import BasePage from "./BasePage";

class DeliveryPage extends BasePage {
    visit() {
        cy.log('**Opening delivery page...***')
        cy.visit('/#/delivery-method')
    }

    getSelectDeliverySpeedButton(){
        return cy.get('.mat-radio-inner-circle').eq(0);
    }

    getContinueButton(){
        return cy.contains('button span', 'Continue');
    }

}

export default new DeliveryPage();