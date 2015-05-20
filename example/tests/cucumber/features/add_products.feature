Feature: Adding Product to the Shopping Cart

  As an online shopper
  I want to add products to my shopping cart
  So that I can purchase them

  The objective of this feature test is to test adding products to the shopping cart.  Ancillary checks are to see that the product amounts are properly
  added and summarized.

  # The background will be run for every scenario
  Background:
    Given I am an online shopper

  # This scenario will run as part of the Meteor dev cycle because it has the @dev tag
  @dev
  Scenario:
    When I navigate to "/"
    Then I should see the title "cart - example"

  # This scenario will not run as part of the Meteor dev cycle because it does not have the @dev tag
  # But it will run on CI if you use `meteor --test` for instance
  Scenario:
    When I navigate to "/"
    Then I should see the title "cart - example"