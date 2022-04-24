export type Guess = {
    l: string,
    c: 0 | 1 | 2,
}
export const compareWords = (guess: string, answer: string): Guess[] => {
    return guess.split('').map((letter, index) => {
        if (letter === answer[index]) {
            return {
                l: letter,
                c: 2
            }
        }
        if (!answer.includes(letter)) {
            return {
                l: letter,
                c: 0,
            }
        }

        return {l: letter, c: 1}
    });
}
