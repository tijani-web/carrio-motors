import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Specs = ({ car, previousCar }) => {
  const specRefs = useRef([]);

  useEffect(() => {
    if (previousCar) {
      // Animate specs when car changes
      specRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, delay: index * 0.1 }
          );
        }
      });
    }
  }, [car, previousCar]);

  const specs = [
    { label: 'Top Speed', value: car.topSpeed, icon: '🚀' },
    { label: 'Acceleration', value: car.acceleration, icon: '⚡' },
    { label: 'Horsepower', value: car.horsepower, icon: '🐎' },
    { label: 'Range', value: car.range, icon: '🔋' }
  ];

  return (
    <div className="specs">
      <h2 className="specs__title">Performance Specs</h2>
      <div className="specs__container">
        {specs.map((spec, index) => (
          <div 
            key={spec.label}
            className="specs__item"
            ref={el => specRefs.current[index] = el}
          >
            <div className="specs__icon">{spec.icon}</div>
            <div className="specs__content">
              <span className="specs__label">{spec.label}</span>
              <span className="specs__value">{spec.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specs;