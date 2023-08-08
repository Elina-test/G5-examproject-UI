import BasePage from "./BasePage";

class BasketPage extends BasePage {
    visit() {
        cy.log('**Opening basket page...***')
        cy.visit('/#/basket')
    }

    getBasketUserEmail(){
        return cy.get('app-purchase-basket h1 small', {timeout:20000});
    }

    getBasketProductTitle() {
        return cy.get('mat-row .mat-column-product');
    }

    getCheckoutButton() {
        return cy.get('#checkoutButton', {timeout:20000});
    }
}
export default new BasketPage();