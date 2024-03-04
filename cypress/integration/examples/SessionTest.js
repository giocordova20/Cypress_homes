/// <reference types="cypress"/>
// import neatCsv from "neat-csv"
const neatCSV = require('neat-csv')
let productName, invoiceNumber

describe('JWT Session and CSV', ()=> {
    it('is logged in through local storage', async()=>{
        let text
        
        cy.LoginAPI().then(function()
        {
        cy.visit("https://rahulshettyacademy.com/client",
        {
            onBeforeLoad :function(window)
            {
                window.localStorage.setItem('token', Cypress.env('token')) //set the token created in the env varialble
            }
        }) 
        }).then(function()
            {
            cy.log("***THE JWT IS: " + Cypress.env('token'))
         })
        
        cy.get(".card-body b").eq(1).then(function(ele){    //get the product name text. This call is asynchronous, so use a .then
            productName=ele.text()
        }) 
        cy.get(".card-body button:last-of-type").eq(1).click() //click the second card button
        cy.get("[routerlink*='cart']").click()
        cy.contains("Checkout").click()
        cy.get("[placeholder='Select Country']").type("ind")
        cy.get(".ta-results button").each(($el,index,$list) =>  //get the country results, iterate through each, search for India
        {                                                       //and click the element
            if($el.text()=== " India")
            {
                cy.wrap($el).click()
            }
        })

        cy.get(".btnn.action__submit.ng-star-inserted").click()
        cy.wait(3000)
        cy.get(".ng-star-inserted:nth-child(3)").then(function(eleI){
            invoiceNumber = eleI.text()
        })
        cy.contains("CSV").click()
        // cy.get(".order-summary tbody tr:nth-child(4) button").click()
        
        cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_auto.csv")
        .then(async (text)=>
        {
            const csv = await neatCSV(text)
            cy.log("csv:  " + csv)
            cy.log("JSON.stringify(csv): " + JSON.stringify(csv))
            cy.log("text: " + text)

            const actualInvoiceCSV = csv[0] ["Invoice Number"] //Get the value out of the CSV array
            const actualProductCSV = csv[0] ["Product Name"]
            
            expect(productName).to.equal(actualProductCSV)
            expect(invoiceNumber).to.contain(actualInvoiceCSV)
            

        })

        
        
    })
})

    // //CODE DOWNLOAD
    // /// <reference types="cypress" />
    // //const neatCSV = require('neat-csv')
    // import neatCSV from 'neat-csv';
    // let productName

    // describe('JWT Session', () => {
    // it('is logged in through local storage', async() => {
    //     cy.LoginAPI().then(function()
    //     {
    //         cy.visit("https://rahulshettyacademy.com/client",
    //         {
    //             onBeforeLoad :function(window)
    //             {
    //                 window.localStorage.setItem('token',Cypress.env('token'))
    //             }
    //         })       
    //     })

    //     cy.get(".card-body b").eq(1).then(function(ele)
    //     {
    //     productName =  ele.text();
    //     })

    //     cy.get(".card-body button:last-of-type").eq(1).click();
    //     cy.get("[routerlink*='cart']").click();
    //     cy.contains("Checkout").click();
    //     cy.get("[placeholder*='Country']").type("ind")
    //     cy.get('.ta-results button').each(($e1, index, $list) => {
    //     if($e1.text()===" India")
    //     {
    //         cy.wrap($e1).click()
    //     }
    // })

    //     cy.get(".action__submit").click();
    //     cy.wait(2000)
    //     cy.get(".order-summary button").click();

    // cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_rahul.csv")
    // .then(async(text)=>
    // {
    //     const csv =  await neatCSV(text)
    //     console.log(csv)
    //     const actualProductCSV = csv[0]["Product Name"]
    //     expect(productName).to.equal(actualProductCSV)
    // })
    // })
    // })

