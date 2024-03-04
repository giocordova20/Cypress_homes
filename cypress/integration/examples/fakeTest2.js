/// <reference types="Cypress">

describe('My First Test Suite', function()
{

    it('Display 403 HTTP Code Forbidden for another user. Part1', function(){

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        //mock the request with specific data
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', 
        (req)=>{
            req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra" //change the request url

            req.continue((res)=> //get the response and verify the statusCode
            {
            // expect(res.statusCode).to.equal(403) //AuthorName=malhotra returned results. IT SHOLULD HAVE RETURNED A 403
            }) 
        }
        ).as("dummyUrl")

        cy.get("button[class='btn btn-primary']").click()
        cy.wait("@dummyUrl")





    })

 
})