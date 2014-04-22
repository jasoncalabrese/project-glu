#!/bin/bash

#Will be run as root
apt-get install --yes nodejs npm nodejs-legacy mongodb git
npm install -g grunt-cli bower
#these are used by the yeoman generated app, probably don't really need them
npm install -g grunt-google-cdn nodemon

su glu -c ~glu/clone-and-setup-repos.sh
