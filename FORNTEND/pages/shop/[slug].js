// pages/shop/[slug].js

import Head from "next/head";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/router";
import { FreeMode } from "swiper/modules";
import ReactMarkDown from "react-markdown";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function shopslug() {
  const router = useRouter();
  const { slug } = router.query; // fetch the slug parameter from the router

  // hook for all data fetching
  const { alldata, loading } = useFetchData(`/api/shops?slug=${slug}`);

  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); // reset copied state after 3 sec
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            style={a11yDark}
            language={match[1]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflow: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "1",
              background: "#3d3d3d",
              color: "#fff",
              padding: "10px",
            }}
          >
            {copied ? "Copied!" : "Copy code"}
          </button>
        </div>
      );
    } else {
      return (
        <code className="md-post-code" {...props}>
          {children}
        </code>
      );
    }
  };

  const [mainImage, setMainImage] = useState("");

  // useEffect to set mainImage once alldata is available
  useEffect(() => {
    if (alldata && alldata.length > 0 && alldata[0]?.images[0]) {
      setMainImage(alldata[0]?.images[0]);
    }
  }, [alldata]);

  // function to handle click on product
  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  return (
    <>
      <Head>
        <title>{alldata && alldata[0]?.title} | PORTFOLIO</title>
        <meta
          name="description"
          content="Jirakit Aiadhet - Personal Portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="shopslugpage">
        <div className="shopcontent">
          <div className="container">
            <div className="shopcontbox">
              <div className="leftshopimgbox">
                <div className="leftshopmainimg">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <img src={mainImage} alt={alldata && alldata[0]?.slug} />
                  )}
                </div>
                <div className="leftsimgboxlist">
                  <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={20}
                    freeMode={true}
                    grabCursor={true}
                    modules={[FreeMode]}
                    className="mySwiper"
                  >
                    {alldata &&
                      alldata[0]?.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`swiper-image-container ${
                              mainImage === image ? "active" : ""
                            }`}
                          >
                            <img
                              onClick={() => handleImageClick(image)}
                              src={image}
                              alt={alldata && alldata[0]?.slug}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
              <div className="rightshopcontbox">
                <h1>{alldata && alldata[0]?.title}</h1>
                <h3 className="rightshopprice">
                  Price: $<span>{alldata && alldata[0]?.price}</span>
                </h3>
                <a
                  className="shopnowbtn"
                  href={alldata && alldata[0]?.afilink}
                  target="_blank"
                >
                  Shop Now
                </a>
                <div className="blogcontent">
                  <h2 className="bctitle">Product Details:</h2>
                  <ReactMarkDown
                    rehypePlugins={[remarkGfm]}
                    components={{
                      code: Code,
                    }}
                  >
                    {alldata && alldata[0]?.description}
                  </ReactMarkDown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
