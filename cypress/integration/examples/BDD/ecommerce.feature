Feature: End to end Ecommerce validation

    application Regression
    @Regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce page
    When I add items to Cart
    When Validate total prices
    Then Select the country submit and verify Thank you


    @Smoke
    Scenario: Filling the form to shop
    Given I open Ecommerce page
    When I fill the form details
    |name | gender |
    |bobz | Male |
    Then validate the form behavior
    Then select the Shop Page