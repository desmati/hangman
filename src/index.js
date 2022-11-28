'use strict';

import { GameService } from "./services/game-service.js";

window.onload = async function () {
    let gameService = new GameService();
    await gameService.StartGame();
};
