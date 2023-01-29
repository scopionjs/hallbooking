import "../styles/globals.scss";
import User_context from "../contexts/user";
function MyApp({ Component, pageProps }) {
  return (
  <User_context >
    <Component {...pageProps} />
  </User_context>
  )
}

export default MyApp;
