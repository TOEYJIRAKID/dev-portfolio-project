// pages/blogs/[slug].js

import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";

const BlogPage = () => {

    const router = useRouter();
    const { slug } = router.query; // fetch the slug parameter from the router

    // hook for all data fetching
    const { alldata } = useFetchData('/api/blogs');

    const [blogData, setBlogData] = useState({ blog: {}, comments: [] }); // initialize comments as an empty array
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        title: '',
        contentpera: '',
        maincomment: true,
        parent: null, // track parent comment id for replies
        parentName: '', // track parent comment name for replies
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messageOk, setMessageOk] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {

        const fetchBlogData = async () => {
            if (slug) {
                try {
                    const response = await axios.get(`/api/blogs/${slug}`);
                    setBlogData(response.data);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to fetch blog data. please try again later.');
                    setLoading(false);
                }
            }
        }

        fetchBlogData();

    }, [slug]) // fetch data whenever slug change

    if (loading) {
        return <div className="flex flex-center wh_100"><Spinner /></div>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    const createdAtDate = blogData && blogData.blog.createdAt ? new Date(blogData && blogData.blog.createdAt) : null;

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

    //Dynamic blog url
    const blogUrl = `${window.location.origin}/blogs/${slug}`;
    // const blogUrl = `http://localhost:3000/blogs/${slug}`; // old code

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(blogUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000); // reset copied state after 3 sec
    }

    return (
        <>
            <Head>
                <title>{slug}</title>
            </Head>

            <div>
                {blogData && (
                    <div className="blogslugpage">
                        <div className="container">
                            <div className="blogslugpagecout">
                                <div className="leftsitedetails">
                                    <div className="leftbloginfoimg">
                                        <img src={blogData.blog.images[0] || '/img/noimage.png'} alt={blogData && blogData.blog.title} />
                                    </div>
                                    <div className="slugbloginfopub">
                                        <div className="flex gap-2">
                                            <div className="adminslug">
                                                <img src='/img/coder.jpg' alt="coder" />
                                                <span>By ToeyJira</span>
                                            </div>
                                            <div className="adminslug">
                                                <SlCalender />
                                                <span>{formatDate(createdAtDate)}</span>
                                            </div>
                                            <div className="adminslug">
                                                <CiRead />
                                                <span>Comments ({blogData.comments ? blogData.comments.length : 0})</span>
                                            </div>
                                        </div>

                                        <div className="shareblogslug">
                                            {/* copy url button */}
                                            <div title="Copy URL" onClick={() => handleCopyUrl(blogUrl)} style={{ cursor: 'pointer' }}>
                                                <BsCopy /> <span>{copied ? 'Copied!' : ''}</span>
                                            </div>

                                            {/* social share button */}
                                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer">
                                                <RiFacebookFill />
                                            </a>
                                            <a href={`https://www.x.com/intent/tweet?text=${encodeURIComponent('Check out this blog post: ' + blogUrl)}`} target="_blank" rel="noopener noreferrer">
                                                <FaTwitter />
                                            </a>
                                            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this blog post: ' + blogUrl)}`} target="_blank" rel="noopener noreferrer">
                                                <RiWhatsappFill />
                                            </a>
                                            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer">
                                                <BiLogoLinkedin />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BlogPage;
