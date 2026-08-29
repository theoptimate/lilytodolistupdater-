/* Seeded randomness. The whole point of the wildcard is that it is arbitrary; the
   whole point of a seed is that an arbitrary run can be replayed and argued with.
   `node run.mjs --seed 2026-08-29` gives the same draw every time. */

export function hashSeed(seed = "") {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(seed).length; i++) {
    h ^= String(seed).charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

/* mulberry32 — small, fast, good enough for shuffling a deck of cards. */
export function rng(seed) {
  let a = hashSeed(seed);
  return function next() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const pick = (next, list) => list[Math.floor(next() * list.length)];

export function sample(next, list, n) {
  const pool = [...list];
  const out = [];
  while (pool.length && out.length < n) out.push(...pool.splice(Math.floor(next() * pool.length), 1));
  return out;
}
