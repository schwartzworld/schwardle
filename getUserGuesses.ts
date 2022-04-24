import username from "https://deno.land/x/username/mod.ts";
import {Guess} from "./compareWords.ts";

let json: Record<string, {guesses: Guess[][]}> = {};
let name: string = '';
const statsPath = "./stats.json"

export const readOrCreate = async (path: string) => {
    name = await username() ?? '';
    const blank = {
        [name]: {
            guesses: []
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
    return json[name]
}

export const saveUserGuesses = async (guesses: Guess[]) => {
    json[name].guesses.push(guesses)
    await Deno.writeTextFile(statsPath, JSON.stringify(json, null, 2))

}
