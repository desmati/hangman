import { GameService } from "../services/game-service.js";
import { LogService } from "../services/log-service.js";
import { StorageService } from "../services/storage-service.js";
import { Dialog } from "./dialog.js";

export class HangmanUI {
    constructor() {
        this._storageService = new StorageService();

        this.guess__invalid = document.querySelector("#guess__invalid");
        this.guess__lives = document.querySelector("#guess__lives");
        this.guess__tip = document.getElementById("guess__tip");
        this.guess__output = document.getElementById("guess__output");
    }

    async NewGame() {
        this.guess__tip.innerHTML = (await this._storageService.WordInfo).tip;
        await this.UpdatePlaceholder();

        this.guess__invalid.innerHTML = await this._storageService.InvalidGuesses;
        this.guess__lives.innerHTML = await this._storageService.Lives;

        LogService.Log('HangmanUI', this);
    }

    async UpdatePlaceholder() {
        let placeholder = await this._storageService.Placeholder;
        this.guess__output.innerHTML = placeholder.join("");
    }

    async DrawHanger(num) {
        // Show hanger drawing
        let show = document.getElementById(`hangman__drawing--part${num}`);
        show.classList.remove('hidden');
    }

    async InvalidGuess(userLetter, lives) {
        let invalidGuesses = await this._storageService.InvalidGuesses;
        invalidGuesses += userLetter;
        this._storageService.InvalidGuesses = invalidGuesses;

        this.guess__invalid.innerHTML = invalidGuesses;
        this.guess__lives.innerHTML = lives;
    }

    async GameOver(win) {
        let dialog = new Dialog();
        let wordToGuess = (await this._storageService.WordInfo).word;
        dialog.Display(`
                <h2>You ${win ? "Won" : "Lost"}!</h2>
                <br/>
                <h3>The word was "${wordToGuess}"</h3>
                <br/>
                <br/>
                <button id="new-game">Start new game</button>
                `);

        let newGameElement = document.getElementById('new-game');
        newGameElement.addEventListener('click', async function () {
            let gameService = new GameService();
            await gameService.StartGame();
            dialog.Close();
        });
    }
}