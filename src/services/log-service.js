import { GAME_CONFIG } from "../config/game.js";

export class LogService {
    static Log() {
        if (GAME_CONFIG.log) {
            console.log(...arguments);
        }
    }
}