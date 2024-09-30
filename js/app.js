// Variable de global:

let start = false;
let isWork = true;
let idIterval;



let workTime = [localStorage.getItem("working-time")];
if(workTime[0] == undefined) workTime[0] = 25;

let pauseTime = [localStorage.getItem("pause-time")];
if(pauseTime[0] == undefined) pauseTime[0] = 5;

// Initiation du temps à la valeur enregistrer
displayTime(workTime[0],0);

// HTML Listener

document.getElementById("play-btn").addEventListener("click",startBtn);

document.getElementById("setting").addEventListener("click",settingBtn);

document.getElementById("popup").addEventListener("click",(event) => {
    if(event.target.id === "popup") settingBtn();
});

document.getElementById("close-btn").addEventListener("click",() => settingBtn());

document.getElementById("working-time").addEventListener("change",(event) => {
        editTime(event.target,workTime);
});
document.getElementById("working-time").value=workTime[0];

document.getElementById("pause-time").addEventListener("change",(event) => {
    editTime(event.target,pauseTime);
});
document.getElementById("pause-time").value=pauseTime[0];

// Fait la modification du temps et l'enregistre

function editTime(element,time){
    if(element.value <= 0 ) element.value = 1;
    if(element.value > 120 ) element.value = 120;
    time[0] = element.value;
    localStorage.setItem(element.id,time[0]);
    if(!isWork){
        displayTime(time[0],0);
    }
    resetPage();
}

// Switch de theme en fonction des périodes

function grayTheme(){
    replaceAllClass("red-bg","gray-bg");
    replaceAllClass("progress-circle-red","progress-circle-gray");
    replaceAllClass("neumorphism-red","neumorphism-gray");
    replaceAllClass("neumorphism-red-setting","neumorphism-gray-setting");
    updateCurrentProgressBar(0);
}

function redTheme(){
    replaceAllClass("gray-bg","red-bg");
    replaceAllClass("progress-circle-gray","progress-circle-red");
    replaceAllClass("neumorphism-gray","neumorphism-red");
    replaceAllClass("neumorphism-gray-setting","neumorphism-red-setting");
    updateCurrentProgressBar(0);
}

function toggleStateBar(){
    const elements = Array.from(document.getElementById("statusbar").children);
    for(const i in elements) {
        const element = elements[i];
        element.classList.toggle('unselected-status');
    }
}

// Fonction utilitaire pour changer les class dans le DOM

function replaceAllClass(oldClass,newClass){
    const elements = Array.from(document.getElementsByClassName(oldClass));
    for(const i in elements) {
        const element = elements[i];
        element.classList.remove(oldClass);
        element.classList.add(newClass);
    }
}

// Fonctions qui gère la mise a jour de la progression du chrono.

function updateProgessBar(initTime,minutes,secondes){
    let time = minutes+(secondes/60);
    let pourcent = ((1-(time/initTime))*100).toFixed(2);
    updateCurrentProgressBar(pourcent);
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

// Getion de l'affichage du chrono numérique

function displayTime(minutes, secondes){
    document.getElementById("timer").innerText=String(minutes).padStart(2,'0') + ":" + String(secondes).padStart(2,'0');
}

// Fonctions qui gère le scenario 

function startChrono(initTime){
    let minutes = initTime;
    let secondes = 0;
    idIterval = setInterval(() => {
        secondes--;
        if(secondes < 0){
            secondes=59;
            minutes--;
        }

        if(minutes < 0){
            clearInterval(idIterval);
            switchTime();
            return;
        }

        updateProgessBar(initTime,minutes,secondes);
        displayTime(minutes,secondes);
    },1000);
}


function switchTime(){
    toggleStateBar();
    if(isWork){
        isWork=false;
        grayTheme();
        startChrono(pauseTime[0]);
    }else{
        isWork=true;
        redTheme();
        startChrono(workTime[0]);
    }
}


// Action des boutons

function startBtn(){
    const btn = document.getElementById("play-btn");
    const btnIcon = btn.children[0];
    if(!start){
        btnIcon.setAttribute("class","fa-solid fa-rotate-right");
        start=true;
        startChrono(workTime[0]);
    }else{
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
    displayTime(workTime[0],0);
    updateCurrentProgressBar(0);
    if(!isWork) toggleStateBar();
    start = false;
    isWork = true;
    
    const btn = document.getElementById("play-btn");
    const btnIcon = btn.children[0];
    
    btnIcon.setAttribute("class","fa-solid fa-play");
}