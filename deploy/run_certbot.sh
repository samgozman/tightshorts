#!/bin/sh

# Install certbot (for certificates renewal) via snap
# snap should be available in ubuntu 20.04 and above
snap install core; snap refresh core
snap install --classic certbot

# Prepare the certbot command line
ln -s /snap/bin/certbot /usr/bin/certbot

# Get certificate only, without modifying existing nginx.conf
# TODO: use variable for domain
# --webroot - path for /.well-known
certbot certonly --noninteractive --agree-tos \
--cert-name tightshorts \
-d tightshorts.ru -d www.tightshorts.ru \
-m sam@gozman.space \
--webroot -w /tightshorts/dist

# Certificate auto renewal
crontab -l > crontab_new
echo "0 12 * * * /usr/bin/certbot renew --quiet" >> crontab_new
crontab crontab_new
rm crontab_new