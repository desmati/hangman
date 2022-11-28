import { GAME_CONFIG } from "../config/game.js";
import { STORAGE_GUSSED, STORAGE_INVALID_GUSSES, STORAGE_LETTERS, STORAGE_LIVES, STORAGE_PLACEHOLDER, STORAGE_WORD_INFO } from "../config/storage.js";
import { WordProviderService } from "./word-provider-service.js";

export class StorageService {
    constructor() {
        this._storage = GAME_CONFIG.storage;
        this._wordProviderService = new WordProviderService();
    }

    get InvalidGuesses() {
        return (async () => { return await this.Get(STORAGE_INVALID_GUSSES, async () => { return []; }); })();
    }

    set InvalidGuesses(value) {
        (async () => { await this.Set(STORAGE_INVALID_GUSSES, value); })();
    }

    get Placeholder() {
        return (async () => {
            return await this.Get(STORAGE_PLACEHOLDER, async function () {
                let wordInfo = await this.WordInfo;
                let placeholder = new Array(wordInfo.word.length).fill("_");
                return placeholder;
            }.bind(this));
        })();
    }

    set Placeholder(value) {
        (async () => { await this.Set(STORAGE_PLACEHOLDER, value); })();
    }

    get Lives() {
        return (async () => { return await this.Get(STORAGE_LIVES, async () => { return GAME_CONFIG.maximumLives; }); })();
    }

    set Lives(value) {
        (async () => { await this.Set(STORAGE_LIVES, value); })();
    }

    get Gussed() {
        return (async () => { return await this.Get(STORAGE_GUSSED, async () => { return []; }); })();
    }

    set Gussed(value) {
        (async () => { await this.Set(STORAGE_GUSSED, value); })();
    }

    get WordInfo() {
        return (async () => {
            return await this.Get(STORAGE_WORD_INFO, async function () {
                let wordInfo = await this._wordProviderService.GetWord();
                this.Set(STORAGE_WORD_INFO, wordInfo);
                return wordInfo;
            }.bind(this));
        })();
    }

    set WordInfo(value) {
        (async () => { await this.Set(STORAGE_WORD_INFO, value); })();
    }

    get Letters() {
        return (async () => {
            return await this.Get(STORAGE_LETTERS, async () => {
                let letters = {};
                for (let i = 65; i <= 90; i++) {
                    var letter = String.fromCharCode(i)
                    let data = {
                        letter: letter,
                        checked: false,
                        wrong: false
                    };
                    letters[letter] = data;
                }

                return letters;
            });
        })();
    }

    set Letters(value) {
        (async () => { await this.Set(STORAGE_LETTERS, value); })();
    }

    async Get(id, callback) {
        let str = this._storage.getItem(id);

        if (str) {
            return JSON.parse(str);
        }

        if (callback) {
            let data = await callback();
            this.Set(id, data);
            return data;
        }

        return null;
    }

    Set(id, data) {
        let json = JSON.stringify(data);
        this._storage.setItem(id, json);
    }

    Remove(id) {
        this._storage.removeItem(id);
    }

    Clear() {
        this._storage.clear();
    }
}