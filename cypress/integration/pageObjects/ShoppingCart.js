class ShoppingCart
{
    checkOutButton()
    {
        return cy.contains('Checkout')
    }

    itemPrice()
    {
        return cy.get('tr td:nth-child(4) strong')
    }

    totalPrice()
    {
        return cy.get('h3 > strong')
    }
}



export default ShoppingCart