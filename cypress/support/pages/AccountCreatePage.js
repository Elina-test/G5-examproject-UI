import BasePage from "./BasePage";

class AccountCreatePage extends BasePage {
    visit() {
        cy.visit('/#/register')
    }

    getEmailControlField() {
        return cy.get('#emailControl');
    }

    getPasswordControlField() {
        return cy.get('#passwordControl');
    }

    getPasswordRepeatField() {
        return cy.get('#repeatPasswordControl');
    }

    
    getSubmitRegistrationFormButton() {
        return cy.get('.form-group [type="submit"]');
    }

    getSecurityQuestionDropdown() {
        return cy.get('[name="securityQuestion"]');
    }

    getSecurityQuestionOption() {
        return cy.contains('[role="option"]', ' Your favorite book? ');
    }

    getSubmitRegistrationButton() {
        return cy.get('#registerButton');
    }

    getSecurityAnswerField() {
        return cy.get('#securityAnswerControl');
    }

    getErrorMessageField() {
        return cy.get('mat-error');
    }

    getRegistrationForm() {
        return cy.get('#registration-form');
    }


    fillInRegistrationForm(email, password, answer) {
        cy.log('**Fill in registration form ...**');
        this.getEmailControlField().type(email);
        this.getPasswordControlField().type(password);
        this.getPasswordRepeatField().type(password);
        this.getSecurityQuestionDropdown().click();
        this.getSecurityQuestionOption().click();
        this.getSecurityAnswerField().type(answer);


        cy.log('**Confirm registration ...**');
        this.getSubmitRegistrationButton().click();
    }
    
    fillInRegistrationFormWithoutSubmit(email, password, answer) {
        cy.log('**Fill in registration form...**');
        this.getEmailControlField().type(email);
        this.getPasswordControlField().type(password);
        this.getPasswordRepeatField().type(password);
        this.getSecurityQuestionDropdown().click();
        this.getSecurityQuestionOption().click();
        this.getSecurityAnswerField().type(answer);

    }
}
export default new AccountCreatePage();