const paddleL = document.getElementById("paddle-left");
const paddleR = document.getElementById("paddle-right");
const ball = document.getElementById("ball");
const score = document.querySelector(".score");
const score1 = document.querySelector(".score1");
const bar = document.getElementById("center");
let scorR = parseInt(document.getElementById("score-r").innerText) || 0;
let scorL = parseInt(document.getElementById("score-l").innerText) || 0;
let gamePaused = false;

const pause = document.createElement("h1");
pause.style.fontSize = "xx-large";
pause.style.position = "absolute";
pause.style.top = "50%";
pause.style.left = "50%";
pause.style.transform = "translate(-50%, -50%)";
pause.innerText = "Paused";

if (!paddleL.style.top) {
    paddleL.style.top = `${window.innerHeight * 0.4}px`;
}

if (!paddleR.style.top) {
    paddleR.style.top = `${window.innerHeight * 0.4}px`;
}

let ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
let ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
let ballPosX = window.innerWidth / 2;
let ballPosY = window.innerHeight / 2;
ball.style.left = `${ballPosX}px`;
ball.style.top = `${ballPosY}px`;

function moveBall() {
    if (gamePaused) return;

    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        location.href = "index.html";
    }

    const ballHeight = ball.offsetHeight;
    const ballWidth = ball.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;
    let lastBallSpeedX = ballSpeedX;
    let lastBallSpeedY = ballSpeedY;
    ball.style.left = `${ballPosX}px`;
    ball.style.top = `${ballPosY}px`;

    if (ballPosY <= 0 || ballPosY + ballHeight >= windowHeight) {
        ballSpeedY = -ballSpeedY;
    }

    const paddleLHeight = paddleL.offsetHeight;
    const paddleRHeight = paddleR.offsetHeight;
    const paddleLTop = parseInt(paddleL.style.top);
    const paddleRTop = parseInt(paddleR.style.top);

    if (ballPosX <= paddleL.offsetWidth) {
        if (ballPosY >= paddleLTop && ballPosY <= paddleLTop + paddleLHeight) {
            ballSpeedX = -ballSpeedX;
        }
    }

    if (ballPosX + ballWidth >= windowWidth - paddleR.offsetWidth) {
        if (ballPosY >= paddleRTop && ballPosY <= paddleRTop + paddleRHeight) {
            ballSpeedX = -ballSpeedX;
        }
    }

    if (ballPosX <= 0) {
        scorR++;
        document.getElementById("score-r").innerText = scorR;
        ballPosX = window.innerWidth / 2;
        ballPosY = window.innerHeight / 2;
    }

    if (ballPosX + ballWidth >= windowWidth) {
        scorL++;
        document.getElementById("score-l").innerText = scorL;
        ballPosX = window.innerWidth / 2;
        ballPosY = window.innerHeight / 2;
    }

    if (scorL == 21) {
        gamePaused = true;
        paddleL.style.backgroundColor = "darkgray";
        paddleR.style.backgroundColor = "darkgray";
        ball.style.backgroundColor = "darkgray";
        score.style.color = "darkgray";
        score1.style.color = "darkgray";
        bar.style.backgroundColor = "darkgray";
        const winTextL = document.createElement("h1");
        winTextL.style.fontSize = "xx-large";
        winTextL.style.position = "absolute";
        winTextL.style.top = "50%";
        winTextL.style.left = "50%";
        winTextL.style.transform = "translate(-50%, -50%)";
        winTextL.innerText = "Player 1 Wins!";
        document.body.appendChild(winTextL);
    } else if (scorR == 21) {
        gamePaused = true;
        paddleL.style.backgroundColor = "darkgray";
        paddleR.style.backgroundColor = "darkgray";
        ball.style.backgroundColor = "darkgray";
        score.style.color = "darkgray";
        score1.style.color = "darkgray";
        bar.style.backgroundColor = "darkgray";
        const winTextR = document.createElement("h1");
        winTextR.style.fontSize = "xx-large";
        winTextR.style.position = "absolute";
        winTextR.style.top = "50%";
        winTextR.style.left = "50%";
        winTextR.style.transform = "translate(-50%, -50%)";
        winTextR.innerText = "Player 2 Wins!";
        document.body.appendChild(winTextR);
    }
}

function updatePos(event) {
    const step = 20;
    const paddleLHeight = paddleL.offsetHeight;
    const paddleRHeight = paddleR.offsetHeight;
    const windowHeight = window.innerHeight;

    let topL = parseInt(paddleL.style.top);
    if (event.key === "w" || event.key === "W") {
        if (topL > 0) {
            paddleL.style.top = `${topL - step}px`;
        } else {
            paddleL.style.top = "0px";
        }
    } else if (event.key === "s" || event.key === "S") {
        if (topL + paddleLHeight < windowHeight) {
            paddleL.style.top = `${topL + step}px`;
        } else {
            paddleL.style.top = `${windowHeight - paddleLHeight}px`;
        }
    }

    let topR = parseInt(paddleR.style.top);
    if (event.key === "ArrowUp") {
        if (topR > 0) {
            paddleR.style.top = `${topR - step}px`;
        } else {
            paddleR.style.top = "0px";
        }
    } else if (event.key === "ArrowDown") {
        if (topR + paddleRHeight < windowHeight) {
            paddleR.style.top = `${topR + step}px`;
        } else {
            paddleR.style.top = `${windowHeight - paddleRHeight}px`;
        }
    }
}

function endGame(event) {
    if (event.key === "Escape") {
        if (gamePaused) {
            gamePaused = false;
            ballSpeedX = lastBallSpeedX;
            ballSpeedY = lastBallSpeedY;
            paddleL.style.backgroundColor = "whitesmoke";
            paddleR.style.backgroundColor = "whitesmoke";
            ball.style.backgroundColor = "whitesmoke";
            score.style.color = "whitesmoke";
            score1.style.color = "whitesmoke";
            bar.style.backgroundColor = "whitesmoke";
            pause.remove();
        } else {
            gamePaused = true;
            lastBallSpeedX = ballSpeedX;
            lastBallSpeedY = ballSpeedY;
            ballSpeedX = 0;
            ballSpeedY = 0;
            paddleL.style.backgroundColor = "darkgray";
            paddleR.style.backgroundColor = "darkgray";
            ball.style.backgroundColor = "darkgray";
            score.style.color = "darkgray";
            score1.style.color = "darkgray";
            bar.style.backgroundColor = "darkgray";
            document.body.appendChild(pause);
        }
    }
}

document.addEventListener("keydown", (event) => {
    endGame(event);
    updatePos(event);
});

setInterval(moveBall, 1000 / 60);
