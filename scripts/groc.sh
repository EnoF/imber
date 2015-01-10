#!/bin/bash 
if [ $WERCKER_GIT_BRANCH == "master" ];
  then echo "building groc documentation";
  git checkout master;
  grunt groc:dist;
  rm -rf app/**/**/*.* app/**/*.js app/*.js test .jshintrc bower.json .bowerrc index.js package.json;
  git config user.name "drone.io CI";
  git config user.email "andortang+drone.io@gmail.com";
  git add -A;
  git commit -m "Automatically updated the groc documentation via drone.io";
  git push -f --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages;
fi;
