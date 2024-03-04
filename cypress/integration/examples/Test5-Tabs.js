/// <reference types="Cypress"/>

//cypress - Spec
describe('Handling Child Windows', () => {
    it('Should Handle child window', () => {
        //test step
        // cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.visit(Cypress.env('url') + '/AutomationPractice/')
        
        // Remove the 'target' attribute to open the new tab in the same tab
        cy.get('#opentab').invoke('removeAttr','target').click();
        // cy.get('#opentab').click(); // This opens the link in a new tab

        cy.origin("https://www.qaclickacademy.com",()=> {

            cy.get("#navbarSupportedContent a[href*='about']").click(); // Cross domain
            cy.get(".mt-50 h2").should('contain', 'Welcome to QAClick Academy ');
        })








    })
});
