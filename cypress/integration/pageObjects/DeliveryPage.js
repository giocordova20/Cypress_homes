class DeliveryPage
{

    selectCountry(country)
    {
        cy.get('#country').type(country)  // Type 'India'

        // cy.get('div.suggestions', {timeout:10000}).should('be.visible')
        // cy.get('.suggestions > ul > li > a').each(($el, index, $list) => 
        // {
        //     cy.log("log in each" + $el.text() )
        //     if($el.text()===country)
        //     {
        //         cy.log('In if')
        //         cy.wrap($el).click()
        //     }
        // })
        cy.get('.suggestions > ul > li > a').click()

    }

    agreeCheckBox()
    {
        return cy.get('#checkbox2')
    }

    purchaseButton()
    {
        // return cy.get('.ng-untouched > .btn')
        return cy.get('input[type="submit"]')
    }

    successMessage()
    {
        return cy.get('.alert')
    }
}

export default DeliveryPage