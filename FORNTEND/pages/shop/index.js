// pages/shop/index.js

import Head from "next/head";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";

export default function shop() {
  // fetch blog data
  const { alldata, loading } = useFetchData("/api/shops");

  const publisheddata = alldata.filter((ab) => ab.status === "publish");

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

  return (
    <>
      <Head>
        <title>Shop | PORTFOLIO</title>
        <meta
          name="description"
          content="Jirakit Aiadhet - Personal Portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="shoppage">
        <div className="shoppagetoptitle">
          <div className="container">
            <h3 data-aos="fade-up">SHOP ONLINE</h3>
            <h2 data-aos="fade-up">ALL TECH PRODUCTS</h2>
          </div>
        </div>
        <div className="shopproducts">
          <div className="container">
            <div className="shopprocards">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {publisheddata.map((pro) => {
                    return (
                      <Link
                        href={`/shop/${pro.slug}`}
                        key={pro._id}
                        className="spprocard"
                        data-aos="zoom-in-up"
                      >
                        <div className="spprocardimg">
                          <img src={pro.images[0]} alt={pro.slug} />
                        </div>
                        <div className="spprocinfo">
                          <h2>{pro.title}</h2>
                          <h3>$ {pro.price}</h3>
                          <div className="spprotags">
                            {pro.tags.map((tag) => {
                              return <span key={tag}>{tag}</span>;
                            })}
                          </div>
                          <p>{formatDate(createdAtDate)}</p>
                        </div>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
