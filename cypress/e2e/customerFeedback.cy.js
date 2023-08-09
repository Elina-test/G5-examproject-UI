import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import homePage from '../support/pages/HomePage';
import loginPage from '../support/pages/LoginPage';
import accountCreatePage from '../support/pages/AccountCreatePage';
import { placingOrder } from '../support/helper';
import feedbackPage from '../support/pages/FeedbackPage';

user.email = faker.internet.email();
user.comment = faker.lorem.sentence({ min: 10, max: 15 });


it('Send a feedback', () => {
    homePage.visit();
    cy.log('**Closing welcome popup ...**');
    homePage.getInfoPopup().click();

    cy.log('**Accept cookie...**');
    homePage.getCookieDialog().click();

    cy.log('**Opening registration form...**')
    accountCreatePage.visit();

    accountCreatePage.fillInRegistrationForm(user.email, user.password, user.answer);

    loginPage.fillInLoginForm(user.email, user.password);

    cy.visit('/#/');

    cy.log('**Opening a menu ...**');
    homePage.getMenuButton().click()

    cy.log('**Opening feedback form ...**');
    homePage.getFeedbackButton().click()

    feedbackPage.fillInFeedbackForm(user);

    cy.log('**Check success feedbacl message...**')
    feedbackPage.getSuccessPopup().should('be.visible');

  
})