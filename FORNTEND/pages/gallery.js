import Head from "next/head";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import { useState, useRef, useEffect } from "react";

export default function gallery() {
  const { alldata, loading } = useFetchData("/api/photos");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null); // Create a ref for the modal

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

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
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
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
                <span>#ALL</span> MY ACHIEVE
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
                        data-aos="zoom-in-up"
                      >
                        <img
                          className="image-item-img"
                          src={photo.images[0]}
                          alt={photo.slug}
                          onClick={() => handleImageClick(photo.images[0])}
                          style={{ cursor: "pointer" }}
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
        {/* Modal */}
        {isModalOpen && (
          <div className="image-modal">
            <div className="modal-content" ref={modalRef}>
              {" "}
              {/* Add the ref here */}
              <span className="close-modal" onClick={handleCloseModal}>
                &times;
              </span>
              <img src={selectedImage} alt="Modal Image" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
