class KeyboardUI {
    constructor() {

    }

    Draw(containerId, keyboard, hangman) {
        if (containerId.indexOf('#') == 0) {
            containerId = containerId.substring(1);
        }

        let letters = keyboard.letters;
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

            $key.addEventListener('click', function (el) {
                let clicked = $key.getAttribute('data-clicked') === "true";
                if (clicked) {
                    return;
                }
                var result = keyboard.Clicked($key.innerHTML, hangman);
                $key.classList.add(result ? 'key-clicked' : 'key-wrong');
            });

            container.appendChild($key);
        }
    }
}