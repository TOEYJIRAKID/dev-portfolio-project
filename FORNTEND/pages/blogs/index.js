// pages/blogs/index.js

import "swiper/css";
import Head from "next/head";
import Link from "next/link";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
import { FreeMode } from "swiper/modules";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Blogsearch from "@/components/Blogsearch";
import { Swiper, SwiperSlide } from "swiper/react";

export default function blogs() {
  // pagination
  const [currentPage, setCurrentPage] = useState(1); // for page 1
  const [perPage] = useState(7);

  const [searchInput, setSearchInput] = useState(false);

  const handleSearchOpen = () => {
    setSearchInput(!searchInput);
  };

  const handleSearchClose = () => {
    setSearchInput(false);
  };

  // search
  const [searchQuery, setSearchQuery] = useState("");

  // fetch blog data
  const { alldata, loading } = useFetchData(`/api/blogs`);

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // total number of blogs
  const allblog = alldata.length;

  // filter all data based on search query
  const filteredBlogs =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // calculate index of the first blog displayed on the current page
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;

  // Get the current pag's blogs
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const publishedData = currentBlogs.filter((ab) => ab.status === "publish");
  const sliderpubdata = alldata.filter((ab) => ab.status === "publish");

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Head>
        <title>Blogs | PORTFOLIO</title>
        <meta
          name="description"
          content="Jirakit Aiadhet - Personal Portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="blogpage">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1 data-aos="fade-right">
                  Welcome to <span>TOEYJIRA Blogs!</span>
                </h1>
                <p data-aos="fade-right">
                  Explore insightful articles on coding, software development,
                  and industry trends, helping you stay updated and inspired.
                </p>
                <div className="subemail" data-aos="fade-up">
                  <form className="flex">
                    <input
                      onClick={handleSearchOpen}
                      placeholder="Search blogs here..."
                      type="text"
                      readOnly
                      style={{ cursor: "pointer" }}
                    />
                    <button disabled>Search</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="featured">
              <div className="border">
                <div className="featuredposts">
                  <div className="fetitle flex">
                    <h3>Featured Posts :</h3>
                  </div>
                  <div className="feposts flex">
                    <Swiper
                      slidesPerView={"auto"}
                      freeMode={true}
                      spaceBetween={5}
                      className="mySwiper"
                      modules={[FreeMode]}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          {sliderpubdata.slice(0, 6).map((blog) => {
                            return (
                              <SwiperSlide key={blog._id}>
                                <div
                                  className="fpost"
                                  key={blog._id}
                                  data-aos="flip-left"
                                >
                                  <Link href={`/blogs/${blog.slug}`}>
                                    <img src={blog.images[0]} alt={blog.slug} />
                                  </Link>
                                  <div className="fpostinfo">
                                    <div className="tegs flex">
                                      {blog.blogcategory.map((cat) => {
                                        return (
                                          <Link
                                            key={cat}
                                            href={`/blogs/category/${cat}`}
                                            className="ai"
                                          >
                                            <span></span>
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
                                    <h2>
                                      <Link href={`/blogs/${blog.slug}`}>
                                        {blog.title}
                                      </Link>
                                    </h2>
                                    <div className="fpostby flex">
                                      <img src="/img/me.jpg" alt="developer" />
                                      <p>By TOEYJIRA</p>
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </>
                      )}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="populartegssec">
          <div className="container">
            <div className="border"></div>
            <div className="populartegsdata">
              <div className="fetitle">
                <h3>Categories :</h3>
              </div>
              <div className="poputegs">
                <Link
                  href="/blogs/category/Web"
                  className="pteg"
                  data-aos="fade-right"
                >
                  <img src="/img/web-dev.jpg" alt="Web Development" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Web Dev
                    </div>
                  </div>
                </Link>
                <Link
                  href="/blogs/category/App"
                  className="pteg"
                  data-aos="fade-right"
                >
                  <img src="/img/app-dev.jpg" alt="App Development" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>App Dev
                    </div>
                  </div>
                </Link>
                <Link
                  href="/blogs/category/Game"
                  className="pteg"
                  data-aos="fade-left"
                >
                  <img src="/img/game-dev.jpg" alt="Game Development" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Game Dev
                    </div>
                  </div>
                </Link>
                <Link
                  href="/blogs/category/ML"
                  className="pteg"
                  data-aos="fade-left"
                >
                  <img src="/img/ml-dev.jpg" alt="Machine Learning & AI" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>ML & AI
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="latestpostsec">
          <div className="container">
            <div className="border"></div>
            <div className="latestpostsdata">
              <div className="fetitle">
                <h3>Latest Articles :</h3>
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
                          data-aos="flip-right"
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
                            {/* <p>{cleanText(blog.description)}</p> */}
                            <p>
                              {" "}
                              {blog.tags.map((cat) => {
                                return <span key={cat}> #{cat}</span>;
                              })}
                            </p>
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
          {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
        </section>
      </div>
    </>
  );
}
