import username from "https://deno.land/x/username/mod.ts";
import dir from "https://deno.land/x/dir/mod.ts";
import {Guess} from "./compareWords.ts";
import {gameId} from "./wordOfTheDay.ts";

const homeDirectory = dir("home");

let json: Record<string, {currentGame: number, guesses: Guess[][], wins: {numberOfGuesses: number, gameId: number}[]}> = {};
let name: string = '';
const statsPath = homeDirectory + "/.wordleStats.json"
console.log({statsPath})

export const readOrCreate = async (path: string) => {
    name = await username() ?? '';
    const blank = {
        [name]: {
            guesses: [],
            wins: [],
            currentGame: gameId
        }
    };

    try {
        const str = await Deno.readTextFile(path);
        if (str.length === 0) throw new Error('oops');

        return JSON.parse(str)
    } catch (e) {
        await Deno.writeTextFile(path, JSON.stringify(blank))
        return blank;
    }
}


export const getUserGuesses = async () => {
    json = await readOrCreate(statsPath);
    if (json[name].currentGame !== gameId) {
        json[name].currentGame = gameId;
        json[name].guesses = [];
    }
    return json[name]
}

export const saveUserGuesses = async (guesses: Guess[], isWon = false) => {
    json[name].guesses.push(guesses);
    if (isWon) {
        json[name].wins.push({
            numberOfGuesses: json[name].guesses.length,
            gameId: gameId
        })
    }
    await Deno.writeTextFile(statsPath, JSON.stringify(json, null, 2))

}
