const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast requires practice and accuracy.",
    "JavaScript makes web applications interactive.",
    "Keep your fingers on the home row keys.",
    "Coding challenges improve problem-solving skills."
];

let currentSentence = "";
let startTime = null;
let timerInterval;

const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart");

function startTest() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceElement.innerText = currentSentence;
    inputElement.value = "";
    resultElement.innerText = "";
    inputElement.disabled = false;
    inputElement.focus();
    startTime = null;
    clearInterval(timerInterval);
    timerElement.innerText = "Time: 0s";

    inputElement.addEventListener("input", startTimer);
}

function startTimer() {
    if (!startTime) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }
    
    if (inputElement.value === currentSentence) {
        endTest();
    }
}

function updateTimer() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    timerElement.innerText = `Time: ${elapsedTime}s`;
}

function endTest() {
    clearInterval(timerInterval);
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const wordsTyped = currentSentence.split(" ").length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60);
    const accuracy = calculateAccuracy();

    resultElement.innerText = `Speed: ${wpm} WPM | Accuracy: ${accuracy}%`;
    inputElement.disabled = true;
}

function calculateAccuracy() {
    const typedText = inputElement.value.split("");
    const originalText = currentSentence.split("");
    let correctChars = 0;

    typedText.forEach((char, index) => {
        if (char === originalText[index]) {
            correctChars++;
        }
    });

    return Math.round((correctChars / originalText.length) * 100);
}

restartButton.addEventListener("click", startTest);

startTest();
