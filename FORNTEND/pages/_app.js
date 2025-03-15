import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";


export default function App({ Component, pageProps }) {

  return <>
    <Headers />
    <main id="site-wrapper">
      <Component {...pageProps} />
    </main>
    <Footer />
  </>
}
