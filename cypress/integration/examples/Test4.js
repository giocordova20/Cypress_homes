/// <reference types="Cypress"/>


//ALERT 

//cypress - Spec
describe('My Fourth Test Suite', () => {
    it('My First case', () => {
        //test step
        // cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.visit(Cypress.env('url') + '/AutomationPractice/')

        //Open alert. Cypress automatically handles alerts and popups
        cy.get('#alertbtn').click()
        cy.get('[value="Confirm"]').click()
        

        //window:alert event - HOW TO HANDLE AND ASSERT ALERT MESSAGE
        //Trigger alert event - https://docs.cypress.io/api/cypress-api/catalog-of-events#App-Events
        cy.on('window:alert', (str) => 
        {
            //Use Mocha for strings
            expect(str).eq('Hello , share this practice page and share your knowledge')
        })


        //Confirm event
        cy.on('window:confirm', (str) => 
        {
            //Use Mocha for strings
            expect(str).eq('Hello , Are you sure you want to confirm?')
        })









    })
})
