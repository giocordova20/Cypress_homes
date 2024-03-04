/// <reference types="Cypress"/>

//cypress - Spec
describe('My Second Test Suite', () => {
    it('My First case', () => {
        //test step
        // cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        // cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.visit(Cypress.env('url') + '/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)

        //Parent child chaining
        cy.get('.products').as('productLocator') // use alias command

        //Click by name
        cy.get('@productLocator').find('.product').each(($el, index, $list) => 
            {
                const textveg = $el.find('h4.product-name').text()
                if(textveg.includes('Cashews'))
                {
                    // $e1.find('button').click()
                    cy.wrap($el).find('button').click()
                }
            })


        //assert if log text is expected
        cy.get('.brand').should('have.text', 'GREENKART')

        //this is to print in logs
        cy.get('.brand').then(function(logoelement)
        {
            cy.log(logoelement.text())
        })

        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()









    })
})
