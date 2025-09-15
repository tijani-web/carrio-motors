import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { warrantyData } from '../constant/warranty';

const WarrantySection = () => {
  const [selectedBrand, setSelectedBrand] = useState(0);
  const warrantyCardRef = useRef(null);
  const coverageListRef = useRef(null);
  const brandButtonsRef = useRef([]);

  useEffect(() => {
    // Prevent blank flash: set visible instantly, then animate
    gsap.set(warrantyCardRef.current, { opacity: 1, y: 0 });
    gsap.fromTo(
      warrantyCardRef.current,
      { y: 50, opacity: 0 },
      { duration: 0.8, y: 0, opacity: 1, ease: "power3.out" }
    );
  }, []);

  const handleBrandChange = (index) => {
    const tl = gsap.timeline();

    tl.to(warrantyCardRef.current, {
      duration: 0.3,
      y: 20,
      opacity: 0,
      ease: "power1.inOut"
    }).call(() => {
      setSelectedBrand(index);

      brandButtonsRef.current.forEach((btn, i) => {
        if (btn) {
          gsap.to(btn, {
            backgroundColor: i === index ? "#2c3e50" : "white",
            color: i === index ? "white" : "#34495e",
            duration: 0.3
          });
        }
      });
    }).to(warrantyCardRef.current, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power2.out"
    });

    if (coverageListRef.current) {
      gsap.fromTo(
        coverageListRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, delay: 0.5 }
      );
    }
  };

  return (
    <section className="warranty-section" id='warranty'>
      <div className="warranty-container">
        <h2 className="warranty-title">Brand Warranty Information</h2>
        <p className="warranty-subtitle">
          Compare comprehensive warranty coverage across our premium brands
        </p>

        {/* Brand Selection */}
        <div className="brand-selector">
          {warrantyData.map((brand, index) => (
            <button
              key={index}
              ref={(el) => (brandButtonsRef.current[index] = el)}
              className={`brand-btn ${selectedBrand === index ? "active" : ""}`}
              onClick={() => handleBrandChange(index)}
            >
              {brand.brand}
            </button>
          ))}
        </div>

        {/* Warranty Display */}
        <div className="warranty-card" ref={warrantyCardRef}>
          <div className="warranty-header">
            <div className="brand-badge">
              <h3 className="brand-name">{warrantyData[selectedBrand].brand}</h3>
            </div>
            <p className="warranty-duration">
              {warrantyData[selectedBrand].warranty}
            </p>
          </div>

          <div className="coverage-section">
            <h4 className="coverage-title">Comprehensive Coverage Includes:</h4>
            <ul className="coverage-list" ref={coverageListRef}>
              {warrantyData[selectedBrand].coverage.map((item, index) => (
                <li key={index} className="coverage-item">
                  <span className="checkmark">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarrantySection;
