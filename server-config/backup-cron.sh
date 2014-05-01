#!/bin/bash

rm -rf dump
mongodump --db project-glu
TARBALL=project-glu-backup-$(date +%Y%b%d).tar.gz
tar -czvf $TARBALL dump
Dropbox-Uploader/dropbox_uploader.sh upload $TARBALL $TARBALL
