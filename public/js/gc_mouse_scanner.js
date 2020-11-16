/**
 * Mouse scanner 
 *  - Button(btn) : Object
 *	- left   : 0
 *	- right  : 1
 *	- middle : 2
 *  - Move(mov)  : Array[Int]
 *	- x : mov[0] (delta position) 
 *	- y : mov[1] (delta position)
 */

var GC_MOUSE = {};

GC_MOUSE.btn = {};
GC_MOUSE.mov = [0, 0];

GC_MOUSE.handleMouseDown = function(e) {
	GC_MOUSE.btn[e.button] = true;
	e.preventDefault();
}
GC_MOUSE.handleMouseUp = function(e) {
	GC_MOUSE.btn[e.button] = false;
	e.preventDefault();
}
GC_MOUSE.handleMouseMove = function(e){
	const dx = e.movementX;
	const dy = e.movementY;
	GC_MOUSE.mov[0] += dx;
	GC_MOUSE.mov[1] += dy;
}

GC_MOUSE.init = function(enable_mouse, enable_mov) {
	window.removeEventListener("mousedown", GC_MOUSE.handleMouseDown);
	window.removeEventListener("mouseup", GC_MOUSE.handleMouseUp);
	window.removeEventListener("mousemove", GC_MOUSE.handleMouseMove);
	GC_MOUSE.btn = {};
	GC_MOUSE.mov = [0, 0];

	if (enable_mouse) {
		window.addEventListener("mousedown", GC_MOUSE.handleMouseDown);
		window.addEventListener("mouseup", GC_MOUSE.handleMouseUp);
	}
	if (enable_mouse && enable_mov) {
		window.addEventListener("mousemove", GC_MOUSE.handleMouseMove);
	}
}

GC_MOUSE.scan = function(){
	var tNewState = {};
	if (Object.entries(GC_MOUSE.btn).length>0)
		tNewState["btn"] = GC_MOUSE.btn;
	if ((GC_MOUSE.mov[0]|GC_MOUSE.mov[1])!=0)
		tNewState["mov"] = GC_MOUSE.mov;

	if (Object.keys(tNewState).length>0)
		tNewState["dur"] = -1;
	else
		tNewState = null;

	GC_MOUSE.btn = {};
	GC_MOUSE.mov = [0, 0];
	return tNewState;
}
