Feature: Autocomplete
  As a Player
  I want to be receive suggestions while typing
  So that I can find results fast and easily

  Background:

    Given player is on an auto complete field

  Scenario: Suggest when user types "[Input]"
    Given there is an option "hello"
      And there is an option "hellow"
      And there is an option "helelel"
    When the player types "[Input]"
    Then the option "hello" [Hello] suggested
      And the option "hellow" [Hellow] suggested
      And the option "helelel" [Helelel] suggested

    Where:
      Input | Hello | Hellow | Helelel
      hell  | is    | is     | is not
      hel   | is    | is     | is
      hellow| is not| is     | is not

  Scenario: Should load with an delay with input "[Input]"
    Given there is a load function provided
    When the player types "[Input]"
      And the options will be loaded
    Then the options should be empty
    When the delay has passed
    Then the option "hello" [Hello] suggested
      And the option "hellow" [Hellow] suggested
      And the option "helelel" [Helelel] suggested

    Where:
      Input | Hello | Hellow | Helelel
      hell  | is    | is     | is not
      hel   | is    | is     | is
      hellow| is not| is     | is not
