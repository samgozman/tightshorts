#!/bin/sh
# Run one time on first server load

# Disable linux firewall. Use VPS firewall instead
ufw disable

apt-get update

# Install Nginx dependencies for dynamic build from source
apt-get install build-essential \
  libpcre3 libpcre3-dev \
  zlib1g zlib1g-dev \
  libssl-dev libgd-dev \
  libxml2 libxml2-dev \
  uuid-dev \
  -y

# Download nginx source code
# TODO: use variable for nginx version
wget https://nginx.org/download/nginx-1.21.6.tar.gz
# Unpack source
tar -zxvf nginx-1.21.6.tar.gz

cd nginx-1.21.6 || exit

# Run nginx configurator
./configure \
  --sbin-path=/usr/bin/nginx \
  --conf-path=/etc/nginx/nginx.conf \
  --error-log-path=/var/log/nginx/error.log \
  --http-log-path=/var/log/nginx/access.log \
  --lock-path=/var/lock/nginx.lock \
  --pid-path=/var/run/nginx.pid \
  --with-pcre \
  --with-http_ssl_module \
  --with-http_v2_module

# Build nginx
make install

# Add nginx to systemd as a service
# Create default NGINX systemd service file
cat >> /lib/systemd/system/nginx.service <<EOL
[Unit]
Description=The NGINX HTTP and reverse proxy server
After=syslog.target network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
PIDFile=/var/run/nginx.pid
ExecStartPre=/usr/bin/nginx -t
ExecStart=/usr/bin/nginx
ExecReload=/usr/bin/nginx -s reload
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOL

# Start nginx as a service and enable it on boot
systemctl start nginx
systemctl status nginx

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
--webroot -w /var/www/html/

# Certificate auto renewal
crontab -l > crontab_new
echo "0 12 * * * /usr/bin/certbot renew --quiet" >> crontab_new
crontab crontab_new
rm crontab_new

# TODO: Install docker and docker-compose