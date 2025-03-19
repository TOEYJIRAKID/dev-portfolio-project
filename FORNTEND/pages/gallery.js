import Head from "next/head";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";

export default function gallery() {
  const { alldata, loading } = useFetchData("/api/photos");

  return (
    <>
      <Head>
        <title>Certificate Gallery | PORTFOLIO</title>
        <meta
          name="description"
          content="Jirakit Aiadhet - Personal Portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="gallerypage">
        <div className="container">
          <div className="gallerytopsec">
            <div className="topphonesec">
              <div className="lefttitlesec">
                <h4 data-aos="fade-right">TOEYJIRA Certificate Gallery</h4>
                <h1 data-aos="fade-right">
                  Personal <br /> Achievements
                </h1>
                <Link href="/gallery#galleryimages">
                  <button data-aos="fade-up">VIEW MORE</button>
                </Link>
              </div>
              <div className="rightimgsec">
                <img
                  src="/img/badge.png"
                  alt="Smart-Skill-Certificate"
                  className="single-badge-img"
                  data-aos="flip-left"
                />
                {/* <div className="r_img_top">
                  <img
                     src="/img/badge.png"
                    alt="Code-Org-Certificate"
                  />
                  <img
                     src="/img/badge.png"
                    alt="BorntoDev-Com-Sci-Certificate"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="gallerybtmphotos" id="galleryimages">
          <div className="container">
            <div className="gbtmtitles text-center">
              <h3 data-aos="fade-up">
                <span>#MY</span> ALL ACHIEVE
              </h3>
              {/* <h2>
                Showcasing <span>All of My</span>
                <br />
                Achievements & Certifications
              </h2> */}
            </div>
            <div className="gallery_image_grid">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {alldata.map((photo) => {
                    return (
                      <div
                        className="image-item"
                        key={photo._id}
                        data-aos="flip-left"
                      >
                        <img
                          className="image-item-img"
                          src={photo.images[0]}
                          alt={photo.slug}
                        />
                        <div className="galeryimgiteminfo">
                          <h2>{photo.title}</h2>
                          <div className="imgiteminfo flex">
                            <img src="/img/me.jpg" alt="developer" />
                            <p>By TOEYJIRA</p>
                          </div>
                        </div>
                      </div>
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
