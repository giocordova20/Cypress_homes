/// <reference types="Cypress"/>

//cypress - Spec
describe('Handling Child Windows', () => {
    it('Should Handle child window', () => {
        //test step
        // cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.visit(Cypress.env('url') + '/AutomationPractice/')
        
        // you can use the jquery method 'show' to open the hover
        // cy.get('div.mouse-hover-content').invoke('show')  // use the parent element of content
        // cy.contains('Top').click()

        // or you can force the click withouth seeing the hover
        cy.contains('Top').click({force: true})
        cy.url().should('include', 'top')









    })
});
