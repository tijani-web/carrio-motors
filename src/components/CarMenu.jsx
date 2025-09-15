import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CarMenu = ({ cars, selectedCar, onCarSelect }) => {
  const menuItemRefs = useRef([]);

  useEffect(() => {
    // Animate menu items on load
    gsap.fromTo(menuItemRefs.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }
    );
  }, []);

  const handleHover = (index) => {
    const item = menuItemRefs.current[index];
    gsap.to(item, {
      color: '#3498db',
      duration: 0.2
    });
  };

  const handleHoverOut = (index) => {
    const item = menuItemRefs.current[index];
    if (cars[index].id !== selectedCar.id) {
      gsap.to(item, {
        color: '#bdc3c7',
        duration: 0.2
      });
    }
  };

  return (
    <div className="car-menu">
      <h3 className="car-menu__title">Models</h3>
      <ul className="car-menu__list">
        {cars.map((car, index) => (
          <li key={car.id} className="car-menu__item">
            <button
              ref={el => menuItemRefs.current[index] = el}
              className={`car-menu__button ${car.id === selectedCar.id ? 'car-menu__button--active' : ''}`}
              onClick={() => onCarSelect(car)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHoverOut(index)}
            >
              {car.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarMenu;