import {Guess} from "./compareWords.ts";
import {red, yellow, green} from "https://deno.land/std@0.136.0/fmt/colors.ts";
export const printUserGuesses = (guesses: Guess[][], withAlphabet = false) => {
    guesses.forEach(guessArr => {
        const colored = guessArr.map(({l, c}) => {
            if (c === 2) return green(l)
            if (c === 1) return yellow(l)
            return red(l);
        })
        console.log(colored.join(''))
    })

    if (withAlphabet) {
        const flat = guesses.flat();
        const abcs = 'abcdefghiklmnopqrstuvwxyz'.split('').map(letter => {
            if (flat.find(f => (f.l === letter && f.c === 2))) return green(letter)
            if (flat.find(f => (f.l === letter && f.c === 1))) return yellow(letter)
            if (flat.find(f => (f.l === letter && f.c === 0))) return red(letter);
            return letter
        }).join('');
        console.log(abcs)
    }
}
