/**
 * Gamepad scanner 
 *  - Dpad(dpad) : number
 *  - Button(btn) : Object
 *  - Stick(stk0/1) : Array
 */

var OS = null;
var GAMEPAD_NAME = null;

function getStrQueryParam(aQuery, aDefault){
    const tValue = URL_PARAMS.get(aQuery);
    if (tValue)
        return tValue;    
    else
        return aDefault;        
}

var inherits = function(childCtor, parentCtor) {
	Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
};

/**
 * GcGamepadBase
 */
var GcGamepadBase = function(id=null){
	this.id = id;
}
GcGamepadBase.prototype.init = function(enable) {
	this.enable = enable;
	this.dev = navigator.getGamepads()[this.id];
	this.dpad = 5;
	this.btn = [];
	this.stk0 = [0,0];
	this.stk1 = [0,0];
    this.gamepad_name = getStrQueryParam("gamepad_name", "");
	this.os = getStrQueryParam("os", "");

    document.getElementById("controller_name").innerHTML = this.gamepad_name.toUpperCase();

};
GcGamepadBase.prototype.scan = function() {
	if (!this.enable || !this.dev)
		return null;

	const tDpad = this.scan_dpad();
	const tBtn = this.scan_btn();
	const tStk = this.scan_stk();

	var tNewState = Object.assign(tDpad, tBtn, tStk);
	if (Object.keys(tNewState).length>0)
		tNewState["dur"] = -1;
	else
		tNewState = null;
	return tNewState;
}

GcGamepadBase.prototype.scan_dpad = function() {
	return {};
}
GcGamepadBase.prototype.scan_btn = function() {
	let tNewBtn = [];
	for (let i=0; l=Math.min(12, this.dev.buttons.length), i<l; i++){
		if (this.dev.buttons[i].pressed)
			tNewBtn.push(i);
	}

	const tSetBtn = tNewBtn.filter(x => !this.btn.includes(x));
	const tUnsetBtn = this.btn.filter(x => !tNewBtn.includes(x));	
	let tChangedBtn = {};
	for (let b of tSetBtn)
		tChangedBtn[b] = true;
	for (let b of tUnsetBtn)
		tChangedBtn[b] = false;
	if (Object.entries(tChangedBtn).length>0){
		this.btn = tNewBtn;
		return {"btn": tChangedBtn};
	} else
		return {};
}
GcGamepadBase.prototype.scan_stk = function() {
	return {};
}
GcGamepadBase.prototype.to9dir = [
    5, // 0x0
    8, // 0x1
    6, // 0x2
    9, // 0x3
    2, // 0x4
    5, // 0x5
    3, // 0x6
    5, // 0x7
    4, // 0x8
    7, // 0x9
    5, // 0xA
    5, // 0xB
    1, // 0xC
    5, // 0xD
    5, // 0xE
    5  // 0xF
];


/**
 * GcGamepadDigital
 */
var GcGamepadDigital = function(id){
	GcGamepadBase.call(this, id);
}

inherits(GcGamepadDigital, GcGamepadBase);

GcGamepadDigital.prototype.scan_dpad = function(){
    const tUp = (this.dev.axes[1] < -0.5) ? 1:0;
    const tDw = (this.dev.axes[1] >  0.5) ? 1:0;
    const tRt = (this.dev.axes[0] >  0.5) ? 1:0;
    const tLf = (this.dev.axes[0] < -0.5) ? 1:0;
    var tRawDpad = (tLf<<3) | (tDw<<2) | (tRt<<1) | (tUp<<0);
	const tNewDpad = this.to9dir[tRawDpad];

	if (this.dpad != tNewDpad){
		this.dpad = tNewDpad;
		return {"dpad": tNewDpad};
	} else 
		return {};
}


/**
 * GcGamepadAnalog
 */
var GcGamepadAnalog = function(id){
	GcGamepadBase.call(this, id);
}

inherits(GcGamepadAnalog, GcGamepadBase);

GcGamepadAnalog.prototype.to8bit = function(v){
    return (v * 127) | 0;
}
GcGamepadAnalog.prototype.scan_dpad = function(){

	// if (this.dev.buttons.length<15)
	// 	return {};

	// **** PS3 *******

	// Windows config
   // const tUp = (this.dev.buttons[12].pressed) ? 1:0;
   // const tDw = (this.dev.buttons[13].pressed) ? 1:0;
   // const tRt = (this.dev.buttons[14].pressed) ? 1:0;
   // const tLf = (this.dev.buttons[15].pressed) ? 1:0;

   // Linux config
   // const tUp = (this.dev.buttons[13].pressed) ? 1:0;
   // const tDw = (this.dev.buttons[14].pressed) ? 1:0;
   // const tRt = (this.dev.buttons[15].pressed) ? 1:0;
   // const tLf = (this.dev.buttons[16].pressed) ? 1:0;

   // ***** PS3 *******
   var tUp = null;
   var tDw = null;
   var tRt = null;
   var tLf = null;


   if (this.os == "windows") {

	   if (this.gamepad_name == "ps3") {
		   	tUp = (this.dev.buttons[13].pressed) ? 1:0;
		   	tDw = (this.dev.buttons[14].pressed) ? 1:0;
		   	tRt = (this.dev.buttons[15].pressed) ? 1:0;
		   	tLf = (this.dev.buttons[16].pressed) ? 1:0;
	   }
	   else {

			// **** XIpunt or PS4 or Thrusmaster *******
		   	tUp = (this.dev.buttons[12].pressed) ? 1:0;
		   	tDw = (this.dev.buttons[13].pressed) ? 1:0;
		   	tRt = (this.dev.buttons[14].pressed) ? 1:0;
		   	tLf = (this.dev.buttons[15].pressed) ? 1:0;
	   }
   }
   else {

	   if (this.gamepad_name == "ps3") {
		   	tUp = (this.dev.buttons[13].pressed) ? 1:0;
		   	tDw = (this.dev.buttons[14].pressed) ? 1:0;
		   	tRt = (this.dev.buttons[15].pressed) ? 1:0;
		   	tLf = (this.dev.buttons[16].pressed) ? 1:0;
	   }
	   else {

			// **** XIpunt or PS4 or Thrusmaster *******
		   	tUp = (this.dev.axes[7] == -1) ? 1:0;
		   	tDw = (this.dev.axes[7] == 1) ? 1:0;
		   	tRt = (this.dev.axes[6] == 1) ? 1:0;
		   	tLf = (this.dev.axes[6] == -1) ? 1:0;
	   }
   }

   var tRawDpad = (tLf<<3) | (tDw<<2) | (tRt<<1) | (tUp<<0);
   const tNewDpad = this.to9dir[tRawDpad];

   if (this.dpad != tNewDpad){
	   this.dpad = tNewDpad;
	   return {"dpad": tNewDpad};
   } else 
	   return {};
}
GcGamepadAnalog.prototype.scan_stk = function(){
	var tNewStk0 = [];
	var tNewStk1 = [];
	var tNewStk2 = [];

	// Windows config
	if (this.os == "windows") {
		tNewStk0[0] = this.to8bit(this.dev.axes[0]);
		tNewStk0[1] = this.to8bit(this.dev.axes[1]);
		tNewStk1[0] = this.to8bit(this.dev.axes[2]);
		tNewStk1[1] = this.to8bit(this.dev.axes[3]);
		tNewStk2[0] = this.to8bit(this.dev.axes[4]);
		tNewStk2[1] = this.to8bit(this.dev.axes[5]);

	}
	else {
		// Linux config
		tNewStk0[0] = this.to8bit(this.dev.axes[0]);
		tNewStk0[1] = this.to8bit(this.dev.axes[1]);
		tNewStk1[0] = this.to8bit(this.dev.axes[3]);
		tNewStk1[1] = this.to8bit(this.dev.axes[4]);
		tNewStk2[0] = this.to8bit(this.dev.axes[2]);
		tNewStk2[1] = this.to8bit(this.dev.axes[5]);

	}


	var tNewStk = {};
	if (JSON.stringify(this.stk0)!=JSON.stringify(tNewStk0))
		tNewStk["stk0"] = tNewStk0;
	if (JSON.stringify(this.stk1)!=JSON.stringify(tNewStk1))
		tNewStk["stk1"] = tNewStk1;
	if (JSON.stringify(this.stk2)!=JSON.stringify(tNewStk2))
		tNewStk["stk2"] = tNewStk2;
	this.stk0 = tNewStk0;
	this.stk1 = tNewStk1;
	this.stk2 = tNewStk2;	
	return tNewStk;
}

/**
 * GcGamepadCustom
 */
var GcGamepadCustom = function(id){
	GcGamepadBase.call(this, id);
}

inherits(GcGamepadCustom, GcGamepadBase);

