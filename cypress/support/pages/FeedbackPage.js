import BasePage from "./BasePage";

class FeedbackPage extends BasePage {
    visit() {
        cy.log('**Opening feedback page...***')
        cy.visit('/#/contact')
    }

    getAuthorField(){
        return cy.get('[aria-label="Field with the name of the author"]');
    }

    getCommentField() {
        return cy.get('#comment');
    }

    getRatingSlider() {
        return cy.get('#rating').as('range').invoke('val', 4).trigger('change').click()
    }

    getCaptchaData() {
        return cy.get('#captcha')
    }

    getCaptchaControlField() {
        return cy.get('#captchaControl')
    }


    getSubmitButton() {
        return cy.get('#submitButton');
    }

    getSuccessPopup() {
        return cy.contains('span', 'Thank you for your feedback.');
    }

    fillInFeedbackForm(user) {
        cy.log('**Fill in Feedback form ...**');
        this.getAuthorField().should('be.disabled');
        this.getCommentField().clear().type(user.comment);

        cy.log('**Set rating ...**');
        this.getRatingSlider();


        cy.log('**Captcha control ...**');
        this.getCaptchaData().invoke('text').then(text => {
            const matches = text.match(/(\d+|[+\-*/])/g);
            
            let result = parseFloat(matches[0]);
            let currentOperator = null;
        
            for (let i = 1; i < matches.length; i++) {
                const token = matches[i];
                
                if (['+', '-', '*', '/'].includes(token)) {
                    currentOperator = token;
                } else if (!isNaN(parseFloat(token))) {
                    if (currentOperator === '+') {
                        result += parseFloat(token);
                    } else if (currentOperator === '-') {
                        result -= parseFloat(token);
                    } else if (currentOperator === '*') {
                        result *= parseFloat(token);
                    } else if (currentOperator === '/') {
                        result /= parseFloat(token);
                    }
                }
            }
            this.getCaptchaControlField().clear().type(result);
        });

        cy.log('**Submit feedback...**');
        this.getSubmitButton().click();

    }
}

export default new FeedbackPage();
