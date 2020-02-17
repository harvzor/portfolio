#!/bin/bash

rm -rf dist
mkdir dist

cp -r data dist/
cp -r public dist/
cp -r server dist/
cp -r views dist/
cp config.json dist/
cp package-lock.json dist/
cp package.json dist/
cp server.js dist/
