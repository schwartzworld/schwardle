import { readLines } from "https://deno.land/std/io/buffer.ts";
import { permittedGuesses, words } from "./wordlist.ts";
import { compareWords, Guess } from "./compareWords.ts";
import { getUserGuesses, saveUserGuesses } from "./getUserGuesses.ts";
import { wordOfTheDay } from "./wordOfTheDay.ts";
import { printUserGuesses } from "./printUserGuesses.ts";

async function promptString(question: string): Promise<string> {
  console.log(question);
  let answer = "";
  for await (const line of readLines(Deno.stdin)) {
    return line;
  }
  return answer;
}

const main = async () => {
  const userGuesses: { guesses: Guess[][] } = await getUserGuesses();
  if (userGuesses.guesses.length >= 6) {
    console.log("Limit yourself to 6 guesses");
    return printUserGuesses(userGuesses.guesses);
  }

  if (userGuesses.guesses.some((g) => g.every((h) => h.c === 2))) {
    console.log("You have already won");
    return printUserGuesses(userGuesses.guesses);
  }
  printUserGuesses(userGuesses.guesses, true);

  const guess: string = await promptString("Please enter input");

  if (guess.length !== wordOfTheDay.length) {
    console.log(
      `Please guess a word that is ${wordOfTheDay.length} letters long`,
    );
    return;
  }
  if (!permittedGuesses.find((w) => w === guess)) {
    console.log(`${guess} is not a valid word`);
    return;
  }

  const parsedGuess: Guess[] = compareWords(guess, wordOfTheDay);
  printUserGuesses([parsedGuess]);
  const won = parsedGuess.every((g) => g.c === 2);
  if (won) console.log("You WON!");
  await saveUserGuesses(parsedGuess, won);
};
main();
