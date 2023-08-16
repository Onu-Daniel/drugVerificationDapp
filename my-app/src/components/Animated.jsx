import React, { useEffect } from 'react';
import Typed from 'typed.js';

const AnimatedWriteUp = () => {
  useEffect(() => {
    const options = {
      strings: ["Ensure Authenticity with Every Dose", "Real-time Drug Verification for Your Safety"],
      typeSpeed: 50, // Typing speed in milliseconds
      backSpeed: 30, // Backspacing speed in milliseconds
      loop: true, 
    };

    const typed = new Typed('.typed-text', options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="animated-write-up">
      <div className="typed-text"></div>
    </div>
  );
};

export default AnimatedWriteUp;
