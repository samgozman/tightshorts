#!/bin/sh

# Update tightshorts project on server
cd ..
docker-compose down
git pull
git fetch origin
docker-compose pull
docker-compose up
