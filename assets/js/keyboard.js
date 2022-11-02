class Keyboard {
    constructor() {
        this.Init();
        console.log(this.letters);
    }

    Init() {
        this.letters = {};
        for (let i = 65; i <= 90; i++) {
            var letter = String.fromCharCode(i)
            let data = {
                letter: letter,
                checked: false,
                wrong: false
            };
            this.letters[letter] = data;
        }
    }

    Clicked(letter, hangman) {
        var result = hangman.NewGuess(letter);

        this.letters[letter].checked == true;
        this.letters[letter].wrong == !result;
        return result;
    }
}