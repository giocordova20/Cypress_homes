/// <reference types="Cypress"/>

//cypress - Spec
describe('Handling Tables', () => {
    it('Should handle tables', () => {
        //test step
        // cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.visit(Cypress.env('url') + '/AutomationPractice/')

        cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {
            
            cy.log("index - " + index)
            

            const text=$e1.text()

            cy.log("text - " + text)

            if(text.includes("Python"))
            {
                //eq(index) value is the row. and can't apply text()
                cy.get("tr td:nth-child(2)").eq(index).next().then(function(price) 
                {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
                return false
            }
        })









    })
});
