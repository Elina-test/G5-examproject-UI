import BasePage from "./BasePage";


class PaymentOptionsPage extends BasePage {
    visit() {
        cy.log('**Opening delivery page...***')
        cy.visit('/#/payment/shop')
    }

    getFormTitle(){
        return cy.get('h1');
    }

    getAddNewCardOptions(){
        return cy.get('mat-expansion-panel').eq(0);
    }


    getCardNameField() {
        return cy.get('.mat-form-field-wrapper').eq(1);
    }


    getCardNumberField() {
        return cy.get('.mat-form-field-wrapper').eq(2);
    }


    getExpireMonthSelector() {
        return cy.get('select').eq(0).select('5');
    }


    getExpireYearSelector() {
        return cy.get('select').eq(1).select('2085');
    }


    getSubmitCardButton() {
        return cy.get('#submitButton')
    }
    getPaymentForm() {
        return cy.get('.mat-expansion-panel-body').eq(1)
    }
    getSubmitCardButton() {
        return cy.get('#submitButton');
    }

    getSelectCardButton() {
        return cy.get('.mat-radio-inner-circle');
    }

    getProccedButton() {
        return cy.get('button[aria-label="Proceed to review"]');
    }

    fillInNewCardForm(user) {
        cy.log('**Add a new card...**')
        this.getAddNewCardOptions().click();
        this.getCardNameField().click().type(user.name);
        this.getCardNumberField().click().type(user.cardNumber);
        this.getExpireMonthSelector();
        this.getExpireYearSelector();
        this.getSubmitCardButton().click({force: true});
        this.getSelectCardButton().click();
        this.getProccedButton().click({force: true});

    }
}

export default new PaymentOptionsPage();