// GallerySection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import galleryCars from '../constant/Gallery';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const GallerySection = ({ theme = 'dark' }) => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!galleryCars.length) return;

    // Set theme class on section
    if (sectionRef.current) {
      sectionRef.current.className = `gallery-section ${theme}-theme`;
    }

    // Animation for cards when they enter viewport
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(card, 
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [galleryCars, theme]);

  if (!galleryCars.length) {
    return <div className="gallery-section">No cars available</div>;
  }

  return (
    <section className="gallery-section" ref={sectionRef} id='Gallery'>
      <div className="gallery-container">
        <h2 className="gallery-title">Premium Collection Gallery</h2>
        <p className="gallery-subtitle">Explore our exceptional fleet</p>
        
        <div className="gallery-grid">
          {galleryCars.map((car, index) => (
            <div 
              key={car.id}
              className="gallery-card"
              ref={el => cardRefs.current[index] = el}
              style={{ '--car-color': car.color }}
            >
              <div className="card-image">
                <img src={car.image} alt={`${car.brand} ${car.name}`} />
                <div className="card-overlay">
                  <button className="view-details-btn">Fake Btn</button>
                </div>
              </div>
              <div className="card-content">
                <span className="car-brand">{car.brand}</span>
                <h3 className="car-name">{car.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;