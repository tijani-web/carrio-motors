import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import cars from '../constant/carrioHero';

const HeroSection = () => {
  const [activeCar, setActiveCar] = useState(cars[0]);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    if (!cars.length) return;

    // Set the accent color CSS variable
    document.documentElement.style.setProperty('--accent-color', activeCar.color);

    // Reset animations
    gsap.set([titleRef.current, taglineRef.current, imageRef.current, ...statsRef.current], {
      opacity: 0,
      y: 50
    });

    // Animate elements in
    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out"
    })
    .to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to(statsRef.current, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");

    return () => {
      // Clean up the CSS variable when component unmounts
      document.documentElement.style.removeProperty('--accent-color');
    };
  }, [activeCar, cars.length]);

  const handleCarChange = (car) => {
    if (car.id === activeCar.id) return;

    // Update the accent color immediately
    document.documentElement.style.setProperty('--accent-color', car.color);

    // Animate out
    const tl = gsap.timeline({
      onComplete: () => setActiveCar(car)
    });

    tl.to([titleRef.current, taglineRef.current], {
      opacity: 0,
      y: -50,
      duration: 0.6,
      ease: "power3.in"
    })
    .to(imageRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power3.in"
    }, 0)
    .to(statsRef.current, {
      opacity: 0,
      y: -30,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.in"
    }, 0);
  };

  if (!cars.length) {
    return <div className="hero-section">No cars available</div>;
  }

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-left">
          <h1 ref={titleRef} className="car-title">{activeCar.name}</h1>
          <p ref={taglineRef} className="car-tagline">{activeCar.tagline}</p>
          
          <div className="car-stats">
            <div ref={el => statsRef.current[0] = el} className="stat-item">
              <span className="stat-value">{activeCar.topSpeed}</span>
              <span className="stat-label">Top Speed</span>
            </div>
            <div ref={el => statsRef.current[1] = el} className="stat-item">
              <span className="stat-value">{activeCar.acceleration}</span>
              <span className="stat-label">Acceleration</span>
            </div>
            <div ref={el => statsRef.current[2] = el} className="stat-item">
              <span className="stat-value">{activeCar.range}</span>
              <span className="stat-label">Range</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img
            ref={imageRef}
            src={activeCar.image}
            alt={activeCar.name}
            className="car-image"
          />
        </div>
      </div>

      <div className="car-thumbnails">
        {cars.map((car) => (
          <div
            key={car.id}
            className={`thumbnail ${car.id === activeCar.id ? 'active' : ''}`}
            onClick={() => handleCarChange(car)}
            style={{ 
              borderColor: car.id === activeCar.id ? car.color : 'transparent',
              boxShadow: car.id === activeCar.id ? `0 0 15px ${car.color}40` : 'none'
            }}
          >
            <img src={car.image} alt={car.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;