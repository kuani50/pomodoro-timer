let start = false;
let isWork = true;
let idIterval;



let workTime = localStorage.getItem("working-time");
if(workTime == undefined) workTime = 25;

let pauseTime = localStorage.getItem("pause-time");
if(pauseTime == undefined) pauseTime = 5;



displayTime(workTime,0);


document.getElementById("play-btn").addEventListener("click",startBtn);

document.getElementById("setting").addEventListener("click",settingBtn);

document.getElementById("popup").addEventListener("click",(event) => {
    if(event.target.id === "popup") settingBtn()
});

document.getElementById("working-time").addEventListener("change",(event) => {
    workTime = event.target.value;
    localStorage.setItem("working-time",workTime);
    if(isWork){
        displayTime(workTime,0)
    }
});
document.getElementById("working-time").value=workTime;

document.getElementById("pause-time").addEventListener("change",(event) => {
    pauseTime = event.target.value;
    localStorage.setItem("pause-time",pauseTime);
    if(!isWork){
        displayTime(pauseTime,0)
    }
})
document.getElementById("pause-time").value=pauseTime;


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

function toggleStateBar(){
    const elements = Array.from(document.getElementById("statusbar").children);
    for(const i in elements) {
        const element = elements[i];
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
    idIterval = setInterval(() => {
        secondes--;
        if(secondes < 0){
            secondes=59
            minutes--;
        }

        if(minutes < 0){
            clearInterval(idIterval);
            switchTime();
            return;
        }

        updateProgessBar(initTime,minutes,secondes);
        displayTime(minutes,secondes);
    },10)
}


function switchTime(){
    toggleStateBar();
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
    const btn = document.getElementById("play-btn");
    const btnIcon = btn.children[0];
    if(!start){
        btnIcon.setAttribute("class","fa-solid fa-rotate-right");
        start=true;
        startChrono(workTime);
    }else{
        btnIcon.setAttribute("class","fa-solid fa-play")
        resetPage();
    }
}

function settingBtn(){
    let popup = document.getElementById("popup");
    if(popup.style.display != "flex")
        popup.style.display="flex";
    else
        popup.style.display="none";
}

function resetPage(){
    redTheme();
    clearInterval(idIterval);
    displayTime(workTime,0);
    updateCurrentProgressBar(0);
    if(!isWork) toggleStateBar();
    start = false;
    isWork = true;
}