import { WORDS } from '../config/words.js';
import { RandomUtils } from '../helpers/random.js';
import { DefinitionService } from './definition-service.js';

export class WordProviderService {
    constructor() {
        this._definitionService = new DefinitionService();
    }

    async GetWord() {
        let word = RandomUtils.PickRandom(WORDS);
        let definition = await this._definitionService.Define(word);

        let result = {
            word: word,
            tip: definition
        };

        return result;

    }
}