import { LogService } from "../services/log-service.js";
import { StorageService } from "../services/storage-service.js";
import { HangmanUI } from "./hangman-ui.js";

export class Hangman {
    constructor() {
        this._hangmanUI = new HangmanUI();
        this._storageService = new StorageService();
    }

    async NewGame() {
        this._storageService.Clear();
        LogService.Log('Hangman', this);
    }

    async NewGuess(letter) {
        if (!letter) {
            return;
        }
        letter = letter.toUpperCase();

        let wordInfo = await this._storageService.WordInfo;
        var result = wordInfo.word.toUpperCase().indexOf(letter) >= 0;

        let lives = await this._storageService.Lives;
        console.log(lives)
        if (!result) {
            lives--;
            this._storageService.Lives = lives;

            await this._hangmanUI.DrawHanger(lives);
            await this._hangmanUI.InvalidGuess(letter, lives);
        }

        await this.UpdatePlaceholder(letter);

        let guessed = await this._storageService.Gussed;
        if (guessed.indexOf(letter) == -1) {
            guessed.push(letter);
            this._storageService.Gussed = guessed;
        }

        let placeholder = await this._storageService.Placeholder;
        if (Array.from(placeholder).indexOf("_") == -1) {
            //trigger game win or loose
            await this.GameOver(true); //when no more '_' exist in placeholder, you win
        } else if (lives == 0) {
            //when lives are gone, you loose
            await this.GameOver();
        }

        return result;
    }

    async UpdatePlaceholder(letter) {
        let placeholder = await this._storageService.Placeholder;
        let wordInfo = await this._storageService.WordInfo;

        // replaces letters in placeholder when a match is found
        placeholder = placeholder.map((l, i) => {
            //check if letter exists in the guess word, and if yes, replace it in the placeholder and display it
            if (wordInfo.word[i].toUpperCase() == letter.toUpperCase()) {
                return (l = letter);
            } else {
                return l;
            }
        });

        this._storageService.Placeholder = placeholder;

        await this._hangmanUI.UpdatePlaceholder();
    }

    async GameOver(win) {
        // shows win/game over message
        // alert(win
        //     ? "You win"
        //     : "Game over"
        // );

        await this._hangmanUI.GameOver(win);
    }
}