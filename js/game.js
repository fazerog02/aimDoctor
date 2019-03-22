let param;
let intervalStr;
let interval;
let targetSize;
let settedInterval;

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

    document.body.innerHTML = "";

    settedInterval = setInterval(setTarget, interval);
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
        let result = document.createElement("p");
        result.innerText = clickCounter.toString() + '%';
        document.body.appendChild(result);
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
    document.body.appendChild(object);

    counter++;
}


function deleteTarget(){
    document.body.removeChild(document.body.firstChild);
}
