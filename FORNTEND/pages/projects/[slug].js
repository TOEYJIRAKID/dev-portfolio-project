import Head from "next/head";
import { useState } from "react";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/router";
import ReactMarkDown from 'react-markdown'
import useFetchData from "@/hooks/useFetchData";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function projectslug() {

    const router = useRouter();
    const { slug } = router.query; // fetch the slug parameter from the router

    // hook for all data fetching
    const { alldata, loading } = useFetchData(`/api/projects?slug=${slug}`);

    const createdAtDate = alldata && alldata[0]?.createdAt ? new Date(alldata && alldata[0]?.createdAt) : null;

    // function to format the date as '23 may 2025 10:10 pm'
    const formatDate = (date) => {
        // check if date if valid
        if (!date || isNaN(date)) {
            return ''; // or handle the error as needed
        }

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: true // use 12-hour format
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');

        const [copied, setCopied] = useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000); // reset copied state after 3 sec
        }

        if (inline) {
            return <code>{children}</code>
        } else if (match) {
            return (
                <div style={{ position: 'relative' }}>
                    <SyntaxHighlighter
                        style={a11yDark}
                        language={match[1]}
                        PreTag='pre' {...props}
                        codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflow: 'auto', whiteSpace: 'pre-wrap' } }}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    <button onClick={handleCopy} style={{ position: 'absolute', top: '0', right: '0', zIndex: '1', background: '#3d3d3d', color: '#fff', padding: '10px' }}>
                        {copied ? 'Copied!' : 'Copy code'}
                    </button>
                </div>
            );
        } else {
            return (
                <code className="md-post-code" {...props}>
                    {children}
                </code>
            )
        }
    }

    return <>
        <Head>
            <title>{slug}</title>
        </Head>

        <div className="projectslug">
            <div className="projectslug">
                <div className="projectslugimg">
                    <div className="container">
                        <div className="proslugimg">
                            <img src={alldata && alldata[0]?.images[0]} alt={alldata && alldata[0]?.title} />
                        </div>

                        <div className="projectsluginfo">
                            <div className="leftmainproinfo">
                                <h1>{alldata && alldata[0]?.title}</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolore, quisquam repellendus labore, dicta facere quae explicabo sint illum eos culpa repudiandae animi cum natus!</p>
                                <a href={alldata && alldata[0]?.livepreview} target="_blank">Live Preview</a>
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
                            </div>
                        </div>

                        <div className="projectslugsliderimg">
                            <Swiper
                                slidesPerView={'auto'}
                                spaceBetween={30}
                                freeMode={true}
                                grabCursor={true}
                                modules={[FreeMode]}
                                className="mySwiper"
                            >
                                {alldata && alldata[0]?.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={image} alt="project" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="projectslugdescription">
                    <div className="container">
                        <div className="psdescri">
                            <h2>Project Description</h2>
                            <div className="blogcontent">
                                <ReactMarkDown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: Code,
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
}