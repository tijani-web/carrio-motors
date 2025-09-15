import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MainCar = ({ car, previousCar }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (previousCar) {
      // Animate car transition
      const tl = gsap.timeline();
      
      tl.to(imageRef.current, {
        opacity: 0,
        x: -100,
        duration: 0.4,
        ease: 'power2.in'
      }).set(imageRef.current, {
        backgroundImage: `url(${car.image})`
      }).to(imageRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [car, previousCar]);

  return (
    <div className="main-car">
      <div 
        ref={imageRef}
        className="main-car__image"
        style={{ backgroundImage: `url(${car.image})` }}
      >
        <div className="main-car__overlay">
          <h2 className="main-car__name">{car.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default MainCar;