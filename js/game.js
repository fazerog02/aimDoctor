let param;
let intervalStr;
let interval;
let targetSize;
let settedInterval;
let targetSpace = document.getElementById("targetSpace");

var clickCounter = 0;


window.onload = function init() {
    param = location.search.substring(1).split('&');
    interval = 1;
    targetSize = "large";

    for (let i = 0; i < param.length; i++) {
        let tmp = param[i].split('=');
        if (i === 0) {
            intervalStr = tmp[1];
        } else {
            targetSize = tmp[1];
        }
    }

    interval = Number(intervalStr);
    interval *= 1000; //parse milliSec

    switch (targetSize) {
        case "large":
            targetSize = 150;
            break;
        case "medium":
            targetSize = 100;
            break;
        case "small":
            targetSize = 50;
            break;
        case "minimum":
            targetSize = 30;
            break;
    }

    let readyInterval = setInterval(readyCount, 1000);

    let readyCounter = 3;
    function readyCount(){
        let space = document.getElementById("readySpace");
        if(readyCounter === 0){
            space.innerText = "GO!";
        } else if(readyCounter < 0){
            space.innerText = "";
            clearInterval(readyInterval);
            settedInterval = setInterval(setTarget, interval);
        } else {
            space.innerText = readyCounter;
        }
        readyCounter--;
    }
};

function randNum(){
    let rand = Math.random();
    rand = rand * 91;

    return Math.floor(rand);
}


let counter = 0;
function setTarget(){
    if(counter >= 1) deleteTarget();
    if(counter >= 100){
        clearInterval(settedInterval);

        let resultHtml =
            "YOUR SCORE" +
            "<br>" +
            `<div id=\"result\">${clickCounter}%</div>` +
            "<div id='exitButton'><a href='/aimDoctor'><span>EXIT</span></a></div>";
        let resultSpace = document.getElementById("resultSpace");
        resultSpace.innerHTML = resultHtml;

        return;
    }
    let object = document.createElement("div");
    object.id = "target";
    object.style.position = "absolute";
    object.style.backgroundColor = "black";
    object.style.height = targetSize.toString() + "px";
    object.style.width = targetSize. toString() + "px";
    object.style.borderRadius = "50%";
    object.style.left = randNum().toString() + "vw";
    object.style.top = randNum().toString() + "vh";
    object.onclick = function (){
        clickCounter++;
    };
    targetSpace.appendChild(object);

    counter++;
}


function deleteTarget(){
    targetSpace.removeChild(targetSpace.firstChild);
}
