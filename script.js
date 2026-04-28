const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");

let score = 0;

function moveBox() {
    const x = Math.random() * 360;
    const y = Math.random() * 260;
    box.style.left = x + "px";
    box.style.top = y + "px";
}

box.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    moveBox();
});

// initial position
moveBox();
