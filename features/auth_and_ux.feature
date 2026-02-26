Feature: E-commerce Website Enhancements and Auth
  As a user
  I want to register, login and have a better shopping experience
  So that I can securely manage my account and browse products

  Background:
    Given I navigate to the e-commerce website

  Scenario: User Registration and Login
    When I navigate to the login page
    And I click on "Register"
    And I register with name "Test User", email "test@example.com", and password "Pass123!"
    Then I should be logged in as "Test User"
    When I logout
    Then I should see the login button
    When I navigate to the login page
    And I login with email "test@example.com" and password "Pass123!"
    Then I should be logged in as "test"

  Scenario: Enhanced Add to Cart Flow
    When I add "Quantum Watch" to the cart
    Then I should see the "Added to Cart!" confirmation
    And I click on text "View Cart & Checkout"
    Then I should see "Quantum Watch" in the cart

  Scenario: Component Showcase Persistence
    When I navigate to the components page
    And I expand the first accordion
    Then I should see the accordion content
    When I navigate to the home page
    And I navigate back to the components page
    Then the accordion content should still be visible
