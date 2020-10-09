const rawJSON = require("fs").readFileSync("dict/bibleBookNames.json");
const bookNames = JSON.parse(rawJSON).bookNames;
let trie = {},
  end = {},
  keepEnd = {},
  endings = [0];
console.log("length: ", bookNames.length);

// Build a simple Trie structure
for (let i = 0, l = bookNames.length; i < l; i++) {
  let word = bookNames[i];
  let letters = word.split("");
  let cur = trie;

  for (let j = 0; j < letters.length; j++) {
    let letter = letters[j];
    let pos = cur[letter];

    if (pos == null) {
      cur = cur[letter] = j === letters.length - 1 ? 0 : {};
    } else if (pos === 0) {
      cur = cur[letter] = { $: 0 };
    } else {
      cur = cur[letter];
    }
  }
}

console.log("trie: ", trie);
