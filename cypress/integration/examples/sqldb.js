/// <reference types="cypress"/>

describe("SQL DB", () =>
{
    it("Database Interaction", () => 
    {
        cy.sqlServer("select * from Persons").then(function(result)
        {
            console.log("The result from the DB :  " + result) //0row, first column
            console.log("The result[0][1] from the DB :  " + result[0][1]) //0row, first column
        })








    })




})