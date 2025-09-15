import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutHero from './AboutHero';
import AboutMission from './AboutMission';
import AboutValues from './AboutValues';
import AboutOffer from './AboutOffer';
import AboutContact from './AboutContact';
import './AboutPage.css';
import Layout from './Layout';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutWrapper = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Animate sections on scroll
    sectionRefs.current.forEach((section) => {
      if (section) {
        gsap.fromTo(section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });
  }, []);

  return (
   <Layout>
     <div className="about-page">
      <AboutHero ref={(el) => (sectionRefs.current[0] = el)} />
      <AboutMission ref={(el) => (sectionRefs.current[1] = el)} />
      <AboutValues ref={(el) => (sectionRefs.current[2] = el)} />
      <AboutOffer ref={(el) => (sectionRefs.current[3] = el)} />
      <AboutContact ref={(el) => (sectionRefs.current[4] = el)} />
    </div>
   </Layout>
  );
};

export default AboutWrapper;