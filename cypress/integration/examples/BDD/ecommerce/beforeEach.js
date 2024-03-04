beforeEach(() => 
{
    cy.fixture('example').then(function(data) 
    {
        this.data=data    
        
        // dataObject2 = JSON.stringify(data, null, 4)
        
        cy.log("**** IN beforeEach.js file - dataObject1 : " + JSON.stringify({data}, null, 4))
        // cy.log("**** IN beforeEach.js file - dataObject2 : " + dataObject2)

        cy.log("**** IN beforeEach.js file: " + data.deliveryCountry)
    })
  });