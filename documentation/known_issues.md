# ENDER OCEAN Cockpit

## Know issues

**Cannot get video flow ?**  

You may encounter some difficulties with Internet connections behind proxies or using an RTC cable. Please consider connecting with your "home" Wi-Fi connection.

<br>

**Why I am loosing Freelan connection between server and client ?**  

Sometimes (due to connection inactivity or moving from one point of connection to another), connection between companion PC and server is broken. To solve this, restart service on both sides and execute traceroute commande from companion PC to server (and then in the other sense).   
Objective is to set a route between the two machines.   
Remember that the companion PC knows the IP address of the server. The server does not until PC is referenced.