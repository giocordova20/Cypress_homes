/// <reference types="Cypress"/>
/// <reference types="cypress-iframe"/>
import 'cypress-iframe'

//cypress - Spec
describe('Frames test - iframe', () => {
    it('Should Handle iframe', () => {
        //test step
        // cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.visit(Cypress.env('url') + '/AutomationPractice/')
        

        cy.frameLoaded("#courses-iframe")

        cy.iframe().find("a[href*='mentorship']").eq(0).click()
        cy.wait(500)
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)








    })
});
