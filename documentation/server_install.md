# ENDER OCEAN Cockpit

## 1. Server Installation

### 1.1 - Downloads	& Install

Download source code: 

	git clone git@github.com:enderocean/cockpit.git


### 1.2 - Setup MySQL database

Ender Cockpit embeds a MySQL database to manage connections and avoid unwanted visitors.




### 1.3 - Start server

Install Cockpit application on cloud server.

	cd cockpit
	sudo npm install
	node server

You can use PM2 command to keep server running permantly.

	pm2 start server.js
