Feature: Character Action Menu
  As a player
  I want to perform actions on a character
  So that I can interact with the game

  Scenario: Requesting character action menu
    Given player has a character available
    When clicking on the character
    Then the action menu should be requested
