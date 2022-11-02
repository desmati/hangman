class HangmanUI {
    constructor() {
        this.guess__invalid = document.querySelector("#guess__invalid");
        this.guess__lives = document.querySelector("#guess__lives");
        this.guess__tip = document.getElementById("guess__tip");
        this.guess__output = document.getElementById("guess__output");
    }

    NewGame(wordInfo, placeholder) {
        this.guess__tip.innerHTML = wordInfo.tip;
        this.guess__output.innerHTML = placeholder.join("");
    }

    UpdatePlaceholder(placeholder) {
        this.guess__output.innerHTML = placeholder.join("");
    }

    DrawHanger(num) {
        // Show hanger drawing
        let show = document.getElementById(`hangman__drawing--part${num}`);
        show.classList.remove('hidden');
    }

    InvalidGuess(userLetter, lives) {
        this.guess__invalid.innerHTML += userLetter;
        this.guess__lives.innerHTML = lives;
    }

    GameOver(win, wordToGuess) {
        if (!win) {
            alert(`The word was ${wordToGuess}`);
        }

        window.location.reload(true);
    }
}