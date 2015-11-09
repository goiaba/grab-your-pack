### Grab Your Pack

This is the repo for group project in COMP422 class.
The goal of this mobile app is to help people who lives in buildings to
get notifications whenever they have a new package under the building entrance hall
so they can grab it and avoid stolen packages.

### Steps to run

#Install grunt-cli (globally)
sudo npm install -g grunt-cli

#Install all the package dependencies
npm install

#Install all the bower dependencies
bower install

#Run the task to create the cordova project
grunt create

#Run the task to deploy the app to the browser
grunt serve 

#Run the tast to deploy the app to the device
grunt deploy

#Run the tast to deploy the app to the emulator
grunt emulate