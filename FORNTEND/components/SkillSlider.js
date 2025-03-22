// components/SkillSlider.js

import React, { useRef, useEffect, useState } from "react";

const SkillSlider = ({ skills }) => {
  const [duplicatedSkills, setDuplicatedSkills] = useState([]);
  const sliderRef = useRef(null);

  // Create a duplicated list of skills to create the infinite loop effect
  useEffect(() => {
    if (skills && skills.length) {
      // Duplicate the skills array to create a seamless loop
      setDuplicatedSkills([...skills, ...skills]);
    }
  }, [skills]);

  // Check if the slider needs to reset its position to create infinite loop illusion
  useEffect(() => {
    const checkPosition = () => {
      if (!sliderRef.current) return;

      const slider = sliderRef.current;
      const animation = slider.getAnimations()[0];

      if (!animation) return;

      // Reset animation when progress is near complete to create seamless loop
      animation.onfinish = () => {
        slider.style.animation = "none";
        slider.offsetHeight; // Trigger reflow
        slider.style.animation = "scroll 200s linear infinite";
      };
    };

    checkPosition();

    return () => {
      if (sliderRef.current) {
        const slider = sliderRef.current;
        const animation = slider.getAnimations()[0];
        if (animation) {
          animation.onfinish = null;
        }
      }
    };
  }, [duplicatedSkills]);

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className="skill-slider-container">
      <div className="skill-track" ref={sliderRef}>
        {duplicatedSkills.map((skill, index) => (
          <div
            className="skill-item"
            key={`${skill.id}-${index}`}
            data-aos="flip-right"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2500"
          >
            <div className="skill-card">
              {" "}
              {/* Add a card div here */}
              <img
                src={skill.icon}
                alt={skill.name}
                className="skill-icon"
                loading="lazy"
                title={skill.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSlider;
