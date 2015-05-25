Feature: View Challenges
  As a Player
  I want to view all challenges related to me
  So that I can see the status of the game

  Background:

  Given I have 2 Games in "PENDING" state
    And I have 3 Games in "ACCEPTED" state
    And the widget has bound "player id" with "p1l2a3y4e5r6"

  Scenario: I retrieve all my games
    Given the server finds challenges
      And the widget "challenges" is initialized
    When the server responds
    Then I see 2 challenges in "PENDING"
      And I see 3 challenges in "ACCEPTED"
