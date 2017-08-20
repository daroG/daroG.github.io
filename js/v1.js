

function $(id) {
    'use strict';
    return document.getElementById(id);
}

var intervals = [];

var actual = {
    i: -1,
    j: 0
};

var audios = [
    "pryma",
    "sekunda_m",
    "sekunda_w",
    "tercja_m",
    "tercja_m",
    "kwarta",
    "tryton",
    "kwinta",
    "seksta_m",
    "seksta_w",
    "septyma_m",
    "septyma_w",
    "oktawa"
];

function losujInterwal(bool) {
    'use strict';
    var i = Math.floor(Math.random() * audios.length);
    var j = Math.round(Math.random());
    
    actual.i = i;
    actual.j = j;

    if (bool) console.log(i + " | " + j);
    
    play();
    
//    intervals[i][j].play();
}

function play(){
    'use strict';
    var inter = new Audio();
    inter.src = "audio/" + audios[ actual.i ];
    if(actual.j && actual.i != 0) inter.src+="_h";
    
    inter.src+= ".wav";

    inter.play();
}

function clear(){
    'use strict';
    setTimeout(function(){
        $("ans").value = "";
    }, 700);
}

var btn = $("play");
var check = $("check");
var replay = $("replay");
var ans = $("ans").value;

btn.onclick = function () {
    losujInterwal(true);
}

replay.onclick = function(){
    'use strict';
    var answer = $("answer");
    
    if(actual.i == -1){
        answer.innerHTML = "<span class=\"danger\">Jeszcze nie zagrano interwału!</span>";
        return;
    }
    play();
}

check.onclick = function(){
    ans = $("ans").value;
    
    var answer = $("answer");
    
    if(actual.i == -1){
        answer.innerHTML = "<span class=\"danger\">Jeszcze nie zagrano interwału!</span>";
        return;
    } 
    
    
    console.log(ans);
    
    var spl = ans.split(" ");
    
    var sm;
    s = spl[0];
    if(spl[1] && (spl[1]=="mała" || spl[1]=="m") )
        s+="_m";
    else if(spl[1] && (spl[1]=="wielka" || spl[1]=="w") )
        s+="_w";
    
    
    sm = audios[actual.i].replace("_m", " mała");
    sm = sm.replace("_w", " wielka");
    
    if(audios[actual.i] == s){        
        clear();
        answer.innerHTML = "<span class=\"good\">Miałeś rację, zagrany interwał to " + sm + "</span>";
        
    }
    else{
        answer.innerHTML = "<span class=\"bad\">Pomyliłeś się, zagrany interwał to " + sm + "</span>";
        clear();
    }
    
}












