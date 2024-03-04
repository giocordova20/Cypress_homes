/// <reference types="Cypress"/>


//CHECKBOX, STATIC DROPOWN, DYNAMIC DROPDOWN, VISIBLE/NOT VISIBLE 

//cypress - Spec
describe('My Third Test Suite', () => {
    it('My First case', () => {
        //test step
        // cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.visit(Cypress.env('url') + '/AutomationPractice/#/')
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')

        cy.get('input[type="checkbox"]').check(['option2', 'option3'])


        //Static dropdown
        cy.get('select').select('option2').should('have.value','option2')

        //Dynamic dropdown
        cy.get('#autocomplete').type('ind')  // Type 'ind'

        //get the common element of the available options and look for the one you want
        cy.get('.ui-menu-item div').each(($el, index, $list) => 
        {
            if($el.text()==="India")
            {
                cy.wrap($el).click()
            }
        })
        //Assert the selected value of the dynamic dropdown
        cy.get('#autocomplete').should('have.value', 'India')


        //Assert visible / not visible for an element
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        //Radio button
        cy.get('[value=radio2]').check().should('be.checked')


    })
})
