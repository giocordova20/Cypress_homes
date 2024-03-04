/// <reference types="Cypress"/>

//cypress - Spec
describe('Perform product search', () => {
    it('Verify results count and add specific product to cart', () => {
        //test step
        // cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.visit(Cypress.env('url') + '/seleniumPractise/#/')

        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('.product:visible').should('have.length',4)

        //Parent child chaining
        cy.get('.products').as('productLocator') // use alias command
        // cy.get('.products').find('.product').should('have.length', 4)
        cy.get('@productLocator').find('.product').should('have.length', 4) // replaces  '.products' with '@productLocator'

        //Click by index
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click().then(() =>
        {
            console.log('sf')
        })
        // console.log('sf') // This will print before the other steps because cypress is asynchronous. Neet to add a .then to
        //previous step to print after the step is resolved.

        //Click by name
        cy.get('@productLocator').find('.product').each(($el, index, $list) => 
            {
                const textveg = $el.find('h4.product-name').text()
                cy.log("prodcut name: " + textveg)
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




    })
})
