import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AboutPage.css';

const AboutHero = React.forwardRef((props, ref) => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  useEffect(() => {
    // Hero text animation
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    );
    
    gsap.fromTo(subheadingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
    );
  }, []);

  return (
    <section className="about-hero" ref={ref}>
      <div className="about-hero__content">
        <h1 className="about-hero__heading" ref={headingRef}>
          Driven by Excellence — Built for People
        </h1>
        <p className="about-hero__subheading" ref={subheadingRef}>
          Delivering premium cars and world-class service across the country.
        </p>
      </div>
    </section>
  );
});

export default AboutHero;