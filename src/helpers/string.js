export class StringUtils {
    static Format() {
        var argsArray = new Array(...arguments);
        let args = argsArray.slice(1);
        let str = argsArray[0];
        return str.replace(/{([0-9]+)}/g, function (match, index) {
            return typeof args[index] == 'undefined' ? match : args[index];
        });
    }
}