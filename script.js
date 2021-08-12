var categories = {
    'animals': [
        "wolf",
        "scorpion",
        "bear",
        "elephant",
        "dolphin",
        "tortoise",
        "cat",
        "dog",
        "mouse"
    ],
    'jobs': [
        "policeman",
        "mechanic",
        "dancer",
        "firefighter",
        "teacher",
        "electrician",
        "doctor",
        "artist"
    ],
    'sports': [
        "socer",
        "cycling",
        "baseball",
        "surfing",
        "swimming",
        "golf",
        "running",
        "tennis"
    ]
}

var livesPerLevel = {
    'easy': 10,
    'medium': 8,
    'hard': 6
}


var lives = 10;

var guessLetter = 'a';

/////
function generateWord(category) {
    console.log(categories[category]);
    let word = categories[category][Math.floor(Math.random() * categories[category].length)];

    return word;
}

function generateSpacesForLetters(word) {
    for (var i = 0; i < word.length; i++) {
        const guess = document.createElement('div');
        guess.classList.add('guess');

        guess.innerText = '';

        container.appendChild(guess);
    }
}

const startButton = document.getElementById('start');

const container = document.getElementById("container");
console.log(container);

let word = '';
let remainingLetters = 0;

function startGame() {
    const gameOptionsDiv = document.getElementById('game-options');

    gameOptionsDiv.style.display = 'none';

    const category = document.getElementById('categories').value;
    const level = document.getElementById('level').value;
    lives = livesPerLevel[level];

    updateLivesNumber(lives);

    word = generateWord(category);

    remainingLetters = word.length;

    var answerLetters = new Array(word.length);

    for (var i = 0; i < word.length; i++) {
        answerLetters[i] = '';
    }

    // document.onkeydown = keyPressed;

    document.addEventListener('keydown', event => {
        keyPressed(event, answerLetters);
    });

    generateSpacesForLetters(word);

    const guesses = document.querySelectorAll(".guess");
    console.log(guesses);

    addClickEventOnLetter(guesses, answerLetters);
}

/////
console.log(word);






function checkSelectedLetter(lives, guessLetter, answerLetters) {
    var matches = 0;
    console.log('rem lett', remainingLetters);
    console.log('WORD CHECK ', answerLetters);

    if (remainingLetters > 0 && lives > 0) {
        for (var j = 0; j < word.length; j++) {
            if (word[j] === guessLetter && guessLetter != answerLetters[j]) {
                answerLetters[j] = guessLetter;
                remainingLetters--;
                matches = 1;
                console.log("playing...", remainingLetters);
            }
        }
    }

    return matches;
}

function updateAnswerWord(guesses, answerLetters) {
    let matchPosition = -1;
    for (var k = 0; k < answerLetters.length; k++) {
        console.log(answerLetters.length);
        if (guesses[k].innerText != answerLetters[k]) {
            matchPosition = k;
        }
        guesses[k].innerText = answerLetters[k];
    }

    if (matchPosition != -1) {
        guesses[matchPosition].classList.add('bounce');
    }
}

const letterCodes = {
    65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h',
    73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x',
    89: 'y', 90: 'z'
}

const isSelected = {
    'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0,
    'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0,
    'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0,
    'y': 0, 'z': 0
}

function keyPressed(key, answerLetters) {
    // const gameStatusText = document.getElementById('game-status');
    // gameStatusText.style.display = 'block';

    const letter = letterCodes[key.keyCode];

    if (isSelected[letter] === 0) {
        isSelected[letter] = 1;

        currentLetter = document.querySelector('.' + letter);

        if (currentLetter != null) {
            currentLetter.classList.add('active');
        }

        let matches = checkSelectedLetter(lives, letter, answerLetters);

        const guesses = document.querySelectorAll(".guess");

        updateAnswerWord(guesses, answerLetters);

        lives--;
        lives += matches;

        updateLivesNumber(lives);

        checkEndGame(lives);
    }
}

function updateLivesNumber(lives) {
    if (lives >= 0) {
        const livesText = document.getElementById('lives');
        livesText.innerText = 'You have ' + lives + ' lives';
    }
}

function checkEndGame(lives) {
    console.log('lives end ', lives);
    console.log('rem lett end ', remainingLetters);

    if (lives == 0) {
        const gameStatusText = document.getElementById('game-status');
        gameStatusText.style.display = 'block';
        gameStatusText.innerText = 'Game over! Correct answer: ' + word;
        gameStatusText.style.color = 'red';
    }
    else {
        if (remainingLetters == 0) {
            const gameStatusText = document.getElementById('game-status');
            gameStatusText.style.display = 'block';
            gameStatusText.innerText = 'You win!';
            gameStatusText.style.color = 'green';
        }
    }
}

// window.onload = function () {




function generateAlphabetLetters() {
    var letters = [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
        'z', 'x', 'c', 'v', 'b', 'n', 'm'
    ];

    const buttons = document.getElementById('buttons');
    const firstLineDiv = document.getElementById('first-line');
    console.log(firstLineDiv);
    const secondLineDiv = document.getElementById('second-line');
    console.log(secondLineDiv);
    const thirdLineDiv = document.getElementById('third-line');
    console.log(thirdLineDiv);

    let currentDivLine = firstLineDiv;

    letters.forEach(letter => {
        const newLetter = document.createElement('div');

        newLetter.id = 'letter';
        newLetter.innerText = letter;
        newLetter.classList.add(letter);

        if (letter === 'a') {
            buttons.appendChild(currentDivLine);
            currentDivLine = secondLineDiv;
        }
        if (letter === 'z') {
            buttons.appendChild(currentDivLine);
            currentDivLine = thirdLineDiv;
        }

        currentDivLine.appendChild(newLetter);


        ////
    })
    buttons.appendChild(currentDivLine);
}

generateAlphabetLetters();
// }

function addClickEventOnLetter(guesses, answerLetters) {
    let letters = document.querySelectorAll('#letter');

    letters.forEach(letter => {
        letter.addEventListener('click', () => {
            letter.classList.add('active');
            isSelected[letter.innerText] = 1;

            guessLetter = letter.innerText;
            console.log(guessLetter);

            let matches = checkSelectedLetter(lives, guessLetter, answerLetters);

            updateAnswerWord(guesses, answerLetters);

            lives--;
            lives += matches;

            updateLivesNumber(lives);

            checkEndGame(lives);

            console.log("lives", lives);
        })
    })
}



// let letters = document.querySelectorAll('#letter');
// console.log(letters);

console.log(word);




// while(remainingLetters > 0) {
//     for(var j=0; j<word.length; j++) {
//         if(word[j] === guessLetter) {
//             answerLetters[j] = guessLetter;
//             remainingLetters--;
//             console.log("playing...")
//         }
//     }
// }