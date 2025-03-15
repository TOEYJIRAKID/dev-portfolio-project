import "@/styles/globals.css";
import Headers from "@/components/Header";


export default function App({ Component, pageProps }) {

  return <>
    <Headers />
    <main id="site-wrapper">
      <Component {...pageProps} />
    </main>
  </>
}
