import { useState } from "react";
import styles from "../styles/Home.module.css";
import bibleNameTrie from "../utils/dict/bibleNameTrie.json";

export default function Launcher(props) {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(0);

  function onKeyDown(event) {
    if (event.key === "Escape") {
      // We need to capture the Escape key here because the useHotkeys cannot also target the text field.
      props.hideMenu();
    }
  }

  function findAllTrieWords(search, word, cur) {
    for (var node in cur) {
      var val = cur[node];
      var letter = node.toUpperCase();
      if (search.length && letter === search[0] && val === 0) {
        setResults((results) => [...results, word + node]);
      } else if (!search.length && val === 0) {
        setResults((results) => [...results, word + node]);
      } else if (search.length === 0) {
        findAllTrieWords("", word + node, val);
      } else if (letter === search[0]) {
        let searchStr = search.substring(1);
        findAllTrieWords(searchStr, word + node, val);
      }
    }
  }

  function onChange(event) {
    // Reset results
    setResults([]);
    // Use that string to find all occurances
    if (event.target.value.length) {
      findAllTrieWords(event.target.value.toUpperCase(), "", bibleNameTrie);
    }

    // Display that list
  }

  function handleClick(event, index) {
    setSelected(index);
  }

  function renderList() {
    return results.map((word, index) => (
      <h4
        className={index === selected && styles.selected}
        onClick={(event) => handleClick(event, index)}
        key={index}
      >
        {word}
      </h4>
    ));
  }

  return (
    <div className={styles.launcher}>
      <input autoFocus type="text" onChange={onChange} onKeyDown={onKeyDown} />
      {renderList()}
    </div>
  );
}
