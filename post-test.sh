#!/bin/sh

curl -H "Content-Type: application/json" -XPOST 'http://localhost:9000/api/entries/' -d '{
  "timestamp": 1395803314442,
  "bg": 100,
  "direction": "Flat"
}'
