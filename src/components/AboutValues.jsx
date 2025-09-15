import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AboutPage.css';

const AboutValues = React.forwardRef((props, ref) => {
  const cardRefs = useRef([]);

  useEffect(() => {
    // Stagger animation for value cards
    gsap.fromTo(cardRefs.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardRefs.current[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const values = [
    {
      title: "Discipline",
      description: "Standardized processes ensure consistent quality."
    },
    {
      title: "Focus",
      description: "Personalized attention for every customer's needs."
    },
    {
      title: "Speed",
      description: "Quick service turnaround and finance approvals."
    },
    {
      title: "Transparency",
      description: "Clear pricing and warranty details."
    },
    {
      title: "Innovation",
      description: "Using technology to simplify car ownership."
    }
  ];

  return (
    <section className="about-values about-section" ref={ref}>
      <h2 className="section-title">Our Core Values</h2>
      <div className="about-values__grid">
        {values.map((value, index) => (
          <div 
            key={index}
            className="about-values__card"
            ref={el => cardRefs.current[index] = el}
          >
            <h3 className="about-values__title">{value.title}</h3>
            <p className="about-values__description">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

export default AboutValues;