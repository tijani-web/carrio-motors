import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const CarModal = ({ car, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  // Animation on component mount
  useEffect(() => {
    if (modalRef.current && overlayRef.current) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      
      // Create timeline for coordinated animations
      const tl = gsap.timeline();
      
      // Animate overlay
      tl.fromTo(overlayRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      
      // Animate modal
      tl.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" },
        "-=0.3"
      );
      
      return () => {
        // Re-enable scrolling when component unmounts
        document.body.style.overflow = 'auto';
      };
    }
  }, []);

  // Handle closing the modal with animation
  const handleClose = () => {
    if (modalRef.current && overlayRef.current) {
      const tl = gsap.timeline();
      
      // Animate modal out
      tl.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 0.4,
        ease: "power2.in"
      });
      
      // Animate overlay out
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: onClose
      }, "-=0.2");
    } else {
      onClose();
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  if (!car) return null;

  return (
    <>
      <div 
        className="modal-overlay" 
        ref={overlayRef}
        onClick={handleClose}
      ></div>
      
      <div 
        className="modal" 
        ref={modalRef}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <button 
          className="modal-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <div className="modal-content">
          <div className="modal-image-container">
            <img 
              src={car.image} 
              alt={car.name} 
              className="modal-image"
            />
            <div 
              className="modal-color-accent"
              style={{ backgroundColor: car.color }}
            ></div>
          </div>
          
          <div className="modal-details">
            <h2 id="modal-title" className="modal-title">{car.name}</h2>
            <p className="modal-price">{car.price}</p>
            
            <div className="modal-specs">
              <div className="spec-item">
                <span className="spec-label">Top Speed</span>
                <span className="spec-value">{car.topSpeed}</span>
              </div>
              
              <div className="spec-item">
                <span className="spec-label">Acceleration (0-60 mph)</span>
                <span className="spec-value">{car.acceleration}</span>
              </div>
              
              <div className="spec-item">
                <span className="spec-label">Horsepower</span>
                <span className="spec-value">{car.horsepower}</span>
              </div>
              
              <div className="spec-item">
                <span className="spec-label">Range</span>
                <span className="spec-value">{car.range}</span>
              </div>
              
              <div className="spec-item">
                <span className="spec-label">Dealer Location</span>
                <span className="spec-value">{car.dealerLocation}</span>
              </div>
            </div>
            
            <div className="modal-features">
              <h3 className="features-title">Key Features</h3>
              <ul className="features-list">
                {car.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarModal;