// pages/blogs/category/[category].js

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";

export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  // pagination
  const [currentPage, setCurrentPage] = useState(1); // for page 1
  const [perPage] = useState(7);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  // fetch blog category data
  const { alldata, loading } = useFetchData(
    `/api/blogs?blogcategory=${category}`
  );

  const filteredBlogs = alldata
    .filter((item) => item.category === item.category)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 20);

  const blogcategoryData = [...filteredBlogs].reverse();

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const allblog = alldata.length; // total number of blogs

  // calculate index of the first blog displayed on the current page
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;

  // Get the current pag's blogs
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const publishedData = currentBlogs.filter((ab) => ab.status === "publish");

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  const cleanText = (text) => {
    // Remove any markdown formatting and return plain text
    const plainText = text.replace(
      /(?:__|[*#])|\[(.*?)\]\(.*?\)|(?:\n)/g,
      "$1"
    );
    return plainText;
  };

  return (
    <>
      <Head>
        <title>Blog Category | PORTFOLIO</title>
        <meta
          name="description"
          content="Jirakit Aiadhet - Personal Portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="blogcategory">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1 data-aos="fade-right">
                  Category{" "}
                  <span>
                    {/* {category} */}
                    {category === "ML"
                      ? "Machine Learning & AI"
                      : category === "Web"
                      ? "Web Development"
                      : category === "App"
                      ? "App Development"
                      : category === "Game"
                      ? "Game Development"
                      : category}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="latestpostssec">
          <div className="container">
            <div className="border"></div>
            <div className="latestpostsdata">
              <div className="fetitle">
                <h3>Articles :</h3>
              </div>
              <div className="latestposts">
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    {publishedData.map((blog) => {
                      return (
                        <div
                          className="lpost"
                          key={blog._id}
                          data-aos="flip-left"
                        >
                          <div className="lpostimg">
                            <Link href={`/blogs/${blog.slug}`}>
                              <img src={blog.images[0]} alt={blog.slug} />
                            </Link>
                            <div className="tegs">
                              {blog.blogcategory.map((cat) => {
                                return (
                                  <Link
                                    key={cat}
                                    href={`/blogs/category/${cat}`}
                                    className="ai"
                                  >
                                    <span></span>
                                    {/* {cat} */}
                                    {cat === "ML"
                                      ? "Machine Learning & AI"
                                      : cat === "Web"
                                      ? "Web Development"
                                      : cat === "App"
                                      ? "App Development"
                                      : cat === "Game"
                                      ? "Game Development"
                                      : cat}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                          <div className="lpostinfo">
                            <h3>
                              <Link href={`blogs/${blog.slug}`}>
                                {blog.title}
                              </Link>
                            </h3>
                            <p>{cleanText(blog.description)}</p>
                            <h4 className="flex">
                              <img src="/img/me.jpg" alt="developer" />
                              By TOEYJIRA<span></span>
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            {/* for pagination */}
            {publishedData.length === 0 ? (
              ""
            ) : (
              <div className="blogspaginationbtn flex flex-center mt-3">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {pageNumbers
                  .slice(
                    Math.max(currentPage - 3, 0),
                    Math.min(currentPage + 2, pageNumbers.length)
                  )
                  .map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`${currentPage === number ? "active" : ""}`}
                    >
                      {number}
                    </button>
                  ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentBlogs.length < perPage}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
