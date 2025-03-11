import "@/styles/globals.css";


export default function App({ Component, pageProps }) {

  return <>
    <main id="site-wrapper">
      <Component {...pageProps} />
    </main>
  </>
}
