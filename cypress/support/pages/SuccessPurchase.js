import BasePage from "./BasePage";

class SuccessPurchase extends BasePage {
    visit() {
        cy.visit('/')
    }

    getSuccessPurchaseMessage(){
        return cy.get('h1');
    }


}

export default new SuccessPurchase();