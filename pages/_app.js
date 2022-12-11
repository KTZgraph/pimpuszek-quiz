// fdgfdg
import "../styles/globals.css";
import { UserEmailProvider } from "../context/UserEmailContext";
import { StoreProvider } from "../context";

// BUG - TUTAJ StoreProvider ani  UserEmailProvider NIE zadziała - trzeba opakować C:\Users\human\Desktop\pimpuszek-quiz\app\providers.js

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
