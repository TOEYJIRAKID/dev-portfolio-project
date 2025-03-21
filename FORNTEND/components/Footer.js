// components/Footer.js

import Link from "next/link";
import { GrLinkedinOption } from "react-icons/gr";
import { FaFacebook, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footersec flex flex-center flex-col gap-2">
          {/* <div className="logo">
            <img src="/img/logo.ico" alt="" />
          </div> */}
          {/* <div className="ul flex gap-2">
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/services">Works</Link>
            </li>
            <li>
              <Link href="/services">Resume</Link>
            </li>
            <li>
              <Link href="/services">Skills</Link>
            </li>
            <li>
              <Link href="/services">Testimonials</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </div> */}
          <ul className="hero_social">
            <li>
              <a href="https://www.facebook.com/discokatto" target="_blank">
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
          <div className="copyrights">
            &copy; 2025 All Rights Reserved By{" "}
            <span>
              <a
                href="https://www.linkedin.com/in/toeyjirakid/"
                target="_blank"
                rel="noreferrer"
              >
                TOEYJIRA
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
