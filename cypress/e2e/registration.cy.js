import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import homePage from '../support/pages/HomePage';
import loginPage from '../support/pages/LoginPage'
import accountCreatePage from '../support/pages/AccountCreatePage';

user.email = faker.internet.email();
user.password = faker.internet.password({ length: 15});


beforeEach ( () => {
    homePage.visit();
    cy.log('**Closing welcome popup ...**');
    homePage.getInfoPopup().click();
})

describe('Registration tests', () => {
    
    it('Successful registration', () => {

        homePage.visit();

        homePage.getAccountButton().click();
        homePage.getLoginButton().click();

        cy.log('**Opening registration form...**')
        loginPage.getRegistrationButton().click();

        accountCreatePage.fillInRegistrationForm(user.email, user.password, user.answer);

        cy.log('**Check that login page opens after registration...**')
        cy.url().should('include', '/login');

        cy.log('**Check login after registration...**')
        loginPage.fillInLoginForm(user.email, user.password);

        cy.log('**Verifying Basket icon appears ...**')
        homePage.getBasketIcon().should('be.visible');

        cy.log('**Verifying User Email in the account dropdown ...**')
        homePage.getAccountButton().click();
        homePage.getAccountUserOptions().should('contain', user.email);

    })
    


    it('Registration attempt with invalid email', () => {

        cy.log('**Opening registration page...**')
        accountCreatePage.visit();

        accountCreatePage.fillInRegistrationFormWithoutSubmit(" ", user.password, user.answer);
        accountCreatePage.getRegistrationForm().click()


        cy.log('**Check worning message appears...**');
        accountCreatePage.getErrorMessageField()
        .should('be.visible')
        .and('contain', 'Email address is not valid.')
    
        cy.log('**Check submit button is disabled...**')
        accountCreatePage.getSubmitRegistrationButton().should('be.disabled')
    })

    it('Registration attempt with wrong repeat password', () => {

        cy.log('**Opening registration page...**')
        accountCreatePage.visit();

        cy.log('**Fill in registration form with wrong repeat password...**');
        accountCreatePage.getEmailControlField().type(' ');
        accountCreatePage.getPasswordControlField().type(user.password);
        accountCreatePage.getPasswordRepeatField().type(user.password + '1');
        accountCreatePage.getSecurityQuestionDropdown().click();
        accountCreatePage.getSecurityQuestionOption().click();
        accountCreatePage.getSecurityAnswerField().type(user.answer);

        cy.log('**Check worning message appears...**');
        accountCreatePage.getErrorMessageField()
        .should('be.visible')
        .and('contain', ' Passwords do not match ')
    
        accountCreatePage.getSubmitRegistrationButton().should('be.disabled')
    })

    it('Registration attempt with invalid password', () => {
        const shortPassword = user.password.substring(0, 3);
        cy.log('**Opening registration page...**')
        accountCreatePage.visit();

        accountCreatePage.fillInRegistrationFormWithoutSubmit(user.email, shortPassword, user.answer);

        cy.log('**Check worning message appears...**');
        accountCreatePage.getErrorMessageField()
        .should('be.visible')
        .and('contain', 'Password must be 5-40 characters long.')

    
        cy.log('**Check submit button is disabled...**')
        accountCreatePage.getSubmitRegistrationButton().should('be.disabled')
    })


    it('Registration attempt without answer field', () => {

        cy.log('**Opening registration page...**')
        accountCreatePage.visit();

        accountCreatePage.fillInRegistrationFormWithoutSubmit(user.email, user.password, "{leftArrow}");
        accountCreatePage.getRegistrationForm().click()
     

        cy.log('**Check worning message appears...**');
        accountCreatePage.getErrorMessageField()
        .should('be.visible')
        .and('contain', ' Please provide an answer to your security question. ')

    
        cy.log('**Check submit button is disabled...**')
        accountCreatePage.getSubmitRegistrationButton().should('be.disabled')
    })

})
