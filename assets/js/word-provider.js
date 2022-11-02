class WordProvider {
    constructor() {
        this.wordsList = words;
    }

    async GetWord() {
        // if (this.wordsList.length == 0) {
        //     let wordsReponse = await fetch('./assets/data/words.json', { method: 'GET' });
        //     this.wordsList = await wordsReponse.json();
        // }
        let random = Math.floor(Math.random() * this.wordsList.length);
        let word = this.wordsList[random];

        let definitionReponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        let definitionJson = await definitionReponse.json();
        let definition = definitionJson[0].meanings[0].definitions[0].definition;

        return {
            word: word,
            tip: definition
        };


    }
}