// fdgfdg
import "../styles/globals.css";
import { UserEmailProvider } from "../context/UserEmailContext";

function MyApp({ Component, pageProps }) {
  return (
    // <UserEmailProvider>
    <Component {...pageProps} />
    // </UserEmailProvider>
  );
}

export default MyApp;
