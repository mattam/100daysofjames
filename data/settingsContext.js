import React, { useState } from "react";

import historical from "./historical.json";

const SettingsContext = React.createContext([{}, () => {}]);

const SettingsProvider = (props) => {
  const [state, setState] = useState({
    showVerseNum: true,
    showInfo: false,
    showHighlights: false,
    highlights: historical,
  });
  return (
    <SettingsContext.Provider value={[state, setState]}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
