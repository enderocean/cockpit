/**
 * Keyboard scanner
 *  - Key(key) : Object
 *  - Modifierkey(mod) : Object
 * 
 * board scanner generate press event only.
 */



var GC_KEYBOARD = {};

GC_KEYBOARD.key = {};
GC_KEYBOARD.mod = {};

GC_KEYBOARD.handleDown = function(e) {	
	const tCode = GC_KEYBOARD.encode[e.key];
	if (tCode)
		GC_KEYBOARD.key[tCode] = true;
	if (e.key == "Ctrl")	
		GC_KEYBOARD.mod["Ctrl"] = true;
	if (e.key == "Shift")
		GC_KEYBOARD.mod["Shift"] = true;
	if (e.key == "Alt")
		GC_KEYBOARD.mod["Alt"] = true;
	e.preventDefault();
}
GC_KEYBOARD.handleUp = function(e) {
	const tCode = GC_KEYBOARD.encode[e.key];
	if (tCode)
		GC_KEYBOARD.key[tCode] = false;
	if (e.key == "Ctrl")	
		GC_KEYBOARD.mod["Ctrl"] = false;
	if (e.key == "Shift")
		GC_KEYBOARD.mod["Shift"] = false;
	if (e.key == "Alt")
		GC_KEYBOARD.mod["Alt"] = false;
	e.preventDefault();
}

GC_KEYBOARD.init = function(enable_KEYBOARD) {
	window.removeEventListener("keydown", GC_KEYBOARD.handleDown);
	window.removeEventListener("keyup", GC_KEYBOARD.handleUp);
	GC_KEYBOARD.key = {};
	GC_KEYBOARD.mod = {};
	if (enable_KEYBOARD) {
		window.addEventListener("keydown", GC_KEYBOARD.handleDown);
		window.addEventListener("keyup", GC_KEYBOARD.handleUp);
	}
}

GC_KEYBOARD.scan = function(){
	let tNewState = Object.assign(GC_KEYBOARD.key, GC_KEYBOARD.mod);
	if (Object.keys(tNewState).length>0)
		tNewState["dur"] = -1;
	else
		tNewState = null;
	GC_KEYBOARD.key = {};
	GC_KEYBOARD.mod = {};
	return tNewState;
}

GC_KEYBOARD.encode = {
	"A": "a",
	"B": "b",
	"C": "c",
	"D": "d",
	"E": "e",
	"F": "f",
	"G": "g",
	"H": "h",
	"I": "i",
	"J": "j",
	"K": "k",
	"L": "l",
	"M": "m",
	"N": "n",
	"O": "o",
	"P": "p",
	"Q": "q",
	"R": "r",
	"S": "s",
	"T": "t",
	"U": "u",
	"V": "v",
	"W": "w",
	"X": "x",
	"Y": "y",
	"Z": "z",
	"a": "a",
	"b": "b",
	"c": "c",
	"d": "d",
	"e": "e",
	"f": "f",
	"g": "g",
	"h": "h",
	"i": "i",
	"j": "j",
	"k": "k",
	"l": "l",
	"m": "m",
	"n": "n",
	"o": "o",
	"p": "p",
	"q": "q",
	"r": "r",
	"s": "s",
	"t": "t",
	"u": "u",
	"v": "v",
	"w": "w",
	"x": "x",
	"y": "y",
	"z": "z",	
	"0": "0",
	"1": "1",
	"2": "2",
	"3": "3",
	"4": "4",
	"5": "5",
	"6": "6",
	"7": "7",
	"8": "8",
	"9": "9",
	"ArrowUp": "ArrowUp",
	"ArrowDown": "ArrowDown",
	"ArrowRight": "ArrowRight",
	"ArrowLeft": "ArrowLeft",
	"F1": "F1",
	"F2": "F2",
	"F3": "F3",
	"F4": "F4",
	"F5": "F5",
	"F6": "F6",
	"F7": "F7",
	"F8": "F8",
	"F9": "F9",
	"F10": "F10",
	"F11": "F11",
	"F12": "F12",
	"Escape": "Escape",
	" ": "Space",
	"Tab": "Tab",
	"Enter": "Enter",
	"Backspace": "Backspace"
}
