import { LogService } from "../services/log-service.js";
import { StorageService } from "../services/storage-service.js";
import { Hangman } from "./hangman.js";

export class Keyboard {
    constructor() {
        this._hangman = new Hangman();
        this._storageService = new StorageService();
    }

    async Clicked(letter) {
        var result = await this._hangman.NewGuess(letter);

        let letters = await this._storageService.Letters;
        letters[letter].checked == true;
        letters[letter].wrong == !result;
        this._storageService.Letters = letters;

        return result;
    }
}