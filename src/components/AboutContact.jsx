import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AboutPage.css';

const AboutContact = React.forwardRef((props, ref) => {
  const contactRefs = useRef([]);

  useEffect(() => {
    // Stagger animation for contact items
    gsap.fromTo(contactRefs.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        scrollTrigger: {
          trigger: contactRefs.current[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section className="about-contact about-section" ref={ref}>
      <h2 className="section-title">Get In Touch</h2>
      <div className="about-contact__content">
        <div 
          className="about-contact__item"
          ref={el => contactRefs.current[0] = el}
        >
          <span className="about-contact__icon">📍</span>
          <p>123 Carrio Drive, Auto Park, YourCity</p>
        </div>
        <div 
          className="about-contact__item"
          ref={el => contactRefs.current[1] = el}
        >
          <span className="about-contact__icon">📧</span>
          <p>info@carriomotors.example</p>
        </div>
        <div 
          className="about-contact__item"
          ref={el => contactRefs.current[2] = el}
        >
          <span className="about-contact__icon">☎</span>
          <p>+1 (800) 555-0123</p>
        </div>
      </div>
    </section>
  );
});

export default AboutContact;