#!/bin/sh

# Update tightshorts project on server
cd ..
docker-compose down
git fetch origin
docker-compose up