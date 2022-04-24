import yargs from 'https://deno.land/x/yargs/deno.ts'
import { Arguments } from 'https://deno.land/x/yargs/deno-types.ts'
import { words } from "./wordlist.ts";
import {compareWords, Guess} from "./compareWords.ts";
import {getUserGuesses, saveUserGuesses} from "./getUserGuesses.ts";

const {guess}: { _: unknown[], guess: string, "$0": "deno run" } = yargs(Deno.args)
    .command('--guess <word>', 'guess a word', (yargs: any) => {

        return yargs.positional('guess', {
            describe: 'A word you guessed',
        })
    }, (argv: Arguments) => {
        console.info(argv)
    })
    .parse()

const wordOfTheDay = words[15];

if (guess.length !== wordOfTheDay.length) throw new Error(`Please guess a word that is ${wordOfTheDay.length} letters long`);
if (!words.find(w => w === guess)) throw new Error(`${guess} is not a valid word`);

const userGuesses: { guesses: Guess[][] } = await getUserGuesses();
if (userGuesses.guesses.length >= 6) throw new Error('Limit yourself to 6 guesses')
if (userGuesses.guesses.some(g => g.every(h => h.correct === 2))) {
    throw new Error('You have already won')
}

const parsedGuess: Guess[] = compareWords(guess, wordOfTheDay);


await saveUserGuesses(parsedGuess)
