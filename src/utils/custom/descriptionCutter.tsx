export default function descriptionCutter(originalText?: string, countOfWords: number = 25) {
    const wordsInText = originalText?.split(" ");
    if (wordsInText) {
        const result = wordsInText.slice(0, countOfWords);

        if (wordsInText && result[result.length - 1] == ",") {
            return wordsInText.slice(0, countOfWords - 1).join(" ");
        }

        return result.join(" ");
    } else {
        return null;
    }
}
