# ENDER OCEAN Cockpit

## 1. Server Installation

### 1.1 - Downloads	& Install

Download source code: 

	mkdir -p /opt/node
	cd /opt/node
	git clone git@github.com:enderocean/cockpit.git

<br>

### 1.2 - Configure Nginx

Define a DNS entry that enables to connect to your Ender Manager and Ender cockpit.

	cd /etc/nginx/sites-available
	cat > 01-drone1-mydomain-com
	cd ../sites-enabled
	ln -s  ../sites-available/01-drone1-mydomain-com 01-drone1-mydomain-com


Configuration file should be has followed (this file is provided for domain name "drone1.mydomain.com" - replace with yours) :


        server {
                listen 80;
                server_name drone1.mydomain.com;
                return 301 https://$host$request_uri;
        }

        server {
                listen 443 ssl;

                root /opt/node/endergame;
                server_name drone1.mydomain.com;

                ssl on;
                ssl_certificate /etc/letsencrypt/live/mydomain.com/fullchain.pem;
                ssl_certificate_key /etc/letsencrypt/live/mydomain.com/privkey.pem;

                ssl_protocols TLSv1.2;

                location /mavlink {
                        proxy_redirect off;
                        proxy_read_timeout 96000;
                        proxy_set_header   X-Real-IP        $remote_addr;
                        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                        proxy_set_header   X-Forwarded-Proto $scheme;
                        proxy_set_header   Host             $http_host;
                        proxy_set_header   X-NginX-Proxy    true;
                        proxy_set_header   Connection "upgrade";
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_http_version 1.1;
                        proxy_pass http://9.0.0.12:8088;
                }

                location /gamepad {
                        proxy_redirect off;
                        proxy_read_timeout 96000;
                        proxy_set_header   X-Real-IP        $remote_addr;
                        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                        proxy_set_header   X-Forwarded-Proto $scheme;
                        proxy_set_header   Host             $http_host;
                        proxy_set_header   X-NginX-Proxy    true;
                        proxy_set_header   Connection "upgrade";
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_http_version 1.1;
                        proxy_pass http://9.0.0.12:1880;
                }

                location /keyboard {
                        proxy_redirect off;
                        proxy_read_timeout 96000;
                        proxy_set_header   X-Real-IP        $remote_addr;
                        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                        proxy_set_header   X-Forwarded-Proto $scheme;
                        proxy_set_header   Host             $http_host;
                        proxy_set_header   X-NginX-Proxy    true;
                        proxy_set_header   Connection "upgrade";
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_http_version 1.1;
                        proxy_pass http://9.0.0.12:1880;
                }

                location / {
                        proxy_redirect off;
                        proxy_set_header   X-Real-IP        $remote_addr;
                        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                        proxy_set_header   X-Forwarded-Proto $scheme;
                        proxy_set_header   Host             $http_host;
                        proxy_set_header   X-NginX-Proxy    true;
                        proxy_set_header   Connection "upgrade";
                        proxy_set_header Upgrade $http_upgrade;
                        proxy_http_version 1.1;
                        proxy_pass https://127.0.0.1:4000;
                }

        }

Restart service:

	nginx -t
	service nginx restart



### 1.3 - Setup MySQL database

Ender Cockpit embeds a MySQL database to manage connections and avoid unwanted visitors.

Connect to MySQL as "root":

	mysql -u root -p -h127.0.0.1

Or simply (according to your installation)

	sudo mysql

<br>

Execute the following command in MySQL console:

	DROP DATABASE IF EXISTS np_a_cockpit;
	CREATE DATABASE np_a_cockpit
	  DEFAULT CHARACTER SET utf8
	  DEFAULT COLLATE utf8_general_ci;
	CREATE USER 'np_a_cockpit'@'127.0.0.1' IDENTIFIED BY 'np_a_cockpit';
	GRANT ALL PRIVILEGES ON np_a_cockpit.* TO 'np_a_cockpit'@'127.0.0.1';

<br>



### 1.4 - Start application server

Install Cockpit application on cloud server.

	cd cockpit
	sudo npm install
	node server

You can use PM2 command to keep server running permantly.

	pm2 start server.js
