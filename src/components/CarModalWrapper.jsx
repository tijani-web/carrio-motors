import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { carModalData } from '../constant/CarModelData';
import CarGrid from './CarGrid';
import CarModal from './CarModal';
import './CarModalWrapper.css';

const CarModalWrapper = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Handle opening modal with selected car
  const handleOpenModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Animate page content on load
  useEffect(() => {
    if (wrapperRef.current) {
      gsap.fromTo(wrapperRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div className="car-modal-wrapper" ref={wrapperRef}>
      <header className="wrapper-header">
        <h1>Premium Car Collection</h1>
        <p>Discover our exclusive range of high-performance vehicles</p>
      </header>

      <main className="wrapper-main">
        <CarGrid 
          cars={carModalData} 
          onSelectCar={handleOpenModal} 
        />
      </main>

      {isModalOpen && (
        <CarModal 
          car={selectedCar} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default CarModalWrapper;