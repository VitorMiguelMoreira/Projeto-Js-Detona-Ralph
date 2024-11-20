const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    values:{
    timerId: null,
    countdownTimerId: setInterval(countdown, 1000),
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    },
};

function countdown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime < 0) {
        alert("Game Over! O seu resultado foi: "+ state.values.result)
        clearInterval(state.actions.countdownTimerId)
        clearInterval(state.actions.timerId)
    };
}



function playsound(){
    let audio = new Audio("./src/audio/hit.m4a")
    audio.volume = 0.2
    audio.play()
}

function randomSquare(){
    state.view.square.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox(){
    state.view.square.forEach((square) => {
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playsound();
            }
        })
    });
};

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function init(){
    moveEnemy()
    addListenerHitBox()
    botaoMuta()
}

init();