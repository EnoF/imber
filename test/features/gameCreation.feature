Feature: Game Creation
  As a player
  I want to create a new game
  So that I can play with a friend

  Background:

  Given I am on a game creation panel
    And player is logged in as "EnoF"
    And the opponent has "Rina" as userName
    And the opponent has "a1b2c3d4e5f6g7h8" as _id
  When an opponent is assigned

  Scenario: Receiving an opponent from a child widget
    Then the event should be stopped
      And the opponent should be assigned

  Scenario: Create a new game challenge
    Given opponent is assigned
      And challenge will be successful
    When challenge is requested
    Then the parent will be notified the challenge was successful

  Scenario: Challenge is pending
    Given opponent is assigned
      And challenge will be successful
    When challenge is requested
    Then the challenge should be pending
