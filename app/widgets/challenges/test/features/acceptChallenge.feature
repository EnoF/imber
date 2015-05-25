Feature: Accept Challenge
  As a Player
  I want to accept a challenge
  So that I can play a game

  Background:

  Given I am logged in as "EnoF"
    And < Game  >< Challenger  >< Opponent  >< State     >
    And < Game  >< EnoF        >< Rina      >< ACCEPTED  >
    And < Game  >< EnoF        >< Banana    >< PENDING   >
    And < Game  >< Rina        >< EnoF      >< PENDING   >
    And < Game  >< Banana      >< Rina      >< ACCEPTED  >
    And < Game  >< Banana      >< BanHammer >< PENDING   >
    And < Game  >< Rina        >< BanHammer >< PENDING   >
    And the widget has bound "player id" with "e1n2o3f4"
    And the server finds challenges
    And the widget "challenges" is initialized
    And the server responds

  Scenario: Accept Challenge
    Given I go to pending challenge 1
      And I am authorized to accept the challenge
    When I accept the challenge
    Then I see in pending challenges waiting for me 0 challenge
      And I see in my pending challenges 1 challenge
      And I see in my started challenges 2 challenge
      And I see in the global pending challenges 2 challenges
      And I see in the global started challenges 1 challenge
