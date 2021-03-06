# ENDER OCEAN Cockpit

## 1. Pre-requisites

### 1.1 - NodeJS

Install NodeJS 10.21.0 on Cloud server and Companion PC

        apt-get update
        apt-get install build-essential libssl-dev cargo npm
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

Close your terminal and run

        nvm install 10.21.0


<br>

### 1.2 - Nginx


Install Nginx service on Cloud server

        apt-get install nginx



<br>


### 1.3 - Process Manager

Install PM2 on Cloud server to execute Ender Cockpit permanently

        npm install pm2 -g


<br>


### 1.4 - Mavlink2REST

Install Mavlink2REST on local companion PC

        cargo install mavlink2rest
        sudo ln -s ~/.cargo/bin/mavlink2rest /usr/bin/mavlink2rest



<br>

### 1.5 - Node-RED

Install Node-RED on local companion PC

        sudo npm install -g --unsafe-perm node-red

If your OS supports Snap you can install Node-RED with:

        sudo snap install node-red


<br>

### 1.6 - GStreamer

Install GStreamer on local companion PC

        sudo apt-get install libgstreamer1.0-0 gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-doc gstreamer1.0-tools gstreamer1.0-x gstreamer1.0-alsa gstreamer1.0-gl gstreamer1.0-gtk3 gstreamer1.0-qt5 gstreamer1.0-pulseaudio

<br>

### 1.7 - Freelan

#### 1.7.1 - Service

Install Freelan on your companion PC and your Cloud server.

        sudo apt install freelan
        sudo service freelan start

By default, IPs are :  
* Cloud server : 9.0.0.11  
* Companion PC : 9.0.0.12

<br>

#### 1.7.2 - PC configuration

Check file is as followed : /etc/default/freelan

        # This is the configuration file for /etc/init.d/freelan

        # Configuration files to load.
        #
        # Values should be separated by spaces.
        # Each entry must match a file at /etc/freelan/<entry>.cfg
        #
        CONFIGURATIONS="key"

        # Additional options that are passed to the Daemon.
        #
        #DAEMON_OPTS=""



Edit file to expose freelan on port 12000 on local PC : /etc/freelan/key.cfg

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



<br>


#### 1.7.3 - Server configuration


Check file is as followed : /etc/default/freelan

        # This is the configuration file for /etc/init.d/freelan

        # Configuration files to load.
        #
        # Values should be separated by spaces.
        # Each entry must match a file at /etc/freelan/<entry>.cfg
        #
        CONFIGURATIONS="key"

        # Additional options that are passed to the Daemon.
        #
        #DAEMON_OPTS=""



Edit file to expose freelan on port 12000 on Cloud server : /etc/freelan/key.cfg

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



#### 1.7.4 - Routes establishment

Restart service on PC and server.

Try to ping server from PC first:

        ping 9.0.0.11

<br>


Try to ping PC from server:

        ping 9.0.0.12

