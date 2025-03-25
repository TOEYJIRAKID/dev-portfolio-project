// components/Accordion.js

import { useState } from "react";
import { GoChevronRight } from "react-icons/go";
import { TapeSection } from "@/components/Tape";

export default function ServicesAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // services data
  const services = [
    {
      title: "Web Development",
      description:
        "I provide professional web development services, creating high-performance, SEO-optimized, and responsive websites to help businesses grow and stand out online.",
    },
    {
      title: "App Development",
      description:
        "Experienced mobile app developer specializing in iOS, Android, and cross-platform development. I build fast, scalable, and user-friendly mobile applications to enhance user engagement.",
    },
    {
      title: "Machine Learning",
      description:
        "Skilled Machine Learning Engineer with expertise in AI-driven solutions, predictive analytics, and deep learning. I develop intelligent, data-driven applications to optimize business performance.",
    },
  ];

  return (
    <section className="services">
      {/* Tape Section */}
      <TapeSection />
      <div className="container">
        <div className="services_titles">
          <h2 data-aos="fade-up">My Quality Services</h2>
          <p data-aos="fade-up">
            I transform your ideas into high-performance, SEO-friendly web
            solutions that captivate both you and your users.
          </p>
        </div>
        <div className="services_accordion" data-aos="fade-up">
          {services.map((service, index) => (
            <div
              key={index}
              className={`accordion_item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div
                className="accordion_header"
                onClick={() => toggleAccordion(index)}
              >
                <div className="accordion_left">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="accordion_icon">
                  <GoChevronRight />
                </div>
              </div>
              <div
                className={`accordion_content ${
                  activeIndex === index ? "show" : ""
                }`}
              >
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
