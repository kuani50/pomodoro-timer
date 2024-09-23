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



function replaceAllClass(oldClass,newClass){
    const elements = Array.from(document.getElementsByClassName(oldClass));
    for(const i in elements) {
        const element = elements[i];
        element.classList.remove(oldClass);
        element.classList.add(newClass);
    };
}



function displayTime(minutes, secondes){
    document.getElementById("timer").innerText=String(minutes).padStart(2,'0') + ":" + String(secondes).padStart(2,'0');
}




function startChrono(initTime){
    let minutes = initTime;
    let secondes = 0
    setInterval(() => {
        secondes--;
        if(secondes < 0){
            secondes=59
            minutes--;
        }
        updateProgessBar(minutes,secondes);
        displayTime(minutes,secondes);
    },1000)
}

startChrono(25);