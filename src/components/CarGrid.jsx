import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const CarGrid = ({ cars, onSelectCar }) => {
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  // Animation on component mount
  useEffect(() => {
    if (gridRef.current && cardRefs.current.length > 0) {
      // Animate the entire grid
      gsap.fromTo(gridRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
      
      // Animate individual cards with stagger
      gsap.fromTo(cardRefs.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2 }
      );
    }
  }, [cars]);

  return (
    <div className="car-grid" ref={gridRef}>
      {cars.map((car, index) => (
        <div
          key={car.id}
          ref={el => cardRefs.current[index] = el}
          className="car-card"
          onClick={() => onSelectCar(car)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectCar(car);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`View details for ${car.name}`}
        >
          <div className="car-card__image-container">
            <img 
              src={car.image} 
              alt={car.name} 
              className="car-card__image"
            />
            <div 
              className="car-card__color-accent"
              style={{ backgroundColor: car.color }}
            ></div>
          </div>
          
          <div className="car-card__content">
            <h3 className="car-card__name">{car.name}</h3>
            <p className="car-card__price">{car.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarGrid;