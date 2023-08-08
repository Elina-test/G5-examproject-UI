import BasePage from "./BasePage";

class HomePage extends BasePage {
    visit() {
        cy.log('**Opening main page...***')
        cy.visit('/')
    }

    getInfoPopup(){
        return cy.get('mat-dialog-container [aria-label="Close Welcome Banner"]');
    }

    getCookieDialog() {
        return cy.contains('a', 'Me want it!');
    }

    getRandomProductAddButton(){
        return cy.get('mat-card button', {timeout:30000}).eq(0);
    }


    getProductTitle() {
        return cy.get('div.item-name').eq(0);
    }
}

export default new HomePage();