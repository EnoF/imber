#Imber#
Imber is a strategy game.

[![wercker status](https://app.wercker.com/status/56124565b5618ce4988c1a1e90e0309d/m/master "wercker status")](https://app.wercker.com/project/bykey/56124565b5618ce4988c1a1e90e0309d)

##Features

###User account
Users can be registered. Registered users can also login.

Users will be remembered via cookies for 30 days and refreshed on every login.

###Games
Users will be able to challenge other users for a game. While searching for a player
suggestions will be presented after 1 second delay.

Challenges related to you, will be presented on the `Dashboard`. All the latest games
can be viewed in the `Games` section.

Challenges where you are assigned to as an opponent, allows you to accept the challenge.

You can navigate to any game and view the current state of the game.

###Known issues
* Pressing the enter button will not submit the challenge correctly

##Setup##
Run the following commands to get all dependencies:

    npm install -g bower grunt-cli
    npm install
    bower install

##Run the server##
To run the server:

    grunt server

##Client##
The client will be build with `angular`. For the animations we will be using `famous-angular`.

##Test setup##
The unit tests for the `ViewModels` and `Directives` have access to the `imber-test` app.
The app is a proxy for the `imber` app with additional helpers. For testing we use:

 * karma
 * mocha
 * chai
 * sinon

###Code coverage###
The code coverage can be found when running the server: `http://localhost:9000/coverage`.
We use `istanbul` to generate the report.

###Browsers###
We test for modern browsers only and our unit tests will be run against `PhantomJS`.

##Code documentation##
The documentation is found when running the server under: `http://localhost:9000/docs` or
you can find the docs on: `http://enof.github.io/imber/`. To refresh the documentation,
restart the server.

##Continious integration##
The code is build with `drone.io`.
