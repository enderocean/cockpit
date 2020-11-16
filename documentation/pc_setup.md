# ENDER OCEAN Cockpit

## 1. PC Setup

### 1.1 - Node-RED

Node-RED is up and listening on port 1880. 

Process executes the following:
* Exposes 2 websockets for listening to keyboard and gamepad events sent via Web browser
* Sends mavlink control commands to the ROV using Mavlink2REST
* Sends every 500ms a HEARTBEAT message to the ROV
* Deals with POST events sent directly via the Web User Interface (action buttons, radio buttons...)

![ENDER OCEAN Cockpit Node-RED](https://github.com/enderocean/cockpit/raw/main/img/snapshot_nodered.png "ENDER OCEAN Cockpit Node-RED")

You can [Import flow](https://) in your local instance.

<br>

### 1.2 - Screen sharing

Remote control is based on a PC screen sharing operation. 

#### 1.2.1 - Camera

To share your screen, you need to configure the BlueROV2 camera at : 192.168.2.2:2770/camera

	! h264parse
	! queue
	! rtph264pay config-interval=10 pt=96
	! multiudpsink clients=192.168.2.1:5600,192.168.2.1:2000

<br>


### 1.2.2 - GStreamer

Launch GStreamer command to display camera flow in a simple window:

	gst-launch-1.0 udpsrc port=2000 ! application/x-rtp,media=video,clock-rate=90000,encoding-name=H264 ! rtph264depay ! avdec_h264 ! autovideosink

<br>


#### 1.2.3 - WebRTC Brodcast

And then browse the broadcast WebRTC URL to share this window: http://drone1.mydomain.com/default/broadcast

<br>

Note. We are currently looking for solution to embed the flow in an application that can be shared through WebRTC. Any suggestion ?


