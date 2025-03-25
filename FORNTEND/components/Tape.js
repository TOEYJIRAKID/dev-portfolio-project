// components/Tape.js

import { useEffect, useRef } from "react";
import { PiStarFourFill } from "react-icons/pi";

const words = [
  "Performant",
  "Accessible",
  "Secure",
  "Interactive",
  "Scalable",
  "User Friendly",
  "Responsive",
  "Maintainble",
  "Search Optimized",
  "Usable",
  "Reliable",
];

export const TapeSection = () => {
  const tapeContentRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const tapeContent = tapeContentRef.current;
    if (!tapeContent) return;

    const scrollWidth = tapeContent.scrollWidth;
    const clientWidth = tapeContent.clientWidth;

    // Calculate the duration based on the content width
    const duration = scrollWidth / 120; // Adjust the divisor for speed

    // Create a new animation
    const newAnimation = tapeContent.animate(
      [
        { transform: "translateX(0)" },
        { transform: `translateX(-${scrollWidth / 2}px)` },
      ],
      {
        duration: duration * 1000, // Convert to milliseconds
        iterations: Infinity,
        easing: "linear",
      }
    );

    // Store the animation in the ref
    animationRef.current = newAnimation;

    // Clean up the animation when the component unmounts
    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, []);

  return (
    <div className="tape-section">
      <div className="background-tape">
        <div className="background-tape-mask">
          <div className="background-tape-content"></div>
        </div>
      </div>
      <div className="tape-gradient">
        <div className="tape-mask">
          <div className="tape-content" ref={tapeContentRef}>
            {/* Duplicate the content to create a seamless loop */}
            <div className="tape-content-inner">
              {words.map((word) => (
                <div key={word} className="word-container">
                  <span className="word-text">{word}</span>
                  <PiStarFourFill />
                </div>
              ))}
            </div>
            <div className="tape-content-inner">
              {words.map((word) => (
                <div key={word} className="word-container">
                  <span className="word-text">{word}</span>
                  <PiStarFourFill />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
