Feature: Challenge Player
  As a Player
  I want to challenge an other player
  So that we can have a battle

  Background:

  Given I am logged in as "EnoF"
    And < Player >< UserName   >
    And < Player >< BanHammer  >
    And < Player >< Banana     >
    And < Player >< BananaKing >
    And the widget has bound "player id" with "e1n2o3f4"
    And the server finds challenges
    And the widget "challenges" is initialized
    And I am creating a new challenge

  Scenario: Challenge player
    Given my opponent has id "b1a2n3a4n5a6"
      And the opponent is found
    When I press the "challenge" button
      And the server responds
    Then I should see the challenge in the challenges widget

  Scenario: Search player
    Given I search for "ban"
      And the server finds players
    When the server responds
    Then I should see a list of players
