import { STORAGE_KEYBOARD_DRAWN } from "../config/storage.js";
import { StorageService } from "../services/storage-service.js";
import { Keyboard } from "./keyboard.js";

export class KeyboardUI {
    constructor() {
        this._keyboard = new Keyboard();
        this._storageService = new StorageService();
    }

    async Draw(containerId) {
        this.drawn = await this._storageService.Get(STORAGE_KEYBOARD_DRAWN, async () => { return false; });

        if (this.drawn) {
            return;
        }

        if (containerId.indexOf('#') == 0) {
            containerId = containerId.substring(1);
        }

        let letters = await this._storageService.Letters;

        let container = document.getElementById(containerId);
        container.innerHTML = '';

        for (let key in letters) {
            let letter = letters[key];
            let $key = document.createElement('div');
            $key.classList.add('key');
            $key.innerHTML = letter.letter;

            if (letter.checked) {
                $key.classList.add('key-clicked');
            }
            if (letter.wrong) {
                $key.classList.add('key-wrong')
            }

            $key.addEventListener('click', async function (el) {
                let clicked = $key.getAttribute('data-clicked') === "true";
                if (clicked) {
                    return;
                }
                var result = await this._keyboard.Clicked($key.innerHTML);
                $key.classList.add(result ? 'key-clicked' : 'key-wrong');
            }.bind(this));

            container.appendChild($key);
        }

        this.drawn = true;
        this._storageService.Set(STORAGE_KEYBOARD_DRAWN, this.drawn);
    }
}