Feature: Login Views
  As a Player
  I want to see the available options based on screen size
  So that I have an optimized experience

  Background:

  Given the widget "login" is initialized

  Scenario: I am viewing on a [ScreenSize] screen in [State] state
    Given I am viewing on a [ScreenSize] screen
    When I am in [State] state
    Then I [LoginCard] Login Card
      And I [LoginForm] Login Form
      And I [RegisterCard] Register Card
      And I [RegisterForm] Register Form

    Where:
    | ScreenSize  | State     | LoginCard | LoginForm   | RegisterCard  | RegisterForm  |
    | large       | SELECT    | see       | not see     | see           | not see       |
    | medium      | SELECT    | see       | not see     | see           | not see       |
    | small       | SELECT    | see       | not see     | see           | not see       |
    | large       | LOGIN     | not see   | see         | see           | not see       |
    | medium      | LOGIN     | not see   | see         | see           | not see       |
    | small       | LOGIN     | not see   | see         | not see       | not see       |
    | large       | REGISTER  | see       | not see     | not see       | see           |
    | medium      | REGISTER  | see       | not see     | not see       | see           |
    | small       | REGISTER  | not see   | not see     | not see       | see           |
