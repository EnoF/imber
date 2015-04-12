Feature: Games Overview
  As a player
  I want to have an overview of games
  So that I can navigate to games I am interested in

  Background:

  Given I am navigating games
    And I have started a game with "Rina"
    And I have started a game with "Banana"
    And I have a pending game with "Banhammer"

  Scenario: Games I am involved with
    Given I am logged in as "EnoF"
    When receiving the overview list
    Then the list should contain "Rina"
