import "swiper/css";
import Head from "next/head";
import Link from "next/link";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Blogsearch from "@/components/Blogsearch";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

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
        <link rel="shortcut icon" type="image/png" href="/logo.ico" />
      </Head>

      <div className="blogpage">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1>
                  Welcome to <span>TOEYJIRA Blogs!</span>
                </h1>
                <p>
                  Explore insightful articles on coding, software development,
                  and industry trends, helping you stay updated and inspired.
                </p>
                <div className="subemail">
                  <form className="flex">
                    <input
                      onClick={handleSearchOpen}
                      placeholder="Search blogs here..."
                      type="text"
                    />
                    <button>Search</button>
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
                      spaceBetween={30}
                      className="mySwiper"
                      modules={[FreeMode, Navigation]}
                      navigation={true}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          {sliderpubdata.slice(0, 6).map((blog) => {
                            return (
                              <SwiperSlide key={blog._id}>
                                <div className="fpost" key={blog._id}>
                                  <Link href={`/blogs/${blog.slug}`}>
                                    <img src={blog.images[0]} alt={blog.slug} />
                                  </Link>
                                  <div className="fpostinfo">
                                    <div className="tegs flex">
                                      {blog.blogcategory.map((cat) => {
                                        return (
                                          <Link
                                            key={cat}
                                            href={`/blog/category${cat}`}
                                            className="ai"
                                          >
                                            <span></span>
                                            {cat}
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
                <h3>Popular Categories :</h3>
              </div>
              <div className="poputegs">
                <Link href="/blogs/category/Next JS" className="pteg">
                  <img
                    src="https://images-cdn.openxcell.com/wp-content/uploads/2024/07/24154156/dango-inner-2.webp"
                    alt="nextjs"
                  />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Next JS
                    </div>
                  </div>
                </Link>
                <Link href="/blogs/category/Node JS" className="pteg">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-sqAjIvOtpXI%2FXYoCmqOyMwI%2FAAAAAAAAJig%2FCowR8wgEauEs-RXN2IPmLYkC7NHoHuA3gCLcBGAsYHQ%2Fs1600%2Fnode-js-logo.png&f=1&nofb=1&ipt=150fc0483e4465a22a3e277c4648396630b73d7dd21249b50e0f27b5753e8e4f&ipo=images"
                    alt="nodejs"
                  />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Node JS
                    </div>
                  </div>
                </Link>
                <Link href="/blogs/category/React JS" className="pteg">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2FeNAsjO55tPbgaor7ma%2Fsource.gif&f=1&nofb=1&ipt=1b6c2d1f4493f3ac96918899cd5c25eeec185ba33f30d800552d9b6a6655a8c7&ipo=images"
                    alt="reactjs"
                  />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>React JS
                    </div>
                  </div>
                </Link>
                <Link href="/blogs/category/Digital Marketing" className="pteg">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bandt.com.au%2Finformation%2Fuploads%2F2016%2F06%2Fwhat-is-digital-marketing.jpg&f=1&nofb=1&ipt=656563f849714c46144b621537bf85f7ac8acb506678f5b0679879dd602bb9b4&ipo=images"
                    alt="digital"
                  />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Digital
                    </div>
                  </div>
                </Link>
                <Link href="/blogs/category/Flutter Dev" className="pteg">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fscholar.fidahasan.com%2Fwp-content%2Fuploads%2F2019%2F11%2Fflutter-logo.png&f=1&nofb=1&ipt=2ea4dd59087272499663573c42b9fce58916ac50f20c7186946de0ffc23acfe1&ipo=images"
                    alt="flutter"
                  />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Flutter
                    </div>
                  </div>
                </Link>
                <Link href="/blogs/category/Tailwind CSS" className="pteg">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd6f6d0kpz0gyr.cloudfront.net%2Fuploads%2Fimages%2F_1200x630_crop_center-center_82_none%2Ftailwind-thumb.jpg%3Fmtime%3D1609771799&f=1&nofb=1&ipt=7905bdb27cec8eef124c91d0809bea12a463ac5d375240e052349785be22fbb9&ipo=images"
                    alt="tailwind"
                  />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Tailwind
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
                        <div className="lpost" key={blog._id}>
                          <div className="lpostimg">
                            <Link href={`/blogs/${blog.slug}`}>
                              <img src={blog.images[0]} alt={blog.title} />
                            </Link>
                            <div className="tegs">
                              {blog.blogcategory.map((cat) => {
                                return (
                                  <Link
                                    key={cat}
                                    href={`/blog/category${cat}`}
                                    className="ai"
                                  >
                                    <span></span>
                                    {cat}
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
                            <p>
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Quis mollitia architecto
                              aperiam, repellendus dolore suscipit officiis quia
                              soluta dolorum inventore eveniet. Obcaecati,
                              molestiae dolore. Blanditiis autem obcaecati
                              laboriosam quo accusamus.{" "}
                            </p>
                            <h4 className="flex">
                              <img src="/img/coder.jpg" alt="coder" />
                              By ToeyJira<span></span>
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
