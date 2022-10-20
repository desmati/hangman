'use strict';

window.onload = function () {

    class Hangman {
        words = [
            {
                tip: "I love them a lot",
                letters: ["D", "O", "G", "S"]
            },
            {
                tip: "Hard to find in Stockholm",
                letters: ["H", "O", "U", "S", "E"]
            },
            {
                tip: "I'm here but I'm not",
                letters: ["U", "N", "D", "E", "F", "I", "N", "E", "D"]
            }
        ]

        constructor() {
            //game state and initial values
            this.random = Math.floor(Math.random() * this.words.length);
            this.wordToGuess = this.words[this.random].letters;
            this.tip = this.words[this.random].tip;
            this.placeholder = Array(this.wordToGuess.length).fill("_");
            this.guessed = [];
            this.lives = 6;

            this.guess__invalid = document.querySelector("#guess__invalid");
            this.guess__lives = document.querySelector("#guess__lives");
            this.guess__button = document.getElementById("guess__button");
            this.guess__tip = document.getElementById("guess__tip");
            this.guess__output = document.getElementById("guess__output");
        }

        setupNewWord() {
            this.guess__tip.innerHTML = this.tip;
            this.guess__output.innerHTML = this.placeholder.join("");
            this.guess__button.onclick = this.handleClick.bind(this);
        }

        handleClick() {
            let userLetter = prompt("Guess a letter:");
            if (!userLetter || !/[a-zA-Z]/.test(userLetter)) {
                alert("Enter an valid letter. Just one!");
            }
            userLetter = userLetter.toUpperCase();

            if (
                this.wordToGuess.indexOf(userLetter) > -1 &&
                this.guessed.indexOf(userLetter) == -1
            ) {
                //check if letter is a match, and first guess
                this.checkGuess(this.wordToGuess, userLetter);
            } else if (
                this.wordToGuess.indexOf(userLetter) == -1 &&
                this.guessed.indexOf(userLetter) == -1
            ) {
                //check if not match, and first wrong
                this.guess__invalid.innerHTML += userLetter;
                this.lives--;
                this.hangerDraw(this.lives);
                this.guess__lives.innerHTML = this.lives;
                alert("Wrong guess!");
            } else {
                //if not first use of this letter
                alert("Already used " + userLetter);
            }

            this.guessed.indexOf(userLetter) == -1
                ? this.guessed.push(userLetter)
                : null; //for all guesses, if its the first time using the letter, save it

            if (Array.from(this.placeholder).indexOf("_") == -1) {
                //trigger game win or loose
                this.gameOver(true); //when no more '_' exist in placeholder, you win
            } else if (this.lives == 0) {
                //when lives are gone, you loose
                this.gameOver();
            }
        }

        checkGuess(wordToGuess, userLetter) {
            // replaces letters in placeholder when a match is found
            this.placeholder = this.placeholder.map((l, i) => {
                //check if letter exists in the guess word, and if yes, replace it in the placeholder and display it
                if (wordToGuess[i] == userLetter) {
                    return (l = userLetter);
                } else {
                    return l;
                }
            });

            this.guess__output.innerHTML = this.placeholder.join("");
        }

        gameOver(win) {
            // shows win/game over message
            alert(win
                ? "You win"
                : "Game over"
            );

            window.location.reload(true);
        }

        hangerDraw(num) {
            // show hanger drawing
            let show = document.getElementById(`hangman__drawing--part${num}`);
            show.classList.remove('hidden');
        }
    }

    let game = new Hangman();
    game.setupNewWord();
};
