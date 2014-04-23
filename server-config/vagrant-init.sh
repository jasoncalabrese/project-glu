#!/bin/bash

##########################
# Will be run as root
##########################

#don't allow ssh to root, only to the glu user
rm .ssh/authorized_keys

apt-get install --yes nodejs npm nodejs-legacy mongodb git nginx

npm install -g grunt-cli bower
#these are used by the yeoman generated app, probably don't really need them
npm install -g grunt-google-cdn nodemon

#run the script as the glu user
su glu -c ~glu/clone-and-setup-repos.sh

#now start the node apps as services
service project-glu start
service nightscout start

rm /etc/nginx/sites-enabled/default
service nginx restart
