import Head from "next/head";
import Link from "next/link";
import { LuMedal } from "react-icons/lu";
import Spinner from "@/components/Spinner";
import { BiDownload } from "react-icons/bi";
import { useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { PiGraduationCap } from "react-icons/pi";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { FaCalendarDays, FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6";

export default function Home() {

  // active services background color
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHover = (index) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0); // set the first item as active when mouse leave
  };

  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, blogsResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blogs')
        ])

        const projectData = await projectResponse.json();
        const blogsData = await blogsResponse.json();

        setAlldata(projectData);
        // setAllwork(blogsData);
        setAllwork(blogsData.filter(blog => blog.status === 'publish'));

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    // filter project by select category
    if (selectedCategory === 'All') {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
    } else {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0] === selectedCategory));
    }
  }, [selectedCategory, alldata])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

  // function to format the date as '23 may 2025 10:10 pm'
  const formatDate = (date) => {
    // check if date if valid
    if (!date || isNaN(date)) {
      return ''; // or handle the error as needed
    }

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour12: true // use 12-hour format
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  // services data
  const services = [
    {
      title: "Web Development",
      description: "I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need."
    },
    {
      title: "Mobile Development",
      description: "Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development."
    },
    {
      title: "Digital Marketing(SEO)",
      description: "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers."
    },
    {
      title: "Content Creator",
      description: "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content."
    }
  ];




  return (
    <>
      <Head>
        <title>ToeyJira - Portfolio</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x='50%' y='50%' text-anchor='middle' className="animate-stroke">HI</text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos='fade-right'>I am ToeyJira</span>
              <h1 className="hero_title" data-aos='fade-right'>Web Developer + <br /><span className="typed-text">UX Designer</span></h1>
              <div className="hero_img_box heroimgbox" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                <img src="/img/me.jpg" alt="coder" />
              </div>
              <div className="lead" data-aos='fade-up'>I break down complex user experience problems to create integrity focussed solutions that connect billions of people</div>
              <div className="hero_btn_box" data-aos='fade-up'>
                <Link href='/' download={'/img/CV.pdf'} className='download_cv'>Download CV <BiDownload /></Link>
                <ul className="hero_social">
                  <li><a href="/"><FaFacebook /></a></li>
                  <li><a href="/"><FaTwitter /></a></li>
                  <li><a href="/"><FaInstagram /></a></li>
                  <li><a href="/"><GrLinkedinOption /></a></li>
                  <li><a href="/"><FaGithub /></a></li>
                </ul>
              </div>
            </div>
            {/* rightside image section */}
            <div className="heroimageright">
              <div className="hero_img_box" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                <img src="/img/me.jpg" alt="coder" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item">
              <h3>7+</h3>
              <h4>Years of <br />Experience</h4>
            </div>
            <div className="funfect_item">
              <h3>20+</h3>
              <h4>Projects <br />Completed</h4>
            </div>
            <div className="funfect_item">
              <h3>12</h3>
              <h4>OpenSource <br />Library</h4>
            </div>
            <div className="funfect_item">
              <h3>20+</h3>
              <h4>Happy <br />Customers</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2>My Quality Services</h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
          </div>
          <div className="services_menu">
            {services.map((service, index) => (
              <div key={index} className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
                onMouseOver={() => handleHover(index)}
                onMouseOut={handleMouseOut}>
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container">
          <div className="project_titles">
            <h2>My Recent Works</h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
          </div>
          <div className="project_buttons">
            <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setSelectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Website Development' ? 'active' : ''} onClick={() => setSelectedCategory('Website Development')}>Website</button>
            <button className={selectedCategory === 'App Development' ? 'active' : ''} onClick={() => setSelectedCategory('App Development')}>Apps</button>
            <button className={selectedCategory === 'E-commerce Site' ? 'active' : ''} onClick={() => setSelectedCategory('E-commerce Site')}>Digital</button>
            <button className={selectedCategory === 'Performance Evaluation' ? 'active' : ''} onClick={() => setSelectedCategory('Performance Evaluation')}>Content</button>
          </div>
          <div className="projects_cards">
            {loading ? <div className="flex flex-center wh_50"><Spinner /></div> : (
              filteredProjects.length === 0 ? (<h1>No Project Found</h1>) : (
                filteredProjects.slice(0, 4).map((pro) => (
                  <Link href='/' key={pro._id} className="procard">
                    <div className="proimgbox">
                      <img src={pro.images[0]} alt={pro.title} />
                    </div>
                    <div className="procontentbox">
                      <h2>{pro.title}</h2>
                      <GoArrowUpRight />
                    </div>
                  </Link>
                ))
              )
            )}
          </div>
        </div>
      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          <div className="experience">
            <div className="experience_title flex gap-1">
              <LuMedal />
              <h2>My Experience</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card">
                <span>2020 - Present</span>
                <h3>COMPANY NAME</h3>
                <p>Full Stack Developer (Internship)</p>
              </div>
              <div className="exper_card">
                <span>2018 - 2020</span>
                <h3>COMPANY NAME</h3>
                <p>Mobile Developer</p>
              </div>
              <div className="exper_card">
                <span>2015 - 2018</span>
                <h3>COMPANY NAME</h3>
                <p>Backend Mobile Developer</p>
              </div>
            </div>
          </div>
          <div className="education">
            <div className="experience_title flex gap-1">
              <PiGraduationCap />
              <h2>My Education</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card">
                <span>2021 - 2024</span>
                <h3>Walailak University</h3>
                <p>Bachelor of Science Program in Information Technology and Digital Innovation (GPAX 3.80)</p>
              </div>
              <div className="exper_card">
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
            <h2>My Skills</h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
          </div>
          <div className="myskills_cards">
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="python" />
                <h3>92%</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/firebase.svg" alt="firebase" />
                <h3>80%</h3>
              </div>
              <p className="text-center">Firebase</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/mongodb.svg" alt="mongodb" />
                <h3>98%</h3>
              </div>
              <p className="text-center">MongoDB</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/redux.svg" alt="redux" />
                <h3>85%</h3>
              </div>
              <p className="text-center">Redux</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/react.svg" alt="react" />
                <h3>99%</h3>
              </div>
              <p className="text-center">React</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/js.svg" alt="javascript" />
                <h3>99%</h3>
              </div>
              <p className="text-center">JavaScript</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2>Recent Blogs</h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
          </div>
          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return <Link href={`/blogs/${blog.slug}`} key={blog._id} className="re_blog">
                <div className="re_blogimg">
                  <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} />
                  <span>{blog.blogcategory[0]}</span>
                </div>
                <div className="re_bloginfo">
                  <div className="re_topdate flex gap-1">
                    <div className="res_date">
                      <FaCalendarDays /> <span>{formatDate(new Date(blog.createdAt))}</span>
                    </div>
                  </div>
                  <h2>{blog.title}</h2>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>

    </>
  );
}
