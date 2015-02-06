Feature: Logout at Imber
  As a player
  I want to logout at Imber
  So that I can make sure no one on this machine will
  access my account details

  Background:

    Given player is logged in

  Scenario: Player logs out
    Given player has cookies
    When player logs out
    Then player should be logged out
