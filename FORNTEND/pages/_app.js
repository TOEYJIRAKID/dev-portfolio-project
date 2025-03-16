import AOS from "aos";
import 'aos/dist/aos.css'
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";

export default function App({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    }

    // simulate a loading delay
    setTimeout(handleComplete, 3000);

    return () => {
      clearTimeout(handleComplete);
    }

  }, []);

  // aos animation
  useEffect(() => {
    // initialize aos
    AOS.init({
      // global settings
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      // settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 100, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 
      duration: 900, // values from 0 to 
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom',
    })
  }, [])

  return <>
    <Preloader isLoading={isLoading} />
    <Headers />
    {!isLoading && (
      <main id="site-wrapper">
        <Component {...pageProps} />
      </main>
    )}
    <Footer />
  </>
}
