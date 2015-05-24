Feature: Login to Imber
  As a Player
  I want to login to Imber
  So that I can play the game

  Background:

  Given the widget "login" is initialized

  Scenario: Login successful
    Given I provide "enof" as "user name"
      And I provide "secret" as "password"
      And the credentials are correct
    When I press the "login" button
    Then I should be logged in
      And I should see I am logged in with "EnoF"

  Scenario: Login failed
    Given I provide "enof" as "user name"
      And I provide "wrong" as "password"
      And the credentials are incorrect
    When I press the "login" button
    Then I should not be logged in
      And I should see the error message "Login failed... Please try again"
