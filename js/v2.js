"use strict";

function $(id) {
	return document.getElementById(id);
}

// false when tones are played at the same time
var wait = true;

var ifToPlay = false;

var tones = [
	"c", "cis", "d", "dis", "e", "f", "fis", "g", "gis", "a", "ais", "h", "c1"
];

var intervals = [
	"pryma czysta"
	, "sekunda mała"
	, "sekunda wielka"
	, "tercja mała"
	, "tercja wielka"
	, "kwarta czysta"
	, "tryton"
	, "kwinta czysta"
	, "seksta mała"
	, "seksta wielka"
	, "septyma mała"
	, "septyma wielka"
	, "oktawa czysta"
];

var toPlay = [
	"sekunda mała"
	, "sekunda wielka"
	, "tryton"
	, "septyma mała"
	, "septyma wielka"
];

var tP = [];

/*
data
	f First random tone
	s Second random tone
	d difference between f and s -> interval
*/

var data = {
	f: 0,
	s: 0,
	d: -1
}
var tone1 = new Audio(),
	tone2 = new Audio();

function play() {
	tone1.src = "tones/" + tones[data.f] + ".wav";
	tone2.src = "tones/" + tones[data.s] + ".wav";
	// tone2.addEventListener("loadeddata", play, false);
	// console.log("OK, tone2 is loaded!");
	tone1.play();
	setTimeout(function () {
		tone2.play();
	}, wait ? 670 : 0)
	
}

function update() {
	tp = [];
	for (var i = 0; i < toPlay.length; i++) {
		tP.push(intervals.indexOf(toPlay[i]));
	}
}

function random() {
	var elems = tones.length;
	data.f = Math.floor(Math.random() * elems);
	data.s = Math.floor(Math.random() * elems);
	if (ifToPlay) {
		var r = Math.floor(Math.random() * elems);
		if (data.f + r < tones.length) data.s = data.f + r;
		else data.s = (data.f + r) % tones.length;
		console.log(data.f + " + " + r + " = " + data.s);
	}
	data.d = Math.abs(data.f - data.s);
	return true;
};

function clear() {
	setTimeout(function () {
		$("ans").value = "";
		answer.classList.add("hidden");
	}, 100);
}

function checkAns(){
	ans = $("ans").value;
	$("ans").blur();
	var sp = ans.split(' ');
	if (sp[1] == "m" || sp[1] == "mała") sp[1] = "mała";
	else if (sp[1] == "w" || sp[1] == "wielka") sp[1] = "wielka";
	else if (sp[0] !== "tryton") sp[1] = "czysta";
	var ansv = sp.join(' ');
	if (data.d === -1) {
		answer.classList.remove("hidden");
		answer.innerHTML = "<span class=\"danger\">Jeszcze nie zagrano interwału!</span>";
		return false;
	} else if (ansv === intervals[data.d]) {
		answer.classList.remove("hidden");
		answer.innerHTML = "<span class=\"good\">Miałeś rację, zagrany interwał to " + intervals[data.d] + "</span>";
		setTimeout(function () {
			playExt();
		}, 600);
		return true;
	} else {
		answer.classList.remove("hidden");
		answer.innerHTML = "<span class=\"bad\">Pomyliłeś się, zagrany interwał to " + intervals[data.d] + "</span>";
		return false;
	}
	return false;
}

var btn = $("play");
var check = $("check");
var replay = $("replay");
var answer = $("answer");
var notWait = $("wait");
var ans = "";
//PLAY
function playExt() {
	clear();
	random();
	play();
}
btn.addEventListener("click", function (e) {
	playExt();
}, false);
//REPLAY
replay.addEventListener("click", function (e) {
	play();
}, false);
//CHECK
check.addEventListener("click", checkAns, false);

$("ans").addEventListener("keypress", (e) => {
	if(e.keyCode === 13)return checkAns();
}, false);
//WAIT
notWait.addEventListener("change", function (e) {
	if (this.checked) wait = false;
	else wait = true;
}, false);
