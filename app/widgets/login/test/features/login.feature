Feature: Login to Imber
  As a Player
  I want to login to Imber
  So that I can play the game

  Background:

  Given parent scope is initialized
    And the widget "login form" is initialized

  Scenario: Login successful
    Given I provide "enof" as "user name"
      And I provide "secret" as "password"
      And the credentials are correct
    When I press the "login" button
    Then I should be logged in
