import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import homePage from '../support/pages/HomePage';
import basketPage from '../support/pages/BasketPage';
import addressPage from '../support/pages/AddressPage';
import deliveryPage from '../support/pages/DeliveryPage';
import paymentOptionsPage from '../support/pages/PaymentOptionsPage';
import orderSummaryPage from '../support/pages/OrderSummaryPage';
import successPurchase from '../support/pages/SuccessPurchase';

user.email = faker.internet.email();
user.password = faker.internet.password({ length: 15});
user.address = faker.location.streetAddress();
user.city = faker.location.city();
user.name = faker.person.firstName();
user.mobilePhone = faker.phone.number('########');
user.zip = faker.location.zipCode('####');
user.country = faker.location.country();
user.cardNumber = faker.number.int({min: 1234567891234567, max: 6789123456789123});



export function findProductByName(productName) {
  cy.get('body').then(body => {
    if (body.find('mat-card:has(.item-name:contains("' + productName + '"))').length > 0) {
          cy.contains('.item-name', productName).closest('mat-card').find('button').click();
      } else {
        cy.get('button[aria-label="Next page"]').click();
          findProductByName(productName);
      }
})
}

export function placingOrder(user) {
  cy.log('**Opening basket**')
    homePage.getBasketButton().click();

    cy.log('**Check user email...**');
    basketPage.getBasketUserEmail().should('contain', user.email);

    cy.log('**Opening select address page...**')
    basketPage.getCheckoutButton().click();

    cy.log('**Create a new shipping address...**')
    addressPage.getAddNewAddressButton().click();

    addressPage.fillInAddressForm(user);

    cy.log('**Verify user name...**')
    addressPage.getUserName().should('contain', user.name);

    cy.log('**Verify user address...**')
    const expectedAddress = user.address + ', ' + user.city + ', ' + ', ' + user.zip;
    addressPage.getUserAddress().should('contain', expectedAddress)

    cy.log('**Select address...**')
    addressPage.getSelectAddressButton().click();

    cy.log('**Opening delivery page...**')
    addressPage.getContinueOrderButton().click();

    cy.log('**Select delivery speed...**')
    deliveryPage.getSelectDeliverySpeedButton().click();

    cy.log('**Opening payment options page...**')
    deliveryPage.getContinueButton().click();

    cy.log('**Check form title...**')
    paymentOptionsPage.getFormTitle().should('contain', 'My Payment Options');

    paymentOptionsPage.fillInNewCardForm(user);

    cy.log('**Placing an order...**')
    orderSummaryPage.getPlaceOrderButton().click();

    cy.log('**Check success message...**')
    successPurchase.getSuccessPurchaseMessage().should('contain', 'Thank you for your purchase!')
}