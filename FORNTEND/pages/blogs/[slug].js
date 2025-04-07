// pages/blogs/[slug].js

import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import remarkGfm from "remark-gfm";
import { BsCopy } from "react-icons/bs";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import Spinner from "@/components/Spinner";
import { FaTwitter } from "react-icons/fa";
import { CiCalendar, CiChat1 } from "react-icons/ci";
import useFetchData from "@/hooks/useFetchData";
import { RiFacebookFill } from "react-icons/ri";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import Blogsearch from "@/components/Blogsearch";
import { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query; // fetch the slug parameter from the router

  // hook for all data fetching
  const { alldata } = useFetchData("/api/blogs");
  const [searchInput, setSearchInput] = useState(false);

  const handleSearchOpen = () => {
    setSearchInput(!searchInput);
  };

  const handleSearchClose = () => {
    setSearchInput(false);
  };

  const [blogData, setBlogData] = useState({ blog: {}, comments: [] }); // initialize comments as an empty array
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    title: "",
    contentpera: "",
    maincomment: true,
    parent: null, // track parent comment id for replies
    parentName: "", // track parent comment name for replies
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageOk, setMessageOk] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blogs/${slug}`);
          setBlogData(response.data);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch blog data. please try again later.");
          setLoading(false);
        }
      }
    };

    fetchBlogData();
  }, [slug]); // fetch data whenever slug change

  const slugLink = alldata.filter((ab) => ab.status === "publish");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/blogs/${slug}`, newComment);

      // check if it's reply (nest comment) or root comment
      if (newComment.parent) {
        // add the new comment to the parent's comments array
        setBlogData((prevData) => {
          const updatedComments = prevData.comments.map((comment) => {
            if (comment._id === newComment.parent) {
              return {
                ...comment,
                children: [...comment.children, response.data],
              };
            } else if (comment.children && comment.children.length > 0) {
              // recursively update children comments
              return {
                ...comment,
                children: updateChildrenComments(
                  comment.children,
                  newComment.parent,
                  response.data
                ),
              };
            }
            return comment;
          });

          return {
            ...prevData,
            comments: updatedComments,
          };
        });
      } else {
        // add the new root comment
        setBlogData((prevData) => ({
          ...prevData,
          comments: [response.data, ...prevData.comments],
        }));
      }

      setMessageOk("✅ Comment posted successfully.");
      setTimeout(() => {
        setMessageOk("");
      }, 5000); // clear message after 5 sec

      // clear form after successful submission
      setNewComment({
        name: "",
        email: "",
        title: "",
        contentpera: "",
        maincomment: true,
        parent: null,
        parentName: "", // reset parent name after submission
      });
    } catch (error) {
      setMessageOk("❌ Failed to post comment. please try again later.");
      setTimeout(() => {
        setMessageOk("");
      }, 5000); // clear message after 5 sec
    }
  };

  // for scroll down to comment form
  const replyFormRef = useRef(null);

  const handleReply = (parentCommentId, parentName) => {
    setNewComment({
      ...newComment,
      parent: parentCommentId,
      parentName: parentName, // set parent name when replying to a comment
      maincomment: false, // set maincomment to false when replying to a comment
    });

    if (replyFormRef.current) {
      replyFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRemoveReply = () => {
    setNewComment({
      ...newComment,
      parent: null,
      parentName: null,
      maincomment: true, // set maincomment to true when removing a reply
    });
  };

  const updateChildrenComments = (comments, parentId, newComment) => {
    return comments.map((comment) => {
      if (comment._id === parentId) {
        // add the new comment to the parent's comments array
        return {
          ...comment,
          children: [...comment.children, newComment],
        };
      } else if (comment.children && comment.children.length > 0) {
        // recursively update children comments
        return {
          ...comment,
          children: updateChildrenComments(
            comment.children,
            parentId,
            newComment
          ),
        };
      }
      return comment;
    });
  };

  if (loading) {
    return (
      <div className="flex flex-center wh_100">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const createdAtDate =
    blogData && blogData.blog.createdAt
      ? new Date(blogData && blogData.blog.createdAt)
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

  //Dynamic blog url
  const blogUrl = `${window.location.origin}/blogs/${slug}`;
  // const blogUrl = `http://localhost:3000/blogs/${slug}`; // old code

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(blogUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); // reset copied state after 3 sec
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

  const Links = ({ node, ...props }) => {
    return (
      <a
        className="custom-link"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  };

  const renderComments = (comments) => {
    if (!comments) {
      return null; // handle case when comments are not yet loaded
    }

    // create a map to efficiently find children of each comments
    const commentsMap = new Map();
    comments.forEach((comment) => {
      if (comment.maincomment) {
        commentsMap.set(comment._id, []);
      }
    });

    // populate children comments into their respective parents
    comments.forEach((comment) => {
      if (!comment.maincomment && comment.parent) {
        if (commentsMap.has(comment.parent)) {
          commentsMap.get(comment.parent).push(comment);
        }
      }
    });

    // render the comments
    return comments
      .filter((comment) => comment.maincomment)
      .map((parentComment) => (
        <div className="blogcomment" key={parentComment._id}>
          <h3>
            {parentComment.name}{" "}
            <span>{new Date(parentComment.createdAt).toLocaleString()}</span>
          </h3>
          <h4>
            Topic: <span>{parentComment.title}</span>
          </h4>
          <p>{parentComment.contentpera}</p>
          <button
            onClick={() => handleReply(parentComment._id, parentComment.name)}
          >
            Reply
          </button>
          {parentComment.parent && (
            <span className="repliedto">
              Replied to {parentComment.parentName}
            </span>
          )}

          <div className="children-comments">
            {commentsMap.get(parentComment._id).map((childComment) => (
              <div className="child-comment" key={childComment._id}>
                <h3>
                  {childComment.name}{" "}
                  <span>
                    {new Date(childComment.createdAt).toLocaleString()}
                  </span>
                </h3>
                <span>Replied to {childComment.parentName}</span>
                <h4>
                  Topic: <span>{childComment.title}</span>
                </h4>
                <p>{childComment.contentpera}</p>
              </div>
            ))}
          </div>
        </div>
      ));
  };

  return (
    <>
      <Head>
        <title>{blogData.blog.title} | PORTFOLIO</title>
        <meta
          name="description"
          content="Jirakit Aiadhet - Personal Portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
        {blogData && (
          <div className="blogslugpage">
            <div className="container">
              <div className="blogslugpagecont">
                <div className="leftsitedetails">
                  <div className="leftbloginfoimg">
                    <img
                      src={blogData.blog.images[0] || "/img/noimage.png"}
                      alt={blogData && blogData.blog.slug}
                    />
                  </div>
                  <div className="slugbloginfopub">
                    <div className="leftadminslug">
                      <div className="adminslug">
                        <img src="/img/me.jpg" alt="developer" />
                        <span>By TOEYJIRA</span>
                      </div>
                      <div className="adminslug">
                        <CiCalendar />
                        <span>{formatDate(createdAtDate)}</span>
                      </div>
                      <div className="adminslug">
                        <CiChat1 />
                        <span>
                          Comments (
                          {blogData.comments ? blogData.comments.length : 0})
                        </span>
                      </div>
                    </div>

                    <div className="shareblogslug">
                      {/* copy url button */}
                      <div
                        title="Copy URL"
                        onClick={() => handleCopyUrl(blogUrl)}
                        style={{ cursor: "pointer" }}
                      >
                        <BsCopy /> <span>{copied ? "Copied!" : ""}</span>
                      </div>

                      {/* social share button */}
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          blogUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RiFacebookFill />
                      </a>
                      <a
                        href={`https://www.x.com/intent/tweet?text=${encodeURIComponent(
                          "Check out this blog post: " + blogUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                          "Check out this blog post: " + blogUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RiWhatsappFill />
                      </a>
                      {/* <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                          blogUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BiLogoLinkedin />
                      </a> */}
                    </div>
                  </div>
                  <h1>{blogData.blog.title}</h1>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <div className="blogcontent">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code: Code,
                          a: Links,
                        }}
                      >
                        {blogData.blog.description}
                      </ReactMarkdown>
                    </div>
                  )}
                  <div className="blogslugtags">
                    <div className="blogstegs">
                      <h2>Tags:</h2>
                      <div className="flex flex-wrap gap-1">
                        {blogData &&
                          blogData.blog.tags.map((cat) => {
                            return <span key={cat}>{cat}</span>;
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="blogusecomments">
                    <h2>Comments</h2>
                    {renderComments(blogData.comments)}
                  </div>
                  <div className="blogslugcomments" ref={replyFormRef}>
                    {newComment.parentName && (
                      <h2>
                        Leave a reply to{" "}
                        <span className="perentname">
                          {newComment.parentName}{" "}
                        </span>
                        <button
                          onClick={handleRemoveReply}
                          className="removereplybtn"
                        >
                          Remove Reply
                        </button>
                      </h2>
                    )}
                    {!newComment.parentName && <h2>Leave a reply</h2>}
                    <p>
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                    <form
                      className="leaveareplyform"
                      onSubmit={handleCommentSubmit}
                    >
                      <div className="nameemailcomment">
                        <input
                          required
                          type="text"
                          placeholder="Enter Name"
                          value={newComment.name}
                          onChange={(e) =>
                            setNewComment({
                              ...newComment,
                              name: e.target.value,
                            })
                          }
                        />
                        <input
                          required
                          type="email"
                          placeholder="Enter Email"
                          value={newComment.email}
                          onChange={(e) =>
                            setNewComment({
                              ...newComment,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="Enter Title"
                        value={newComment.title}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            title: e.target.value,
                          })
                        }
                      />
                      <textarea
                        required
                        name=""
                        rows={4}
                        id="textcomments"
                        placeholder="Enter Your Comments"
                        value={newComment.contentpera}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            contentpera: e.target.value,
                          })
                        }
                      ></textarea>
                      <div className="postbtn">
                        <button type="submit">POST COMMENT</button>
                        <p>{messageOk}</p>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="rightsitedetails">
                  <div className="rightslugsearchbar">
                    <input
                      onClick={handleSearchOpen}
                      type="text"
                      placeholder="Search blogs here..."
                      readOnly
                      style={{ cursor: "pointer" }}
                    />
                    <button>
                      <FiSearch />
                    </button>
                  </div>
                  <div className="rightslugcategory">
                    <h2>CATEGORIES</h2>
                    <ul>
                      <Link href="/blogs/category/Web">
                        <li>
                          Web Development
                          <span>
                            (
                            {
                              slugLink.filter(
                                (ab) => ab.blogcategory[0] === "Web"
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href="/blogs/category/App">
                        <li>
                          App Development
                          <span>
                            (
                            {
                              slugLink.filter(
                                (ab) => ab.blogcategory[0] === "App"
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href="/blogs/category/Game">
                        <li>
                          Game Development
                          <span>
                            (
                            {
                              slugLink.filter(
                                (ab) => ab.blogcategory[0] === "Game"
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href="/blogs/category/ML">
                        <li>
                          Machine Learning & AI
                          <span>
                            (
                            {
                              slugLink.filter(
                                (ab) => ab.blogcategory[0] === "ML"
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <div className="rightrecentpost">
                    <h2>RECENT POSTS</h2>
                    {slugLink.slice(0, 3).map((blog) => {
                      return (
                        <Link
                          key={blog._id}
                          href={`/blogs/${blog.slug}`}
                          className="rightrecentp"
                        >
                          <img
                            src={blog.images[0] || "/img/noimage.png"}
                            alt={blog.slug}
                          />
                          <div>
                            <h3>{blog.title}</h3>
                            <div className="mt-1 tag-container">
                              {blog.tags.map((cat) => (
                                <span key={cat}>{cat}</span>
                              ))}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;
