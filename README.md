#Imber#
Imber is a strategy game.

[![Build Status](https://drone.io/github.com/EnoF/imber/status.png)](https://drone.io/github.com/EnoF/imber/latest)

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
The code is build with `done.io`.