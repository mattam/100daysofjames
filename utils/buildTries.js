const rawJSON = require("fs").readFileSync("dict/bibleBookNames.json");
const bookNames = JSON.parse(rawJSON).bookNames.sort();
let trie = {},
  end = {},
  keepEnd = {},
  endings = [0];

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

function optimize(cur) {
  var num = 0,
    last;

  for (var node in cur) {
    if (typeof cur[node] === "object") {
      var ret = optimize(cur[node]);

      if (ret) {
        delete cur[node];
        cur[node + ret.name] = ret.value;
        node = node + ret.name;
      }
    }

    last = node;
    num++;
  }

  if (num === 1) {
    return { name: last, value: cur[last] };
  }
}

function suffixes(cur, end) {
  var hasObject = false,
    key = "";

  for (var node in cur) {
    if (typeof cur[node] === "object") {
      hasObject = true;

      var ret = suffixes(cur[node], end);

      if (ret) {
        cur[node] = ret;
      }
    }

    key += "," + node;
  }

  if (!hasObject) {
    if (end[key]) {
      end[key].count++;
    } else {
      end[key] = { obj: cur, count: 1 };
    }

    return key;
  }
}

function finishSuffixes(cur, keepEnd, end) {
  for (var node in cur) {
    var val = cur[node];

    if (typeof val === "object") {
      finishSuffixes(val, keepEnd, end);
    } else if (typeof val === "string") {
      cur[node] = keepEnd[val] || end[val].obj;
    }
  }
}

// Optimize the structure
optimize(trie);
// Figure out common suffixes
suffixes(trie, end);
for (var key in end) {
  if (end[key].count > 10) {
    keepEnd[key] = endings.length;
    endings.push(end[key].obj);
  }
}
// And extract the suffixes
finishSuffixes(trie, keepEnd, end);
trie.$ = endings;

function findTrieWord(word, cur) {
  // Get the root to start from
  cur = cur || dict;

  // Go through every leaf
  for (var node in cur) {
    // If the start of the word matches the leaf
    if (word.indexOf(node) === 0) {
      // If it's a number
      var val =
        typeof cur[node] === "number" && cur[node]
          ? // Substitute in the removed suffix object
            dict.$[cur[node]]
          : // Otherwise use the current value
            cur[node];

      // If this leaf finishes the word
      if (node.length === word.length) {
        // Return 'true' only if we've reached a final leaf
        return val === 0 || val.$ === 0;

        // Otherwise continue traversing deeper
        // down the tree until we find a match
      } else {
        return findTrieWord(word.slice(node.length), val);
      }
    }
  }

  return false;
}

console.log("trie: ", trie);

end = trie.$;
let words = [];
let index = 0;

function findAllTrieWords(search, word, cur) {
  console.log("--------------");
  console.log("word: ", word);
  console.log("search ", search);

  for (var node in cur) {
    var val = cur[node];
    if (search.length && node[0] === search[0] && val === 0) {
      console.log("merging: ", word, "+ ", node);
      words.push(word + node);
    } else if (!search.length && val === 0) {
      words.push(word + node);
    } else if (search.length === 0) {
      findAllTrieWords("", word + node, val);
    } else if (node === search[0]) {
      console.log("node", node);
      searchStr = search.substring(1);

      findAllTrieWords(searchStr, word + node, val);
    }
  }
}
findAllTrieWords("R", "", trie);
console.log("find: ", words);
