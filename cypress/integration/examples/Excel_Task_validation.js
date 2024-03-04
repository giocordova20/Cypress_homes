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
        // cy.get(".order-summary tbody tr:nth-child(5) button").click()
        cy.get (".order-summary button").contains("Excel").click()
        
        //Location of the downloaded Excel file in the project folder
        const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_auto.xlsx"
 
        //MOVE THIS TO A TASK IN config.js
        // const result = excelToJson({
        //     source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer ***NEEDS TO BE IN A task
        // });

        cy.task('excelToJsonConverter', filePath).then(function(result) 
        {
            cy.log("cy.log -- " + JSON.stringify(result))
            console.log(" ");
            console.log("console.log - The reult:  " + JSON.stringify(result));
            console.log(" ");
            cy.log(result.data[1].A)
            expect(productName).to.equal(result.data[1].B)

        })
        //*** Task - (Files, DB) - > create a command in Config.js, (ExcelToJson) -> then call it in your spec file
        // cy.task(ExcelToJson)

        cy.readFile(filePath).then(function(text){ //use this to see if the content is in the file
            expect(text).to.include(productName)
        })
        
        
    })
})

