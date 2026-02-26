Feature: E-commerce Website Functionality
  As a user
  I want to browse products and interact with components
  So that I can verify the website works correctly

  Background:
    Given I navigate to the e-commerce website

  Scenario: Add product to cart
    When I add "Quantum Watch" to the cart
    Then the cart should contain 1 item
    And I click on text "View Cart & Checkout"
    Then I should see "Quantum Watch" in the cart

  Scenario: Interaction with Web Components - Accordion
    When I navigate to the components page
    And I expand the first accordion
    Then I should see the accordion content

  Scenario: Interaction with Web Components - Modal
    When I navigate to the components page
    And I open the system configuration modal
    Then I should see the modal content
    When I close the modal
    Then the modal should be closed

  Scenario: Intentionally fail for rerun demonstration
    When I add "Nebula Sounds" to the cart
    Then I should see "999" items in the cart
