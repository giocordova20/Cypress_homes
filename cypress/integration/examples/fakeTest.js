/// <reference types="Cypress">

describe('My First Test Suite', function()
{

    it('Display correct number of books returned in API', function(){

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        cy.intercept({
            method : 'GET',
            url : 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
        {
            statusCode: 200,
            body: [{
                    "book_name": "RestAssured with Java",
                    "isbn": "BSG",
                    "aisle": "2302"}, 
                    {
                    "book_name": "RestAssured with Java",
                    "isbn": "BSG",
                    "aisle": "2302"}]
        }).as('bookretrievals')

        cy.get("button[class='btn btn-primary']").click()
        // cy.wait('@bookretrievals')  //use the response to check the correct number of items displayed in the front end
        cy.wait('@bookretrievals').then(({request, response}) =>
         {
            cy.get('tr').should('have.length', response.body.length+1) //+1 for the header

        })

        // cy.get('p').should('have.text', "Oops only 1 Book available")




    })
})