import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Launcher(props) {
  const [text, setText] = useState("");

  function onKeyDown(event) {
    if (event.key === "Escape") {
      // We need to capture the Escape key here because the useHotkeys cannot also target the text field.
      props.hideMenu();
    }
  }

  function onChange(event) {
    setText(event.target.value);
  }

  return (
    <div className={styles.launcher}>
      <input autoFocus type="text" onChange={onChange} onKeyDown={onKeyDown} />
      <h3>{text}</h3>
    </div>
  );
}
