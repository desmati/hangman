'use strict';
window.onload = async function () {
    var wordsProvider = new WordProvider();
    var wordInfo = await wordsProvider.GetWord();

    let game = new Hangman();
    let gameUI = new HangmanUI();
    game.NewGame(wordInfo, gameUI);

    let keyboardUI = new KeyboardUI();
    let keyboard = new Keyboard();
    keyboardUI.Draw('#keyboard', keyboard, game);

};
