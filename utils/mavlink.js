const request = require('request');

let host = '9.0.0.12';
let port = '1880';


exports.arm = function() {

	try {

		console.log("Mavlink arm");

		let json = {};
		let url = 'http://9.0.0.12:1880/mavlink_arm';
		let headers = {
			'Content-Type': 'application/json'
		};

		//set request parameter
		request.post({headers: headers, url: url, form: json}, function (e, r, body) {

		    return true;
		});
		

	} catch(e) {
		console.error("Something wrong in mavlink.js - Arm vehicle");
		console.error(e);
		return false;
	}
}

exports.disarm = function() {


	try {
		console.log("Mavlink disarm");

		let json = {};
		let url = 'http://9.0.0.12:1880/mavlink_disarm';
		let headers = {
			'Content-Type': 'application/json'
		};

		//set request parameter
		request.post({headers: headers, url: url, form: json}, function (e, r, body) {

		    return true;
		});

	} catch(e) {
		console.error("Something wrong in mavlink.js - Disarm vehicle");
		console.error(e);
		return false;
	}

}


exports.set_mode = function(mode) {

	/*
	mavutil.mavlink.MAV_CMD_DO_SET_MODE, 0,
	base_mode, main_mode, sub_mode, 0, 0, 0, 0)

    Manual: base_mode:217, main_mode:1, sub_mode:0
    Stabilized: base_mode:209, main_mode:7, sub_mode:0
    Acro: base_mode:209, main_mode:5, sub_mode:0
    Rattitude: base_mode:193, main_mode:8, sub_mode:0
    Altitude: base_mode:193, main_mode:2, sub_mode:0
    Offboard: base_mode:209, main_mode:6, sub_mode:0
    Position: base_mode:209, main_mode:3, sub_mode:0
    Hold: base_mode:217, main_mode:4, sub_mode:3
    Missition: base_mode:157, main_mode:4, sub_mode:4
    Return: base_mode:157, main_mode:4, sub_mode:5
    Follow me: base_mode:157, main_mode:4, sub_mode:8
	

	let param1, param2, param3, param4, param5, param6, param7 = 0.0;
	*/
	let uri = "";
	
	switch (mode) {
		case "MANUAL_MODE" :
			uri = "manual_mode";
			break;
		case "STABILIZE" :
			uri = "stabilize";
			break;
		case "DEPTH_HOLD" :
			uri = "depth_hold";
			break;
		case "POSHOLD" :
			uri = "poshold";
			break;
	}

	try {
		
		let json = {};
		let url = 'http://9.0.0.12:1880/mavlink_mode/' + uri;
		let headers = {
			'Content-Type': 'application/json'
		};

		console.log(url);

		//set request parameter
		request.post({headers: headers, url: url, form: json}, function (e, r, body) {

		   // var bodyValues = JSON.parse(body);
		    return true;
		});
	} catch(e) {
		console.error("Something wrong in mavlink.js - Set mode engaged");
		console.error(e);
		return false;
	}
}


exports.move = function(direction) {

	let json = {
	    "header": {
	        "system_id": 255,
	        "component_id":0,
	        "sequence":0
	        
	    },
	    "message": {
	        "type":"MANUAL_CONTROL",
	        "x":1000,
	        "y":0,
	        "z":0,
	        "r":0,
	        "buttons":0,
	        "target":1
	    }
	}

	try {
		return call(json);

	} catch(e) {
		console.error("Something wrong in mavlink.js - Forward");
		console.error(e);
	}
}