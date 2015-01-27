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
