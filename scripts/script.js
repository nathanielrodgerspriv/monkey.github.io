let currentPage = "landing";
let ignoreNextClick = false;

// ----------------
// buttons and pages

const mainPage = document.getElementById("mainPage");
const gamePage = document.getElementById("gamePage");
const landingPage = document.getElementById("landingPage");
const storyPage = document.getElementById("storyPage");
const photosPage = document.getElementById("photosPage");
const videoPage = document.getElementById("videoPage");
const letterPage = document.getElementById("letterPage");
const writtenLetter = document.getElementById("writtenLetter");

const storyText = document.getElementById("storyText");

const storyButton = document.getElementById("storyButton");
const heartButton = document.getElementById("heart");
const gameButton = document.getElementById("gameButton");
const backButton = document.getElementById("backButton");
if (currentPage === "main") backButton.style.display = "none";
const toLanding = document.getElementById("toLanding");
const landingReset = document.getElementById("landingReset");

const mainBottomText = document.getElementById("mainBottomText");
const letterButton = document.getElementById("letterButton");
const photoButton = document.getElementById("photoButton");
const videoButton = document.getElementById("videoButton");
const loveLetterButton = document.getElementById("loveLetterButton");

function setPage(page) {
    currentPage = page;

    mainPage.style.display = "none";
    gamePage.style.display = "none";
    
    storyPage.style.display = "none";
    landingPage.style.display = "none";
    letterPage.style.display = "none";
    writtenLetter.style.display ="none";
    photosPage.style.display = "none";
    videoPage.style.display = "none";

    storyButton.style.display = "none";
    toLanding.style.display = "none";
    gameButton.style.display = "none";

    mainBottomText.style.display = "none";

    if (page === "main") {
        mainPage.style.display = "block";
        backButton.style.display = "none";
        heartButton.style.display = "none";

        storyButton.style.display = "block";
        toLanding.style.display = "block";
        // gameButton.style.display = "block";

        mainBottomText.style.display = "block";

        requestAnimationFrame(() => {
        document.body.className = "main";
    });
    }

    if (page === "game") {
        gamePage.style.display = "block";
        backButton.style.display = "block";
    }

    if (page === "story") {
        storyPage.style.display = "block";
        backButton.style.display = "block";
    }

    if (page === "landing") {
        landingPage.style.display = "block";
        heartButton.style.display = "block";
        document.body.className = "landing"
    }
    if (page === "letter") {
        letterPage.style.display = "block";
        backButton.style.display = "block";
    }
    if (page === "loveletter") {
        writtenLetter.style.display = "block";
        backButton.style.display = "block";
        setTimeout(() => {
            document.body.className = "loveLetter";
        }, 300);
    }

    if (page === "photos") {
        photosPage.style.display = "block";
        backButton.style.display = "block";
    }

    if (page === "video") {
        videoPage.style.display = "block";
        backButton.style.display = "block";
    }
}

gameButton.onclick = () => {
    setPage("game");
};

storyButton.onclick = () => {
    setPage("story");

    ignoreNextClick = true;
    firstClick = true;
    storyIndex = 0;
    storyText.style.display = "none";
};

backButton.onclick = () => {
    setPage("main");
};

pulse = 0;
heartButton.onclick = () => {
    if (pulse > 5) setPage("main");
    if (pulse === 5) {
        triggerShatter(heartButton, "images/heart.png");

        document.getElementById('landingText').style.display = 'none';
        document.getElementById('passwordText').style.display = 'block';

        setTimeout(() => {
        const keypad = document.getElementById('passcodeContainer');
        keypad.style.display = "flex";
        // Force a reflow so the browser notices the display change before animating
        void keypad.offsetWidth; 
        keypad.classList.add('show');
    }, 1000);
    }
    else {
        pulse++;
        const newScale = (1 + (pulse * 0.17))**1.7;
        heartButton.style.setProperty('--heart-scale', newScale);
    }

}

toLanding.onclick = () => {
    setPage("landing");
}

landingReset.onclick = () => {
    pulse = 0;
    heartButton.style.visibility = "visible";
    heartButton.style.setProperty('--heart-scale', 1);

    document.getElementById('passwordText').style.display = 'none';
    document.getElementById('landingText').style.display = 'block';
    document.getElementById('passcodeContainer').style.display = "none";
    currentInput = ""; // Clear any typed numbers
    updateCircles();

    const keypad = document.getElementById('passcodeContainer');
    keypad.classList.remove('show');
    keypad.style.display = "none";

    
}

letterButton.onclick = () => {
    setPage("letter");
};

photoButton.onclick = () => {
    setPage("photos");
};

videoButton.onclick = () => {
    setPage("video");
};
loveLetterButton.onclick = () => {
    const fade = document.getElementById("whiteFade");

    // fade whole screen to white
    fade.style.opacity = "1";

    setTimeout(() => {
        setPage("loveletter"); // your existing system

        // let new page render under white
        requestAnimationFrame(() => {
            setTimeout(() => {
                fade.style.opacity = "0";
            }, 250);
        });

    }, 600);
};



const photos = document.querySelectorAll(".photo");

photos.forEach(photo => {
    const rotation = Math.random() * 10 - 5; // -5° to +5°
    const offset = Math.random() * 30 - 15;  // vertical shift

    photo.style.transform =
        `rotate(${rotation}deg) translateY(${offset}px)`;
});



//------------------
//landing pin code
let currentInput = "";
const correctPasscode = "0604";

function pressKey(key) {
    if (key === 'back') {
        currentInput = currentInput.slice(0, -1);
    } else if (currentInput.length < 4) {
        currentInput += key;
    }
    
    updateCircles();

    if (currentInput.length === 4) {
        if (currentInput === correctPasscode) {
            // Success: Collapse and switch
            const container = document.getElementById('passcodeContainer');
    container.classList.remove('show'); // Triggers the slide down/fade out

    setTimeout(() => {
        container.style.display = "none";
        setPage("main"); 
    }, 600); // Matches the CSS transition time
        } else {
            // Wrong code: Reset
            setTimeout(() => {
                currentInput = "";
                updateCircles();
            }, 300);
        }
    }
}

function updateCircles() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((dot, index) => {
        if (index < currentInput.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}





// ---------------------
// mock up game

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



// ----------------
// story time!!!
const story = [
    "Once upon a time,",
    "There was a monkey.",
    "She was certainly quite cute,",
    "Everybody knew it.",
    "Then one day, when exiting the bathroom,",
    "The mens room, no less,",
    "She encountered a man!",
    "Monkey, who wouldn't trust a MAN with his own feet,",
    "Walked right into him!",
    "Oh no, what a fright!",
    "She then looked up,",
    "And her jaw dropped.",
    "This was no man.",
    "This was sexyness galore.",
    "This was all her dreams come true.",
    "This was her deepest desires in human form.",
    "Think Michaelangelo's David.", 
    "Thor.",
    "Every greek god.",
    "World's sexiest man 2005-2026.",
    "Etc etc etc.",
    "And her jaw DROPPED.",
    "Hit that floor like Ice Spice throwing ass",
    "She stuttered out,",
    "'H-h-hey, what's up?'",
    "He looks down at her,",
    "Her cheeks flush.",
    "And he says,",
    "You're in the men's room."
];

let storyIndex = 0;
let firstClick = true;

const storyHeader = document.getElementById("welcomeHeader");
document.addEventListener("click", () => {
    // only execute if on story page
    if (currentPage != "story") return;
    // ignore navigation click
    if (ignoreNextClick) {
        storyHeader.style.display = "block";
        storyHeader.textContent = "Click for a little story :)";
        ignoreNextClick = false;

        return}
    
    // get rid of the header on first click
    if (firstClick) {
        storyHeader.style.display = "none";
        firstClick = false;
    }
    
    storyText.textContent = story[storyIndex];
    storyText.style.display = "block";
    storyIndex++;
    
    if (storyIndex >= story.length) storyIndex = 0;
});



