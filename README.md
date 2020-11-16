# ENDER OCEAN Cockpit


## 1. About the cockpit 

ENDER OCEAN cockpit is a software solution that enables gamers to control a ROV remotely. They connect to an online Website from home with a simple browser, define their preferences and start operating the remote robot located underwater miles away.  Solution works with BlueRov2 robots with quite a low latency using 4G connection.

<br>

![ENDER OCEAN Cockpit User Interface](https://github.com/enderocean/cockpit/raw/main/img/snapshot_ui.png "ENDER OCEAN Cockpit User Interface")

<br>

In order to set up the system, you need:
- A domain name (for instance "enderocean.com")
- A server under Linux (Ubuntu Server) hosted in the cloud with an access via SSH and NodeJS installed
- A wildcard SSL certificate (you can generate it with Let's encrypt for instance or create a simple renewable instance for each domain you will secure)
- A PC companion (laptop under Linux - Ubuntu 19.10)
- A BlueRov2 connected to your companion Pc
- A gamepad (optional) : XBox One, XBox360, PS4, PS3, etc.

<br>

## 2. How it works ?

**Network** :  
Cloud server is connected to the companion PC using freelan. Companion PC is connected to the robot on the local private network as usual.


**Commands** :  
Gamers can control the ROV through their Web Browser with a gamepad or a keyboard controller.  
All commands are standardized and sent to a Node-RED interface on the PC companion.   
Node-RED program communicates with the robot using [Mavlink2Rest](https://github.com/patrickelectric/mavlink2rest)


**Video** :  
Video flow is broadcasted by the robot to the companion PC, which render it in a local window using GStreamer.  
This window is then shared on the online server using WebRTC protocols.


## 3. Key Links:

* [Pre-requisites](https://github.com/enderocean/cockpit/blob/main/documentation/prerequisites.md)
* [Server Installation](https://github.com/enderocean/cockpit/blob/main/documentation/server_install.md)
* [PC Setup](https://github.com/enderocean/cockpit/blob/main/documentation/pc_setup.md)
* [Known issues](https://github.com/enderocean/cockpit/blob/main/documentation/known_issues.md)
* [Contributions](https://github.com/enderocean/cockpit/blob/main/contributions.md)
* [License](https://github.com/enderocean/cockpit/blob/main/LICENSE)

All the code is open-source, so you can contribute and evolve it as you want. Contact us for any support.