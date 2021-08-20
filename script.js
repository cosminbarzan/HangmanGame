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
    console.log('GUESS CONTAINER', container);
    for (var i = 0; i < word.length; i++) {
        const guess = document.createElement('div');
        guess.classList.add('guess');

        guess.innerText = '';

        container.appendChild(guess);
    }
}

function addHeartsForLives(lives) {
    const heartsContainer = document.querySelector('.hearts');

    let heartsElements = ``;

    for (let i = 0; i < lives; i++) {
        heartsElements += `<li><a href="#"><i class="fa fa-heart"></i></a></li>`;
    }

    heartsContainer.innerHTML = heartsElements;
}



function createHeartsStatusArray(lives) {
    let heartsStatus = new Array(lives).fill(1);

    return heartsStatus;
}

const startButton = document.getElementById('start');

const container = document.getElementById("container");
console.log(container);

let scoreContainer = document.querySelector('.score');

let word = '';
let remainingLetters = 0;
let mistakes = 0;
let round = 1;
let category = '';
let heartsStatus = '';
let answerLetters = '';
let score = 0;

function startGame() {
    if (round === 1) {
        minutes = 0;
        seconds = 0;
        let time = '';
        document.querySelector('.score-container').classList.remove('hide');
        const timer = document.querySelector('.timer');
        setInterval(() => {
            if (seconds === 59) {
                seconds = -1;
                minutes++;
            }
            seconds++;
            if (minutes === 0) {
                time = seconds + 's';
            }
            else {
                time = minutes + 'm ' + seconds + 's';
            }
            timer.innerText = time;
        }, 1000);


        const gameOptionsDiv = document.getElementById('game-options');

        gameOptionsDiv.style.display = 'none';

        category = document.getElementById('categories').value;
        const level = document.getElementById('level').value;
        lives = livesPerLevel[level];

        addHeartsForLives(lives);

        const hangmanPicture = document.querySelector('.picture');

        hangmanPicture.classList.remove('hide-picture');

        hangmanPicture.src = './images/hangman0.png';

        heartsStatus = createHeartsStatusArray(lives);
        console.log('status', heartsStatus);
    }

    //updateLivesNumber(lives, heartsStatus);

    word = generateWord(category);

    remainingLetters = word.length;

    answerLetters = new Array(word.length).fill('');


    // document.onkeydown = keyPressed;

    document.addEventListener('keydown', event => {
        keyPressed(event, answerLetters, heartsStatus);
    });

    generateSpacesForLetters(word);

    const guesses = document.querySelectorAll(".guess");
    console.log(guesses);

    addClickEventOnLetter(guesses, answerLetters, heartsStatus);
}

/////
console.log(word);






function checkSelectedLetter(lives, guessLetter, answerLetters) {
    let matches = 0;
    console.log('rem lett', remainingLetters);
    console.log('WORD CHECK ', answerLetters);

    if (remainingLetters > 0 && lives > 0) {
        for (var j = 0; j < word.length; j++) {
            if (word[j] === guessLetter && guessLetter != answerLetters[j]) {
                answerLetters[j] = guessLetter;
                remainingLetters--;
                score += 10;
                scoreContainer.innerText = score;
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
        var audio = new Audio('https://notification-sounds.com/soundsfiles/Correct-answer.mp3');
        audio.play();
    }
}

const letterCodes = {
    65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h',
    73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x',
    89: 'y', 90: 'z'
}

let isSelected = {
    'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0,
    'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0,
    'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0,
    'y': 0, 'z': 0
}

function startNewRound() {
    mistakes = 0;
    remainingLetters = 0;

    container.innerHTML = '';

    const allLetters = document.querySelectorAll('#letter');

    allLetters.forEach((letter) => {
        letter.classList.remove('active');
    })

    isSelected = {
        'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0,
        'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0,
        'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0,
        'y': 0, 'z': 0
    }

    setTimeout(updateHangmanPicture(), 1000);

    startGame();
}

function keyPressed(key, answerLetters, heartsStatus) {
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

        if (matches === 0) {
            mistakes++;
            score -= 10;
            scoreContainer.innerText = score;
        }

        const guesses = document.querySelectorAll(".guess");

        updateAnswerWord(guesses, answerLetters);


        if (mistakes === 6) {
            for (let i = 0; i < heartsStatus.length; i++) {
                if (heartsStatus[i] == 1) {
                    heartsStatus[i] = 0;
                    break;
                }
            }

            lives--;
        }
        // lives--;
        // lives += matches;

        updateLivesNumber(lives, heartsStatus);

        checkEndGame(lives);
    }
}

function updateHangmanPicture() {
    document.querySelector('.picture').src = './images/hangman' + mistakes + '.png';
}

function updateLivesNumber(lives, heartsStatus) {
    if (lives >= 0) {
        // const livesText = document.getElementById('lives');
        // livesText.innerText = 'You have ' + lives + ' lives';

        updateHangmanPicture();

        if (mistakes === 6) {
            let hearts = document.querySelectorAll('.fa-heart');
            console.log('hearts', hearts);

            console.log('heeeeeeeere', heartsStatus);

            for (let i = 0; i < heartsStatus.length; i++) {
                if (heartsStatus[i] == 0) {
                    hearts[i].classList.add('inactive');
                }
            }

            round++;

            setTimeout(() => {
                startNewRound()
            }, 1500);
        }
    }
}

function checkEndGame(lives) {
    console.log('lives end ', lives);
    console.log('rem lett end ', remainingLetters);

    let footer = document.querySelector('footer');
    const playAgainBtn = document.createElement('button');
    playAgainBtn.innerText = 'Play Again';
    playAgainBtn.addEventListener('click', () => {
        window.location.reload();
    })

    if (lives === 0) {
        footer.appendChild(playAgainBtn);
    }

    if (mistakes === 6) {
        const gameStatusText = document.getElementById('game-status');
        gameStatusText.style.display = 'block';
        gameStatusText.innerText = 'The answer was: ' + word;
        gameStatusText.style.color = 'red';

        console.log('FOOTER', footer);
        console.log('AGAIN', playAgainBtn);
    }
    else {
        if (remainingLetters == 0) {
            score += 100;
            scoreContainer.innerText = score;

            const gameStatusText = document.getElementById('game-status');
            gameStatusText.style.display = 'block';
            gameStatusText.innerText = 'You win!';
            gameStatusText.style.color = 'green';

            footer.appendChild(playAgainBtn);
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

function addClickEventOnLetter(guesses, answerLetters, heartsStatus) {
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

            updateLivesNumber(lives, heartsStatus);

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