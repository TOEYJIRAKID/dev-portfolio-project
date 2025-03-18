import Link from "next/link";
import { IoClose } from "react-icons/io5";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useState, useMemo } from "react";

/**
 * Extracts the first paragraph from markdown and converts it to plain text.
 * @param {string} markdown
 * @returns {string}
 */

// const extractFirstParagraph = (markdown) => {
//   if (!markdown) return "";

//   // Split by new lines to separate paragraphs
//   const paragraphs = markdown.split("\n\n");

//   // Convert markdown to plain text using react-markdown
//   const firstParagraph = paragraphs[0] || "";

//   // Strip markdown formatting using regex
//   return firstParagraph.replace(/[#_*`]/g, "").trim();
// };

export default function Blogsearch(props) {
  const { alldata = [], loading } = useFetchData("/api/blogs"); // Assuming useFetchData returns an object with alldata and loading

  const [searchResult, setSearchResult] = useState(null);
  const [blogtitle, setBlogtitle] = useState(""); // blogtitle should be initialized as a string

  // filter for published blogs required, memoize it
  const publishedData = useMemo(() => {
    return alldata.filter((ab) => ab.status === "publish");
  }, [alldata]);

  // // filter for published blogs required
  // const publishedData = alldata.filter(ab => ab.status === 'publish');

  // Function to handle search
  useEffect(() => {
    if (!blogtitle.trim()) {
      // Here, blogtitle should be checked if it's an empty string
      setSearchResult([]);
      return;
    }

    const filteredblogs = publishedData.filter((blog) =>
      blog.title.toLowerCase().includes(blogtitle.toLowerCase())
    );

    setSearchResult(filteredblogs); // setSearchResult should be used to update searchResult state
  }, [blogtitle, publishedData]);

  const handleBlogClick = () => {
    setBlogtitle(""); // This clears the input field when a blog is clicked
  };

  if (loading) return <p>Loading...</p>; // optionally handle the loading state

  return (
    <>
      <div className="searchblogfix">
        <div className="searchblogsectionfix">
          <div className="sbsfinput flex gap-1">
            <input
              type="text"
              placeholder="Search blogs here..."
              value={blogtitle}
              onChange={(e) => setBlogtitle(e.target.value)}
            />
            <div className="sbsinputclose" onClick={props.cls}>
              <IoClose />
            </div>
          </div>
          <div className="sbsfsearchlist mt-2">
            {blogtitle && (
              <>
                {searchResult.length === 0 ? (
                  <h3>
                    No Blog Found <span>(please check your spelling)</span>
                  </h3>
                ) : (
                  <>
                    {searchResult.slice(0, 10).map((blog) => {
                      return (
                        <Link
                          href={`/blogs/${blog.slug}`}
                          key={blog._id}
                          className="sbsfsbox"
                          onClick={props.cls}
                        >
                          <h2>{blog.title}</h2>
                          <p>
                            {" "}
                            {blog.tags.map((cat) => {
                              return <span key={cat}> #{cat}</span>;
                            })}
                          </p>
                          {/* <p>{extractFirstParagraph(blog.description)}</p> */}
                        </Link>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
