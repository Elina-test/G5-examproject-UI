import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import homePage from '../support/pages/HomePage';
import loginPage from '../support/pages/LoginPage';
import accountCreatePage from '../support/pages/AccountCreatePage';
import { placingOrder } from '../support/helper';

user.email = faker.internet.email();
user.password = faker.internet.password({ length: 15});
user.address = faker.location.streetAddress();
user.city = faker.location.city();
user.name = faker.person.firstName();
user.mobilePhone = faker.phone.number('########');
user.zip = faker.location.zipCode('####');
user.country = faker.location.country();
user.cardNumber = faker.number.int({min: 1234567891234567, max: 6789123456789123});


it('Place order', () => {
    homePage.visit();
    cy.log('**Closing welcome popup ...**');
    homePage.getInfoPopup().click();

    cy.log('**Accept cookie...**');
    homePage.getCookieDialog().click();

    cy.log('**Opening registration form...**')
    accountCreatePage.visit();

    accountCreatePage.fillInRegistrationForm(user.email, user.password, user.answer);

    loginPage.fillInLoginForm(user.email, user.password);
    
    cy.log('**Add random product to cart from main page**')
    cy.visit('/#/search');
    homePage.getRandomProductAddButton().click();

    placingOrder(user);


})
