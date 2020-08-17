import React, { useState } from "react";

const SettingsContext = React.createContext([{}, () => {}]);

const SettingsProvider = (props) => {
  const [state, setState] = useState({
    showVerseNum: true,
    showInfo: false,
  });
  return (
    <SettingsContext.Provider value={[state, setState]}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
