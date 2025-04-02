// pages/projects/[slug].js

import Head from "next/head";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/router";
import { FreeMode } from "swiper/modules";
import Spinner from "@/components/Spinner";
import ReactMarkDown from "react-markdown";
import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function projectslug() {
  const router = useRouter();
  const { slug } = router.query; // fetch the slug parameter from the router

  // hook for all data fetching
  const { alldata, loading } = useFetchData(`/api/projects?slug=${slug}`);

  const createdAtDate =
    alldata && alldata[0]?.createdAt
      ? new Date(alldata && alldata[0]?.createdAt)
      : null;

  // function to format the date as '23 may 2025 10:10 pm'
  const formatDate = (date) => {
    // check if date if valid
    if (!date || isNaN(date)) {
      return ""; // or handle the error as needed
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true, // use 12-hour format
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

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

  const Image = ({ node, ...props }) => {
    return <img className="responsive-img" {...props} />;
  };

  const Link = ({ node, ...props }) => {
    return (
      <a
        className="custom-link"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
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

      <div className="projectslug">
        <div className="projectslug">
          <div className="projectslugimg">
            <div className="container">
              <div className="proslugimg">
                <div className="projectmainimg">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <img src={mainImage} alt={alldata && alldata[0]?.slug} />
                  )}
                </div>
                <div className="projectslugsliderimg">
                  <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    freeMode={true}
                    grabCursor={false}
                    modules={[FreeMode]}
                    className="mySwiper"
                  >
                    {alldata &&
                      alldata[0]?.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`swiper-image-project-container ${
                              mainImage === image ? "active" : ""
                            }`}
                          >
                            <img
                              onClick={() => handleImageClick(`${image}`)}
                              src={image}
                              alt={alldata && alldata[0]?.slug}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>

              <div className="projectsluginfo">
                <div className="leftmainproinfo">
                  <h1 className="project-title">
                    {alldata && alldata[0]?.title}
                  </h1>
                  <p>
                    {" "}
                    {alldata &&
                      alldata[0]?.tags.map((cat) => {
                        return <span key={cat}> #{cat}</span>;
                      })}
                  </p>
                  <a href={alldata && alldata[0]?.livepreview} target="_blank">
                    Live Preview
                  </a>
                </div>
                <div className="rightmainproinfo">
                  <div>
                    <h3>Category</h3>
                    <h2>{alldata && alldata[0]?.projectcategory}</h2>
                  </div>
                  <div>
                    <h3>Client</h3>
                    <h2>{alldata && alldata[0]?.client}</h2>
                  </div>
                  <div>
                    <h3>Start Date</h3>
                    <h2>{formatDate(createdAtDate)}</h2>
                  </div>
                  <div>
                    <h3>Create By</h3>
                    <h2>TOEYJIRA</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="projectslugdescription">
            <div className="container">
              <div className="psdescri">
                <h2 className="psdescri-text">Project Description</h2>
                <div className="blogcontent">
                  <ReactMarkDown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: Code,
                      img: Image,
                      a: Link,
                    }}
                  >
                    {alldata[0]?.description}
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
