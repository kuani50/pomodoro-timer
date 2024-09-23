let start = false;
let isWork = true;

const workTime = 25;
const pauseTime = 5;


document.getElementById("play-btn").addEventListener("click",startBtn);


function grayTheme(){
    replaceAllClass("red-bg","gray-bg");
    replaceAllClass("progress-circle-red","progress-circle-gray");
    replaceAllClass("neumorphism-red","neumorphism-gray");
}

function redTheme(){
    replaceAllClass("gray-bg","red-bg");
    replaceAllClass("progress-circle-gray","progress-circle-red");
    replaceAllClass("neumorphism-gray","neumorphism-red");
}

function toggleNavBar(){
    const elements = Array.from(document.getElementById("statusbar").children);
    for(const i in elements) {
        const element = elements[i];
        console.log(element);
        element.classList.toggle('unselected-status');
    }
}


function replaceAllClass(oldClass,newClass){
    const elements = Array.from(document.getElementsByClassName(oldClass));
    for(const i in elements) {
        const element = elements[i];
        element.classList.remove(oldClass);
        element.classList.add(newClass);
    };
}


function updateProgessBar(initTime,minutes,secondes){
    let time = minutes+(secondes/60);
    let pourcent = ((1-(time/initTime))*100).toFixed(2);
    updateCurrentProgressBar(pourcent)
}


function updateCurrentProgressBar(progress){
    let elements = document.getElementsByClassName("progress-circle-red");
    if(elements.length == 1){
        elements[0].style.background=`radial-gradient(closest-side, #a10000 94%, transparent 80% 100%),conic-gradient(#22222280 ${progress}%,  wheat 0)`;
        return;
    }
    elements = document.getElementsByClassName("progress-circle-gray");
    if(elements.length == 1){
        elements[0].style.background=`radial-gradient(closest-side, #434343 94%, transparent 80% 100%),conic-gradient(#22222280 ${progress}%,  wheat 0)`;
        return;
    }
    console.error("Erreur progress bar");
}

function displayTime(minutes, secondes){
    document.getElementById("timer").innerText=String(minutes).padStart(2,'0') + ":" + String(secondes).padStart(2,'0');
}


function startChrono(initTime){
    let minutes = initTime;
    let secondes = 0
    let id = setInterval(() => {
        secondes--;
        if(secondes < 0){
            secondes=59
            minutes--;
        }

        if(minutes < 0){
            clearInterval(id);
            switchTime();
            return;
        }

        updateProgessBar(initTime,minutes,secondes);
        displayTime(minutes,secondes);
    },1000)
}


function switchTime(){
    toggleNavBar();
    if(isWork){
        isWork=false;
        grayTheme();
        startChrono(pauseTime);
    }else{
        isWork=true;
        redTheme();
        startChrono(workTime);
    }
}


function startBtn(){
    if(!start){
        start=true;
        startChrono(workTime);
    }
}