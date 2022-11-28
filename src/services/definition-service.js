import { DEFINITION_API } from '../config/url.js';
import { StringUtils } from '../helpers/string.js';
import { HttpService } from './http-service.js';

export class DefinitionService {
    constructor() {
        this._httpClient = new HttpService();
    }

    async Define(word) {
        const url = StringUtils.Format(DEFINITION_API, word);
        let definitionJson = await this._httpClient.Fetch(url);
        if (!definitionJson?.length) {
            return "-";
        }

        let definition = definitionJson[0].meanings[0].definitions[0].definition;

        return definition;
    }
}