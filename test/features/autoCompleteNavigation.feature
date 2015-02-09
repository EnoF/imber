Feature: Autocomplete Navigation
  As a player
  I want to navigate the suggestions with arrow keys
  So that I don't have to leave the keyboard while typing

  Background:

  Given player is on an auto complete field
    And there is an option "hello"
    And there is an option "hellow"
    And there is an option "helelel"
    And the player types "hell"

  Scenario: Focus down from [Start] to [Expected]
    Given focus is on position [Start]
    When pressing down arrow
    Then the focus should be on position [Expected]

    Where:
    Start | Expected
    1     | 2
    2     | 3
    3     | 3

  Scenario: Focus up from [Start] to [Expected]
    Given focus is on position [Start]
    When pressing up arrow
    Then the focus should be on position [Expected]

    Where:
    Start | Expected
    1     | 1
    2     | 1
    3     | 2
