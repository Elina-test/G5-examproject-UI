export default class BasePage {

    getAccountButton() {
        cy.log('**Opening account dropdown menu...**');
        return cy.get('#navbarAccount');
    }
    getLoginButton() {
        cy.log('**Opening account login page...**');
        return cy.get('#navbarLoginButton');
    }

    getBasketIcon() {
        return cy.contains('mat-icon', ' shopping_cart ');
    }

    getAccountUserOptions() {
        return cy.get('.mat-menu-content');
    }
    
    getProductCounter() {
        return cy.get('.fa-layers-counter');
    }

    getBasketButton() {
        return cy.get('[routerlink="/basket"]')
    }

    getMenuButton() {
        return cy.contains('mat-icon', 'menu')
    }

    getFeedbackButton() {
        return cy.contains('span', ' Customer Feedback ')
    }
}