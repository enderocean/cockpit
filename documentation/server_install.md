# ENDER OCEAN Cockpit

## 1. Server Installation

### 1.1 - Downloads	& Install

Download source code: 

	git clone git@github.com:enderocean/cockpit.git

<br>


### 1.2 - Setup MySQL database

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



### 1.3 - Start server

Install Cockpit application on cloud server.

	cd cockpit
	sudo npm install
	node server

You can use PM2 command to keep server running permantly.

	pm2 start server.js
