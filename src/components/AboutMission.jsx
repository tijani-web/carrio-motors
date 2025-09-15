import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AboutPage.css';

const AboutMission = React.forwardRef((props, ref) => {
  const textRefs = useRef([]);

  useEffect(() => {
    // Stagger animation for mission text
    gsap.fromTo(textRefs.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        scrollTrigger: {
          trigger: textRefs.current[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section className="about-mission about-section" ref={ref}>
      <h2 className="section-title">Our Mission</h2>
      <div className="about-mission__content">
        <p 
          className="about-mission__text" 
          ref={el => textRefs.current[0] = el}
        >
          Carrio Motors is one of the fastest-growing dealerships in the country. We are committed to delivering customer-first experiences with discipline, focus, and speed.
        </p>
        <p 
          className="about-mission__text" 
          ref={el => textRefs.current[1] = el}
        >
          Our showrooms span over 8,000 sq.ft. each, strategically located to make premium vehicles and trusted aftersales care accessible to everyone.
        </p>
        <p 
          className="about-mission__text" 
          ref={el => textRefs.current[2] = el}
        >
          We proudly represent global brands such as BMW, Audi, Hyundai, Jeep, Suzuki, Kia, and Morris Garage, offering customers choice without compromise.
        </p>
      </div>
    </section>
  );
});

export default AboutMission;