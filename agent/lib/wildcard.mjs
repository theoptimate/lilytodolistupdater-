/* The random variable.

   Recombination without a constraint reliably produces the same three ideas —
   marketplace, newsletter, AI wrapper. A drawn constraint is what makes the
   combination step do work: it removes the default answer before the answer is
   written. Draws are seeded, so a run is reproducible and a bad card is traceable
   back to the deck rather than blamed on the model. */

import { readFile } from "node:fs/promises";
import { rng, sample } from "./rng.mjs";

export async function loadDecks(path) {
  const { decks } = JSON.parse(await readFile(path, "utf8"));
  return decks;
}

export function draw(decks, { seed, deckNames, collisionsFrom = [], collisionSize = 2 }) {
  const next = rng(seed);
  const names = (deckNames && deckNames.length ? deckNames : Object.keys(decks))
    .filter((n) => decks[n]?.length);

  const cards = names.map((name) => ({ deck: name, card: sample(next, decks[name], 1)[0] }));

  /* The other half of the randomness: which two opportunities get put in a room
     together. Adjacent ranks would just pair the two best; a seeded draw from the
     shortlist is what produces a pairing nobody would have chosen. */
  const collision = sample(next, collisionsFrom, Math.min(collisionSize, collisionsFrom.length));

  return { seed, cards, collision, dial: Number(next().toFixed(3)) };
}
