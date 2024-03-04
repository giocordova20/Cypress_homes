/// <reference types="Cypress" />
import DeliveryPage from "../../../pageObjects/DeliveryPage";
import HomePage from "../../../pageObjects/HomePage";
import ProductPage from "../../../pageObjects/ProductPage";
import ShoppingCart from "../../../pageObjects/ShoppingCart";
import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor";

const homePage = new HomePage();
const productPage = new ProductPage();
const deliveryPage = new DeliveryPage();
const shoppingCart = new ShoppingCart();
let name // global variable

//THIS WAS MOVED TO THE beforeEach.js file located in the same folder
// beforeEach(() => {
//     // root-level hook
//     // runs before every test block

//     cy.fixture('example').then(function(data)
//     {
//         this.data=data    
//         cy.log("IN eCommStepDef.js " + this.data.deliveryCountry)
//     })
//   })


Given('I open Ecommerce page', () =>
{
    cy.visit(Cypress.env('url') + '/angularpractice/')
})

When('I add items to Cart', function()
{
    homePage.getShopTab().click() //Click the Shop Button

    // //Use array to select
    // this.data.productName.forEach(function(element) {
    //     cy.selectProduct(element)
    // })
    this.data.productName.forEach(function(element) {
 
        cy.selectProduct(element)
      });
    productPage.checkOutButton().click()
})

When('Validate total prices', () => 
{
    var sum = 0 //Create a variable to summ up the prices
    var items = shoppingCart.itemPrice()
    shoppingCart.itemPrice().each(($el, index, $list) => 
    // cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => 
    {
        cy.log(" *** element text - " + $el.text())

        const actualText=$el.text()
        var res= actualText.split(" ")
        res = res[1].trim()
        sum = Number(sum) + Number(res)
        cy.log('*** Result of split and trim ' + "'" + res + "'")
    }).then(function()
    {
        cy.log(" ")
        cy.log("The sum of the items in the cart: " + sum)
        cy.log(" ")
    })

    shoppingCart.totalPrice().then(function(element)
    {
        const amount=element.text()
        var res= amount.split(" ")
        var total = res[1].trim()
        expect(Number(total)).to.equal(sum)
    })

})

Then('Select the country submit and verify Thank you', function() //use function() when bringing in fixture data
    {
        shoppingCart.checkOutButton().click() 

        // Enter a country for delivery and click it
        deliveryPage.selectCountry(this.data.deliveryCountry)
        deliveryPage.agreeCheckBox().click({force: true})
        deliveryPage.purchaseButton().click()
        deliveryPage.successMessage().should('be.visible')
        
        //Use contain to not include the extra space in the message
        // deliveryPage.successMessage().should('contain.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
        deliveryPage.successMessage().then(function(element)
        {
            const actualText=element.text()
            expect(actualText.includes("Success")).to.be.true
        })
})


When('I fill the form details', function(dataTable)
{
    // homePage.getEditBox().type(this.data.name)  
    // homePage.getGender().select(this.data.gender)
    
    //[bobz, Male]
    name = dataTable.rawTable[1][0] //name variable declared at the top with "let name"
    homePage.getEditBox().type(name)  
    // homePage.getEditBox().type(dataTable.rawTable[1][0])  
    homePage.getGender().select(dataTable.rawTable[1][1])
})

Then('validate the form behavior', function()  
{
    homePage.getTwoWayDataBinding().should('have.value',name) // name value from 
    // homePage.getTwoWayDataBinding().should('have.value', this.data.name) // got the css from cypress locator
    homePage.getEditBox().should('have.attr','minlength', '2')
    homePage.getEntrepreneaur().should('be.disabled')
})

Then('select the Shop Page', () =>
{
    homePage.getShopTab().click() //Click the Shop Button

})