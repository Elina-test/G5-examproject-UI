import BasePage from "./BasePage";

class AddressPage extends BasePage {
    visit() {
        cy.log('**Opening basket page...***')
        cy.visit('/#/address/select')
    }

    getAddNewAddressButton(){
        return cy.get('[routerlink="/address/create"]');
    }

    getCountryField() {
        return cy.get('[placeholder="Please provide a country."]');
    }

    getNameField() {
        return cy.get('[placeholder="Please provide a name."]');
    }

    getMobilePhoneField() {
        return cy.get('[placeholder="Please provide a mobile number."]');
    }

    getZipField() {
        return cy.get('[placeholder="Please provide a ZIP code."]');
    }

    getAddressField() {
        return cy.get('#address');
    }

    getCityField() {
        return cy.get('[placeholder="Please provide a city."]');
    }

    getAddressSubmitButton() {
        return cy.get('#submitButton');
    }

    getUserName() {
        return cy.get('.mat-column-Name');
    }

    getUserAddress() {
        return cy.get('.mat-column-Address');
    }

    getSelectAddressButton() {
        return cy.get('.mat-radio-inner-circle');
    }

    getContinueOrderButton() {
        return cy.contains('button span', 'Continue');
    }

    fillInAddressForm(user) {
        cy.log('**Fill in address form ...**');
        this.getCountryField().type(user.country);
        this.getNameField().type(user.name);
        this.getMobilePhoneField().type(user.mobilePhone);
        this.getZipField().type(user.zip);
        this.getAddressField().type(user.address);
        this.getCityField().type(user.city);

        cy.log('**Confirm address ...**');
        this.getAddressSubmitButton().click();
    }

}
export default new AddressPage();