import "../styles/globals.css";
import { SettingsProvider } from "../data/settingsContext";

function MyApp({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  );
}

export default MyApp;
