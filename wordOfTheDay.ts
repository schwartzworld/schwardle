import { seededNumbers } from "https://deno.land/x/seeded_numbers/mod.ts";
import { words } from "./wordlist.ts";

const today = new Date();

const seeded: Generator<number> = seededNumbers(
  Math.round(today.getFullYear() * today.getDate() / today.getMonth()),
);

export const gameId = seeded.next().value % words.length + 1;
export const wordOfTheDay = words[gameId];
