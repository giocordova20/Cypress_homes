describe('API TESTING', function()
{
    it('Add a book using cy.request', function()
    {
        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', 
        {
            "name":"Gio Learn Appium Automation with JAVA",
            "isbn":"bcdssrrs",
            "aisle":"22s9",
            "author":"Johnny Spaceman"
        }).then(function(response)
        {
        expect(response.body).to.have.property("Msg", "successfully added")
        expect(response.status).to.eq(200)
        })

    })
})