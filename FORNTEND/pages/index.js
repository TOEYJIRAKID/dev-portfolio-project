// pages/index.js

import Head from "next/head";
import Link from "next/link";
import Typed from "typed.js";
import { LuMedal } from "react-icons/lu";
import Spinner from "@/components/Spinner";
import { BiDownload } from "react-icons/bi";
import TapeSection from "@/components/Tape";
import skillData from "@/components/SkillData";
import { GoArrowUpRight } from "react-icons/go";
import { PiGraduationCap } from "react-icons/pi";
import { GrLinkedinOption } from "react-icons/gr";
import SkillSlider from "@/components/SkillSlider";
import { useState, useEffect, useRef } from "react";
import ServicesAccordion from "@/components/Accordion";
import {
  FaCalendarDays,
  FaFacebook,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, blogsResponse] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/blogs"),
        ]);

        const projectData = await projectResponse.json();
        const blogsData = await blogsResponse.json();

        setAlldata(projectData);
        // setAllwork(blogsData);
        setAllwork(blogsData.filter((blog) => blog.status === "publish"));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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

  // Typed.js implementation
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Full Stack Dev", "Backend Dev", "Mobile App Dev"], // Add your desired text here
      startDelay: 500, // slightly increase start delay
      typeSpeed: 70, // increase typing speed slightly for natural effect
      backSpeed: 40, // decrease backspeed slightly for natural effect
      backDelay: 1200, // give it longer to read before deleting
      smartBackspace: true,
      loop: true,
      showCursor: true,
    });

    // Destroy Typed instance on unmounting to prevent memory leaks
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      {/* header */}
      <Head>
        <title>TOEYJIRA | PORTFOLIO</title>
        <meta
          name="description"
          content="Jirakit Aiadhet - Personal Portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              className="animate-stroke"
            >
              สวัสดี
            </text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos="fade-right">
                I AM TOEYJIRA
              </span>
              <h1 className="hero_title" data-aos="fade-right">
                Web Developer + <br />
                <span ref={el} className="typed-text"></span>
              </h1>
              <div
                className="hero_img_box heroimgbox"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <img src="/img/me.png" alt="developer" />
              </div>
              <div className="lead" data-aos="fade-up">
                I specialize in developing practical and high-performance web
                applications. Let’s discuss your next project
              </div>
              <div className="hero_btn_box" data-aos="fade-up">
                <Link
                  href="https://drive.google.com/file/d/15q-qOtlov-qq69oddgraGPTsVgem1QO6/view?usp=sharing"
                  target="_blank"
                  className="download_cv"
                >
                  Download CV <BiDownload />
                </Link>
                <ul className="hero_social">
                  <li>
                    <a
                      href="https://www.facebook.com/discokatto"
                      target="_blank"
                    >
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/canyoucallinamo" target="_blank">
                      <FaXTwitter />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/toeyjirakid/"
                      target="_blank"
                    >
                      <GrLinkedinOption />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/TOEYJIRAKID" target="_blank">
                      <FaGithub />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* rightside image section */}
            <div className="heroimageright">
              <div
                className="hero_img_box"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <img src="/img/me.png" alt="developer" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos="fade-right">
              <h3>3+</h3>
              <h4>
                Years of Coding
                <br />
                Experience
              </h4>
            </div>
            <div className="funfect_item" data-aos="fade-right">
              <h3>10+</h3>
              <h4>
                Personal & Work
                <br />
                Projects
              </h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>30+</h3>
              <h4>
                Tech Stacks <br />
                Explored
              </h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>100%</h3>
              <h4>
                Passion for
                <br />
                Development
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Tape Section */}
      <TapeSection />

      {/* Services */}
      <ServicesAccordion />

      {/* Projects */}
      <section className="projects">
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
            <button
              className={selectedCategory === "IoT" ? "active" : ""}
              onClick={() => setSelectedCategory("IoT")}
            >
              IoT
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
              filteredProjects.slice(0, 4).map((pro) => (
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
      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          <div className="experience">
            <div className="experience_title flex gap-1" data-aos="fade-right">
              <LuMedal />
              <h2>My Experience</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card" data-aos="fade-up">
                <span>2024 - 2024 (8 months)</span>
                <h3>APP INTOUCH COMPANY LIMITED</h3>
                <p>Full Stack Developer (Internship)</p>
              </div>
            </div>
          </div>
          <div className="education">
            <div className="experience_title flex gap-1" data-aos="fade-left">
              <PiGraduationCap />
              <h2>My Education</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card" data-aos="fade-up">
                <span>2021 - 2024</span>
                <h3>Walailak University</h3>
                <p>
                  Bachelor of Science Program in Information Technology and
                  Digital Innovation (GPAX 3.80)
                </p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>2018 - 2020</span>
                <h3>Rattaphumwittaya School</h3>
                <p>English-Mathematics Program (GPAX 3.52)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title">
            <h2 data-aos="fade-up">My Skills</h2>
            <p data-aos="fade-up">
              Explore the technologies and tools I use to craft exceptional
              digital experiences.
            </p>
          </div>
          <SkillSlider skills={skillData} />
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2 data-aos="fade-up">Recent Blogs</h2>
            <p data-aos="fade-up">
              Explore insightful articles on coding, software development, and
              industry trends, helping you stay updated and inspired.
            </p>
          </div>
          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return (
                <Link
                  href={`/blogs/${blog.slug}`}
                  key={blog._id}
                  className="re_blog"
                  data-aos="flip-left"
                >
                  <div className="re_blogimg">
                    <img
                      src={blog.images[0] || "/img/noimage.png"}
                      alt={blog.slug}
                    />
                    <span>
                      {blog.blogcategory[0] === "ML"
                        ? "Machine Learning & AI"
                        : blog.blogcategory[0] === "Web"
                        ? "Web Development"
                        : blog.blogcategory[0] === "App"
                        ? "App Development"
                        : blog.blogcategory[0] === "Game"
                        ? "Game Development"
                        : blog.blogcategory[0]}
                    </span>
                  </div>
                  <div className="re_bloginfo">
                    <div className="re_topdate flex gap-1">
                      <div className="res_date">
                        <FaCalendarDays />{" "}
                        <span>{formatDate(new Date(blog.createdAt))}</span>
                      </div>
                    </div>
                    <h2>{blog.title}</h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
