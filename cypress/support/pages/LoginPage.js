import BasePage from "./BasePage";

class LoginPage extends BasePage {
    visit() {
        cy.visit('/#/login')
    }

    getUserEmailField(){
        return cy.get('#email');
    }

    getUserPasswordField(){
        return cy.get('#password');
    }

    getRememberMeCheckbox(){
        return cy.get('[type="checkbox"]');
    }

    getLoginSubmitButton(){
        return cy.get('#loginButton');
    }

    getRegistrationButton(){
        return cy.get('[href="#/register"]');
    }

    getLoginErrorMessage(){
        cy.log('**Check login error message...**')
        return cy.get('div.error').should('be.visible').and('contain', 'Invalid email or password.');
    }

    getLoginForm(){
        return cy.get('#login-form')
    }

    fillInLoginForm(email, password) {
        cy.log('**Fill in Login form ...**');
        this.getUserEmailField().type(email);
        this.getUserPasswordField().type(password);

        console.log('**Check Remember me...**');
        this.getRememberMeCheckbox().check({force: true});

        console.log('**Submit login...**');
        this.getLoginSubmitButton().click();

    }
}
export default new LoginPage();