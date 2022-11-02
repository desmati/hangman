class Hangman {
    constructor() {

    }

    NewGame(wordInfo, hangmanUI) {
        console.log(wordInfo);
        this.wordToGuess = wordInfo.word;
        this.tip = wordInfo.tip;

        this.guessed = [];
        this.lives = 6;
        this.wordInfo = wordInfo;
        this.placeholder = Array(this.wordToGuess.length).fill("_");

        this.hangmanUI = hangmanUI;
        this.hangmanUI.NewGame(wordInfo, this.placeholder);
    }

    NewGuess(letter) {
        if (!letter) {
            return;
        }
        letter = letter.toUpperCase();

        var result = this.wordToGuess.toUpperCase().indexOf(letter) >= 0;

        if (!result) {
            this.lives--;
            if (this.hangmanUI) {
                this.hangmanUI.DrawHanger(this.lives);
                this.hangmanUI.InvalidGuess(letter, this.lives);
            }
        }

        this.UpdatePlaceholder(this.wordToGuess, letter);

        this.guessed.indexOf(letter) == -1
            ? this.guessed.push(letter)
            : null; // For all guesses, if its the first time using the letter, save it

        if (Array.from(this.placeholder).indexOf("_") == -1) {
            //trigger game win or loose
            this.GameOver(true); //when no more '_' exist in placeholder, you win
        } else if (this.lives == 0) {
            //when lives are gone, you loose
            this.GameOver();
        }

        return result;
    }

    UpdatePlaceholder(wordToGuess, letter) {
        // replaces letters in placeholder when a match is found
        this.placeholder = this.placeholder.map((l, i) => {
            //check if letter exists in the guess word, and if yes, replace it in the placeholder and display it
            if (wordToGuess[i].toUpperCase() == letter.toUpperCase()) {
                return (l = letter);
            } else {
                return l;
            }
        });

        if (this.hangmanUI) {
            this.hangmanUI.UpdatePlaceholder(this.placeholder);
        }
    }

    GameOver(win) {
        // shows win/game over message
        alert(win
            ? "You win"
            : "Game over"
        );

        if (this.hangmanUI) {
            this.hangmanUI.GameOver(win, this.wordToGuess);
        }
    }
}