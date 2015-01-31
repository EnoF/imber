Feature: Login on Imber
  As a player
  I want to login to Imber
  So that I can access my games

  Background:

    Given player is on login screen

  Scenario: Player logs in with credentials
    Given player provides "EnoF" as user name
      And player provides "secret" as password
      And the credentials are correct
    When player logs in
    Then player should be logged in

  Scenario: Player attempts to log in with no credentials
    Given player provides "" as user name
      And player provides "" as password
    When player attempts to log in
    Then player should not be logged in

  Scenario: Player logs in with authToken
    Given player has logged in before
      And the token is correct
    When player refreshes the page
    Then player should be logged in
