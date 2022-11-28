export class HttpService {
    async Fetch(url) {
        let response = await fetch(url);
        let json = await response.json();
        return json;
    }
}