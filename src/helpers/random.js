export class RandomUtils {
    static RandomNumber(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    static PickRandom(array) {
        if (array) {
            let random = RandomUtils.RandomNumber(0, array.length - 1);
            return array[random];
        }

        return null;
    }
}