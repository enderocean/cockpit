# ENDER OCEAN Cockpit

## 1. Pre-requisites

### 1.1 - NodeJS

Install NodeJS 10.21.0 on Cloud server

        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
        nvm install 10.21.0


<br>

### 1.2 - Configure Nginx

Define a DNS entry that enables to connect to your Ender Manager and Ender cockpit.


#### 1.2.1 - Ender Manager

Configuration should be has followed (configuration file is provided for domain name "www.enderocean.com" - replace with yours) :


        server {
                listen 80;
                server_name www.enderocean.com enderocean.com;
                return 301 https://$host$request_uri;
        }

        server {
                listen 443 ssl;

                root /opt/node/endermanager;
                server_name www.enderocean.com enderocean.com;

                ssl on;
                ssl_certificate /etc/letsencrypt/live/enderocean.com/fullchain.pem;
                ssl_certificate_key /etc/letsencrypt/live/enderocean.com/privkey.pem;

                ssl_protocols TLSv1.2;

                location / {
                        proxy_redirect off;
                        proxy_set_header   X-Real-IP        $remote_addr;
                        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                        proxy_set_header   X-Forwarded-Proto $scheme;
                        proxy_set_header   Host             $http_host;
                        proxy_set_header   X-NginX-Proxy    true;
                        proxy_set_header   Connection "upgrade";
                        proxy_set_header   Upgrade $http_upgrade;
                        proxy_http_version 1.1;
                        proxy_pass https://127.0.0.1:1379;
                }

        }




#### 1.2.2 - Ender Cockpit

Configuration should be has followed (configuration file is provided for domain name "drone1.enderocean.com" - replace with yours) :


        server {
                listen 80;
                server_name drone1.enderocean.com;
                return 301 https://$host$request_uri;
        }

        server {
                listen 443 ssl;

                root /opt/node/endergame;
                server_name drone1.enderocean.com;

                ssl on;
                ssl_certificate /etc/letsencrypt/live/enderocean.com/fullchain.pem;
                ssl_certificate_key /etc/letsencrypt/live/enderocean.com/privkey.pem;

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



<br>


### 1.3 - Process Manager

Install PM2 on Cloud server to execute Ender Cockpit permanently

        npm install pm2 -g


<br>

### 1.4 - Node-RED

Install Node-RED on local companion PC

        sudo npm install -g --unsafe-perm node-red

If your OS supports Snap you can install Node-RED with:

        sudo snap install node-red


<br>

### 1.5 - GStreamer

Install GStreamer on local companion PC

        sudo apt-get install libgstreamer1.0-0 gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-doc gstreamer1.0-tools gstreamer1.0-x gstreamer1.0-alsa gstreamer1.0-gl gstreamer1.0-gtk3 gstreamer1.0-qt5 gstreamer1.0-pulseaudio

<br>

### 1.6 - Freelan

#### 1.6.1 - Service

Install Freelan on your companion PC and your Cloud server.

        sudo apt install freelan
        sudo service freelan start


#### 1.6.2 - PC configuration

Check file is as followed : /etc/default/freelan

        # This is the configuration file for /etc/init.d/freelan

        # Configuration files to load.
        #
        # Values should be separated by spaces.
        # Each entry must match a file at /etc/freelan/<entry>.conf
        #
        CONFIGURATIONS="key"

        # Additional options that are passed to the Daemon.
        #
        #DAEMON_OPTS=""



Edit file to expose freelan on port 12000 on local PC : /etc/freelan/key.conf

        [fscp]
        listen_on=0.0.0.0:12000
        contact=drone1.enderocean.com
        cipher_capability=aes256-gcm

        [tap_adapter]
        ipv4_address_prefix_length=9.0.0.12/24
        dhcp_proxy_enabled=yes
        dhcp_server_ipv4_address_prefix_length=9.0.0.0/24

        [security]
        passphrase=asecuredpassword



#### 1.6.3 - Server configuration


Check file is as followed : /etc/default/freelan

        # This is the configuration file for /etc/init.d/freelan

        # Configuration files to load.
        #
        # Values should be separated by spaces.
        # Each entry must match a file at /etc/freelan/<entry>.conf
        #
        CONFIGURATIONS="key"

        # Additional options that are passed to the Daemon.
        #
        #DAEMON_OPTS=""



Edit file to expose freelan on port 12000 on Cloud server : /etc/freelan/key.conf

        [fscp]
        listen_on=0.0.0.0:12000
        cipher_capability=aes256-gcm

        [tap_adapter]
        ipv4_address_prefix_length=9.0.0.11/24
        dhcp_proxy_enabled=yes
        dhcp_server_ipv4_address_prefix_length=9.0.0.0/24

        [security]
        passphrase=asecuredpassword

        [switch]
        routing_method=switch
        relay_mode_enabled=yes
