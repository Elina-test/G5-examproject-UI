import user from '../fixtures/user.json';
import homePage from '../support/pages/HomePage';
import loginPage from '../support/pages/LoginPage';
import accountCreatePage from '../support/pages/AccountCreatePage';

beforeEach ( () => {

    homePage.visit();
    cy.log('**Closing welcome popup ...**');
    homePage.getInfoPopup().click();

    cy.log('**Opening registration form...**')
    accountCreatePage.visit();

    accountCreatePage.fillInRegistrationForm(user.email, user.password, user.answer);

})

describe('Authorization tests', () => {

  it('Authorization with correct credentials', () => {
    
    cy.log('**Opening authorization form...**')
    loginPage.visit();

    loginPage.fillInLoginForm(user.email, user.password);

    cy.log('**Verifying Basket icon appears ...**')
    homePage.getBasketIcon().should('be.visible');

    cy.log('**Verifying User Email in the account dropdown ...**')
    homePage.getAccountButton().click();
    homePage.getAccountUserOptions().should('contain', user.email);

})

  it('Attempt to log in without password', () => {

    cy.log('**Opening authorization form...**')
    loginPage.visit();

    cy.log('**Fill in login form without password...**');
    loginPage.getUserEmailField().type(user.email);
    loginPage.getUserPasswordField().type('{leftArrow}');
    loginPage.getLoginForm().click();

    cy.log('**Check that Login button is disabled...**')
    loginPage.getLoginSubmitButton().should('be.disabled')

    cy.log('**Check error message...**')
    accountCreatePage.getErrorMessageField().should('be.visible').and('contain', 'Please provide a password.')


})

  it('Authorization with incorrect login', () => {

    cy.log('**Opening authorization form...**')
    loginPage.visit();

    loginPage.fillInLoginForm(user.email + '1', user.password);

    loginPage.getLoginErrorMessage();

})

 it('Authorization with incorrect password', () => {

    cy.log('**Opening authorization form...**')
    loginPage.visit();

    loginPage.fillInLoginForm(user.email, user.password + '1');

    loginPage.getLoginErrorMessage();

})

 it('Authorization with space before login', () => {

    cy.log('**Opening authorization form...**')
    loginPage.visit();

    loginPage.fillInLoginForm(' ' + user.loginName, user.password);

    loginPage.getLoginErrorMessage();
})


})