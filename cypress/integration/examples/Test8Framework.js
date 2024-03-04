/// <reference types="Cypress"/>
import HomePage from "../pageObjects/HomePage";
import ProductPage from "../pageObjects/ProductPage";
import ShoppingCart from "../pageObjects/ShoppingCart";
import DeliveryPage from "../pageObjects/DeliveryPage";

//cypress - Spec
describe('Framework suite', () => {

    before(() => {
        // root-level hook
        // runs before every test block

        cy.fixture('example').then(function(data) 
        {
            this.data=data    
            cy.log("***IN Test8Framework " + data.deliveryCountry)
        })
      })


it('First test', function() {
    
    //Create an object for the imported HomePage,Product Page, Shopping Cart, Delivery page
    const homePage = new HomePage
    const productPage = new ProductPage
    const shoppingCart = new ShoppingCart
    const deliveryPage = new DeliveryPage

    //test step
    // cy.visit("https://rahulshettyacademy.com/angularpractice/");
    cy.visit(Cypress.env('url') + '/angularpractice/') //Use the environmental variable for the url

    // cy.get("input[name='name']:nth-child(2)").type('Bob')
    // cy.get('select').select("Female")

    // cy.get("input[name='name']:nth-child(2)").type(this.data.name)  
    // cy.get('select').select(this.data.gender)
    // cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name) // got the css from cypress locator
    // cy.get('input[name="name"]:nth-child(2)').should('have.attr','minlength', '2')
    // cy.get('#inlineRadio3').should('be.disabled')
    // cy.pause()
    // cy.get(':nth-child(2) > .nav-link').click() //Click the Shop Button
    
    //Replace with the homePage POM
    homePage.getEditBox().type(this.data.name)  
    homePage.getGender().select(this.data.gender)
    homePage.getTwoWayDataBinding().should('have.value', this.data.name) // got the css from cypress locator
    homePage.getEditBox().should('have.attr','minlength', '2')
    homePage.getEntrepreneaur().should('be.disabled')
    homePage.getShopTab().click() //Click the Shop Button

    // Cypress.config('defaultCommandTimeout',8000) // Change the command timeout only for this spec

    this.data.productName //Bring in the array from example

    //Use array to select
    this.data.productName.forEach(function(element){
        cy.selectProduct(element)
    })

    // //MULTIPLE PRODUCTS
    // cy.selectProduct('Blackberry') 
    // cy.selectProduct('Nokia Edge')
    //MOVE THIS CODE TO THE COMMAND.JS FILE TO MAKE A CUSTOM COMMAND
    // cy.get('h4.card-title').each(($el, index, $list) => {
    //     if($el.text().includes('Blackberry')) 
    //     {
    //         cy.get('button.btn.btn-info').eq(index).click()  // Click the Add button
    //     }
    // })

    // cy.get("#navbarResponsive > ul > li > a").click() // Click the Checkoutbutton
    productPage.checkOutBtton().click()

    var sum = 0 //Create a variable to summ up the prices
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => 
    {
        cy.log(" *** element text - " + $el.text())

        const actualText=$el.text()
        var res= actualText.split(" ")
        res = res[1].trim()
        sum = Number(sum) + Number(res)
        cy.log('*** Result of split and trim ' + "'" + res + "'")
    }).then(function()
    {
        cy.log(sum)
    })

    cy.get('h3 > strong').then(function(element)
    {
        const amount=element.text()
        var res= amount.split(" ")
        var total = res[1].trim()
        expect(Number(total)).to.equal(sum)
    })



    // cy.contains("Checkout").click()  // Click the CheckOut button on the Shopping Cart page
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





});
