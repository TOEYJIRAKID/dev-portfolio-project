import Head from "next/head";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6";

export default function Home() {



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
        <title>ToeyJira - Personal Portfolio</title>
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
              <span className="hero_sb_title">I am ToeyJira</span>
              <h1 className="hero_title">Web Developer + <br /><span className="typed-text">UX Designer</span></h1>
              <div className="hero_img_box heroimgbox">
                <img src="/img/me.jpg" alt="coder" />
              </div>
              <div className="lead">I break down complex user experience problems to create integrity focussed solutions that connect billions of people</div>
              <div className="hero_btn_box">
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
              <div className="hero_img_box">
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

      </section>

      {/* Projects */}
      <section className="projects">

      </section>

      {/* Experience study */}
      <section className="exstudy">

      </section>

      {/* My Skills */}
      <section className="myskills">

      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">

      </section>

    </>
  );
}
