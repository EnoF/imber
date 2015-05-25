Feature: View Challenges
  As a Player
  I want to view all challenges related to me
  So that I can see the status of the game

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

  Scenario: I retrieve all my games
    Given the server finds challenges
      And the widget "challenges" is initialized
    When the server responds
    Then I see in pending challenges waiting for me 1 challenge
      And I see in my pending challenges 1 challenge
      And I see in my started challenges 1 challenge
      And I see in the global pending challenges 2 challenges
      And I see in the global started challenges 1 challenge
