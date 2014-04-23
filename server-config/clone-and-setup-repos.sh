#!/bin/bash

##############################
# Will be run as non-root user
##############################

cd

git clone https://github.com/jasoncalabrese/project-glu.git
cd project-glu/
npm install
bower install
grunt build:dist

cd ..
git clone https://github.com/jasoncalabrese/cgm-remote-monitor.git
cd cgm-remote-monitor/
npm install
bower install

cd ..
git clone https://github.com/andreafabrizi/Dropbox-Uploader/

cd ..

#Download most recent backup from dropbox
BACKUP=$(Dropbox-Uploader/dropbox_uploader.sh list | tail -n1 | awk '{ print $3 }')
Dropbox-Uploader/dropbox_uploader.sh download $BACKUP
tar -xzvf $BACKUP
mongorestore --db project-glu dump/project-glu/
