import "@/styles/globals.css";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
// import { SessionProvider } from "next-auth/react"
import ParentComponent from "@/components/ParentComponent";

export default function App({ Component, pageProps }) {

  const [loading, setLoading] = useState(true);

  const router = useRouter(); // use useRouter hook

  useEffect(() => {
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    // Check if the load is complete when the component is installed.
    if (router.isReady) {
      setLoading(false);
    }

    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);
    router.events.on("routeChangeError", stopLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
      router.events.off("routeChangeError", stopLoading);
    };

  }, [router.isReady]); // Add router.event as dependency

  const [asideOpen, setAsideOpen] = useState(false);

  const AsideClickOpen = () => {
    setAsideOpen(!asideOpen);
  };

  return <>
    {loading ? (
      // loading while load
      <div className="flex flex-col flex-center wh_100">
        <Loading />
        <h1 className="mt-1">Loading...</h1>
      </div>
    ) : (
      <>
        <ParentComponent appOpen={asideOpen} appAsideOpen={AsideClickOpen} />
        <main>
          <div className={asideOpen ? 'container' : 'container active'}>
            {/* <SessionProvider> */}
              <Component {...pageProps} />
            {/* </SessionProvider> */}
          </div>
        </main>
      </>
    )}
  </>
}
