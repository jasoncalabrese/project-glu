#!/bin/bash

#Will be run as non-root user
cd

git clone https://github.com/jasoncalabrese/project-glu.git
cd project-glu/
npm install
bower install

cd ..
git clone https://github.com/jasoncalabrese/cgm-remote-monitor.git
cd cgm-remote-monitor/
npm install
bower install

cd ..
git clone https://github.com/andreafabrizi/Dropbox-Uploader/
