export type Guess = {
    letter: string,
    correct: 0 | 1 | 2,
}
export const compareWords = (guess: string, answer: string): Guess[] => {
    const letters: Guess[] = guess.split('').map((letter, index) => {
        if (letter === answer[index]) {
            return {
                letter,
                correct: 2
            }
        }
        if (!answer.includes(letter)) {
            return {
                letter,
                correct: 0,
            }
        }

        return {letter, correct: 1}
    });
    return letters;
}
