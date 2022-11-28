import { Hangman } from "../modules/hangman.js";
import { HangmanUI } from "../modules/hangman-ui.js";
import { KeyboardUI } from "../modules/keyboard-ui.js";
import { GAME_CONFIG } from "../config/game.js";

export class GameService {
    async StartGame() {
        let game = new Hangman();
        await game.NewGame();

        let hangmanUI = new HangmanUI();
        await hangmanUI.NewGame();

        let keyboardUI = new KeyboardUI();
        await keyboardUI.Draw(GAME_CONFIG.keyboardContainer);

    }
}