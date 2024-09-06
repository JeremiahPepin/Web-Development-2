const gameResult = document.getElementById("gameResult");
const colorCounter = document.getElementById("colorCounter");
const attemptsElement = document.getElementById("attempts");
const tokens = document.querySelectorAll(".token");
const tokensText = document.querySelectorAll(".tokenText");
const guessTokens = document.querySelectorAll(".guessToken");
const checkBTN = document.getElementById("checkBTN");
const resetBTN = document.getElementById("resetBTN");
let gameReset = false;
let colorCheckHandle = "";

function colorMatchGame() {
    const colorArray = ["blue", "red", "yellow"];
    let randomColors = [];
    let guessColors = ["blue", "blue", "blue"];

    function randomColorGenerator() {
        for (let i = 0; i < 3; i++){
            const randomNum = Math.floor(Math.random() * 3);
            const randomColor = colorArray[randomNum];

            randomColors[i] = randomColor;
        }

        console.log("Random colors: " + randomColors);

        userGuesses();
    }

    function userGuesses() {
        guessTokens.forEach((guessToken) => {
            let i = 0;
            
            function tokenClickHandle() {
                const tokenPosition = guessToken.getAttribute("name");

                console.log("Click token position: " + tokenPosition);

                i = (i + 1) % colorArray.length;
                guessToken.style.backgroundColor = colorArray[i];
                guessColors[tokenPosition] = colorArray[i];
            }

            guessToken.addEventListener("click", tokenClickHandle);
            guessToken.tokenClickHandle = tokenClickHandle;
        });
    }

    let attempts = 5;
    let tokenIndex = 0;
    let gameEnded = false;

    colorCheckHandle = () => {
        let colorIndex = 0;
        let correctCount = 0;

        guessColors.forEach((color) => {
            if (color === randomColors[colorIndex]){
                correctCount++;
                console.log("Correct guess " + (colorIndex + 1) + ": " + color);
            }
            colorIndex++;
        });

        console.log("Correct colors: " + correctCount);

        if (correctCount === 3){
            colorCounter.innerHTML = "Correct colors: 3"
            gameResult.innerHTML = "You Won!";
            gameEnded = true;
        }else {
            colorCounter.innerHTML = "Correct colors: " + correctCount;
        }

        attempts--;
        attemptsElement.innerHTML = "Attempts left: " + attempts;

        if (attempts <= 0 && correctCount < 3) {
            gameResult.innerHTML = "You Lost.";
            gameEnded = true;
        }

        if (gameEnded === true){
            console.log("gameEnded");
            checkBTN.removeEventListener("click", colorCheckHandle);
            
            guessTokens.forEach((guessToken) => {
                guessToken.removeEventListener("click", guessToken.tokenClickHandle);
            });
            
            tokens.forEach ((token) => {
                token.style.backgroundColor = randomColors[tokenIndex];
                tokenIndex++;
            });

            tokensText.forEach ((tokenText) => {
                tokenText.innerHTML = "";
            });
        }else {
            console.log("Game hasn't been ended.");
        }
    };

    checkBTN.addEventListener("click", colorCheckHandle);

    randomColorGenerator();
}

colorMatchGame();

function resetGame(){
    console.log("Game has been reset.");
    gameResult.innerHTML = "";
    colorCounter.innerHTML = "Correct colors: 0";
    attemptsElement.innerHTML = "Attempts left: 5";

    tokens.forEach((token) => {
        token.style.backgroundColor = "black";
    });

    tokensText.forEach((tokenText) => {
        tokenText.innerHTML = "?";
    });

    guessTokens.forEach((guessToken) => {
        guessToken.style.backgroundColor = "blue";
        guessToken.removeEventListener("click", guessToken.tokenClickHandle);
    });

    checkBTN.removeEventListener("click", colorCheckHandle);

    colorMatchGame();

    gameReset = true;
}

resetBTN.addEventListener("click", resetGame);