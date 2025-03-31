// pages/projects/index.js

import Head from "next/head";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import useFetchData from "@/hooks/useFetchData";

export default function projects() {
  // fetch blog data
  const { alldata, loading } = useFetchData("/api/projects");

  const publisheddata = alldata.filter((ab) => ab.status === "publish");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    // filter project by select category
    if (selectedCategory === "All") {
      setFilteredProjects(alldata.filter((pro) => pro.status === "publish"));
    } else {
      setFilteredProjects(
        alldata.filter(
          (pro) =>
            pro.status === "publish" &&
            pro.projectcategory.includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory, alldata]);

  return (
    <>
      <Head>
        <title>Projects | PORTFOLIO</title>
        <meta
          name="description"
          content="Jirakit Aiadhet - Personal Portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="projectpage">
        <div className="projects">
          <div className="container">
            <div className="project_titles">
              <h2 data-aos="fade-up">My Recent Projects</h2>
              <p data-aos="fade-up">
                Explore how I turn ideas into high-performance, user-centric
                digital experiences with cutting-edge web and mobile solutions.
              </p>
            </div>
            <div className="project_buttons" data-aos="fade-up">
              <button
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </button>
              <button
                className={selectedCategory === "Web" ? "active" : ""}
                onClick={() => setSelectedCategory("Web")}
              >
                Website
              </button>
              <button
                className={selectedCategory === "App" ? "active" : ""}
                onClick={() => setSelectedCategory("App")}
              >
                Apps
              </button>
              <button
                className={selectedCategory === "Game" ? "active" : ""}
                onClick={() => setSelectedCategory("Game")}
              >
                Game
              </button>
              <button
                className={selectedCategory === "ML" ? "active" : ""}
                onClick={() => setSelectedCategory("ML")}
              >
                ML & AI
              </button>
              <button
                className={selectedCategory === "CyberSec" ? "active" : ""}
                onClick={() => setSelectedCategory("CyberSec")}
              >
                CyberSec
              </button>
            </div>
            <div className="projects_cards">
              {loading ? (
                <div className="flex flex-center wh_50">
                  <Spinner />
                </div>
              ) : filteredProjects.length === 0 ? (
                <h1>No Project Found</h1>
              ) : (
                filteredProjects.map((pro) => (
                  <Link
                    href={`/projects/${pro.slug}`}
                    key={pro._id}
                    className="procard"
                    data-aos="flip-left"
                  >
                    <div className="proimgbox">
                      <img src={pro.images[0]} alt={pro.slug} />
                    </div>
                    <div className="procontentbox">
                      <h2>{pro.title}</h2>
                      <GoArrowUpRight />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
