### Grab Your Pack

This is the repo for group project in COMP422 class.
The goal of this mobile app is to help people who lives in buildings to
get notifications whenever they have a new package under the building entrance hall
so they can grab it and avoid stolen packages.

# Steps to run

#####Install grunt-cli (globally)
  
    sudo npm install -g grunt-cli

#####Install all the package dependencies
  
    npm install

#####Install all the bower dependencies

[CordovaDialogPlugin](https://github.com/goiaba/cordova-dialog-plugin) is a separate project and must be checked out in order to be installed by bower. After checking it out, change the path corresponding to the plugin inside the bower.json file accordingly. Only after these steps you are ready to run the following command:

    bower install

#####Run the task to create the cordova project

    grunt create

#####Run the task to deploy the app to the browser

    grunt serve 

#####Run the task to deploy the app to the device

    grunt deploy

#####Run the task to deploy the app to the emulator

    grunt emulate
