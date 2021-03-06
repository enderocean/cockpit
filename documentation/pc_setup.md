# ENDER OCEAN Cockpit

## 1. PC Setup

### 1.1 - Mavlink2REST

Start Mavlink2REST on PC. It listens on port 8088.

	mavlink2rest


### 1.2 - Node-RED

Node-RED is up and listening on port 1880. 

Start Node-RED as root:

	sudo su
	cd ~
	cd .node-red
	node-red

Process executes the following:
* Exposes 2 websockets for listening to keyboard and gamepad events sent via Web browser
* Sends mavlink control commands to the ROV using Mavlink2REST
* Sends every 500ms a HEARTBEAT message to the ROV
* Deals with POST events sent directly via the Web User Interface (action buttons, radio buttons...)

![ENDER OCEAN Cockpit Node-RED](https://github.com/enderocean/cockpit/raw/main/img/snapshot_nodered.png "ENDER OCEAN Cockpit Node-RED")

You can [Import flow](https://raw.githubusercontent.com/enderocean/cockpit/main/nodered/flows.json) in your local instance.


<br>

### 1.3 - Screen sharing

Remote control is based on a PC screen sharing operation. 

#### 1.3.1 - Camera

To share your screen, you need to configure the BlueROV2 camera at : 192.168.2.2:2770/camera

	! h264parse
	! queue
	! rtph264pay config-interval=10 pt=96
	! multiudpsink clients=192.168.2.1:5600,192.168.2.1:2000

<br>


#### 1.3.2 - GStreamer

Launch GStreamer command to display camera flow in a simple window:

	gst-launch-1.0 udpsrc port=2000 ! application/x-rtp,media=video,clock-rate=90000,encoding-name=H264 ! rtph264depay ! avdec_h264 ! autovideosink

<br>


#### 1.3.3 - WebRTC Broadcast

And then browse the broadcast WebRTC URL to share this window: https://drone1.mydomain.com/default/broadcast

Replace "mydomain.com" with your own DNS.

<br>

Note. We are currently looking for solution to embed the flow in a desktop application that can be shared through WebRTC properly. Today, we must share the whole desktop. Any suggestion ?

<br>

## 2.0 Online interface

To use software with keyboard, open URL :

https://drone1.mydomain.com/default/home?os=linux&lang=en-EN&gamepad_name=keyboard&wshost=drone1.mydomain.com&enable_keyboard=1

Replace "mydomain.com" with your own DNS.

<br>


To use software with gamepad, open URL :

https://drone1.mydomain.com/default/home?os=linux&lang=en-EN&gamepad_name=xboxone&gamepad_model=2&wshost=drone1.mydomain.com&enable_gamepad=1

Replace "mydomain.com" with your own DNS and gamepad_name with one of the following values:
* xboxone
* xbox360
* ps4
* ps3

Languages available are:
* en-EN
* fr-FR
