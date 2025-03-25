import { PiStarFourFill } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";

const words = [
  "Performant",
  "Accessible",
  "Secure",
  "Interactive",
  "Scalable",
  "User Friendly",
  "Responsive",
  "Maintainable",
  "Search Optimized",
  "Usable",
  "Reliable",
];

export const TapeSection = () => {
  const tapeContentRef = useRef(null);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const tapeContent = tapeContentRef.current;
    if (!tapeContent) return;

    const scrollWidth = tapeContent.scrollWidth;

    // Create a responsive animation with better timing
    const setupAnimation = () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }

      // Calculate the duration based on viewport width for responsive speed
      const viewportWidth = window.innerWidth;
      const baseDuration = scrollWidth / 75; // Base speed
      const responsiveDuration = Math.max(
        baseDuration * (1000 / viewportWidth),
        15
      );

      // Create a new animation with improved timing
      const newAnimation = tapeContent.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(-${scrollWidth / 2}px)` },
        ],
        {
          duration: responsiveDuration * 1000, // Convert to milliseconds
          iterations: Infinity,
          easing: "linear",
        }
      );

      // Store the animation in the ref
      animationRef.current = newAnimation;
    };

    setupAnimation();

    // Add resize event listener to adjust animation speed on window resize
    const handleResize = () => {
      setupAnimation();
    };

    window.addEventListener("resize", handleResize);

    // Clean up the animation and event listener when the component unmounts
    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`tape-section ${isVisible ? "tape-visible" : ""}`}>
      {/* Background Tape with improved gradient */}
      <div className="background-tape">
        <div className="background-tape-mask">
          <div className="background-tape-content"></div>
        </div>
      </div>

      {/* Main Tape with glassmorphism effect */}
      <div className="tape-gradient">
        <div className="tape-mask">
          <div className="tape-content" ref={tapeContentRef}>
            {/* Duplicate the content to create a seamless loop */}
            <div className="tape-content-inner">
              {words.map((word, index) => (
                <div key={`${word}-1-${index}`} className="word-container">
                  <PiStarFourFill className="star-icon" size={16} />
                  <span className="word-text">{word}</span>
                </div>
              ))}
            </div>
            <div className="tape-content-inner">
              {words.map((word, index) => (
                <div key={`${word}-2-${index}`} className="word-container">
                  <PiStarFourFill className="star-icon" size={16} />
                  <span className="word-text">{word}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapeSection;
