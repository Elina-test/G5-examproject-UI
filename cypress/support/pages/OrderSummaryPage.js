import BasePage from "./BasePage";

class OrderSummaryPage extends BasePage {
    visit() {
        cy.log('**Opening delivery page...***')
        cy.visit('/#/order-summary')
    }

    getPlaceOrderButton(){
        return cy.get('#checkoutButton');
    }


}

export default new OrderSummaryPage();