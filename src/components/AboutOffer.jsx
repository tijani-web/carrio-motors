import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AboutPage.css';

const AboutOffer = React.forwardRef((props, ref) => {
  const offerRefs = useRef([]);

  useEffect(() => {
    // Stagger animation for offer items
    gsap.fromTo(offerRefs.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: {
          trigger: offerRefs.current[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const offers = [
    "Wide range of global car brands",
    "Extensive showroom and service network",
    "Finance & warranty options tailored to every model",
    "A seamless and hassle-free ownership experience"
  ];

  return (
    <section className="about-offer about-section" ref={ref}>
      <h2 className="section-title">What We Offer</h2>
      <div className="about-offer__content">
        <ul className="about-offer__list">
          {offers.map((offer, index) => (
            <li 
              key={index}
              className="about-offer__item"
              ref={el => offerRefs.current[index] = el}
            >
              <span className="about-offer__icon">✓</span>
              {offer}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

export default AboutOffer;