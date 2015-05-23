Feature: Register
  As a Player
  I want to register to Imber
  So that I can play the game

  Background:

  Given the widget "register form" is initialized

  Scenario: Register and login
    Given I provide "andy@provictores.com" as "email"
      And I provide "EnoF" as "user name"
      And I provide "secret" as "password"
      And I provide "secret" as "confirmPassword"
      And the registration will be successful
    When I press the "register" button
    Then I should be logged in
      And I should see I am logged in with "EnoF"

  Scenario: Password does not match
    Given I provide "andy@provictores.com" as "email"
      And I provide "EnoF" as "user name"
      And I provide "secret" as "password"
      And I provide "something else" as "confirmPassword"
    When I press the "register" button
    Then I should see the error message "The provided passwords do not match"
