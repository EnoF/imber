#!/bin/bash
echo "building groc documentation";
git checkout -b grocdoc;
rm -rf app/**/**/*.* app/**/*.js app/*.js test .jshintrc bower.json .bowerrc index.js package.json;
git config user.name "wercker CI";
git config user.email "andortang+wercker.com@gmail.com";
git add -A;
git commit -m "Automatically updated the groc documentation via wercker.com";
git push -f --quiet "https://${GH_TOKEN}@${GH_REF}" grocdoc:gh-pages;
