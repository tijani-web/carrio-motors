import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * FinanceFilterBar - Renders brand and model filters
 * @param {Object} props - Component props
 * @param {string[]} props.brands - Available brands
 * @param {string} props.selectedBrand - Currently selected brand
 * @param {Function} props.onSelectBrand - Callback when brand is selected
 * @param {string[]} props.models - Available models for selected brand
 * @param {string} props.selectedModel - Currently selected model
 * @param {Function} props.onSelectModel - Callback when model is selected
 * @returns {JSX.Element} Filter bar component
 */
const FinanceFilterBar = ({
  brands,
  selectedBrand,
  onSelectBrand,
  models,
  selectedModel,
  onSelectModel
}) => {
  const filterBarRef = useRef(null);
  const brandButtonsRef = useRef([]);
  const modelSelectRef = useRef(null);

  // Animation on component mount
  useEffect(() => {
    if (filterBarRef.current) {
      gsap.fromTo(filterBarRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
      );
    }
  }, []);

  // Animation when brands change
  useEffect(() => {
    if (brandButtonsRef.current.length > 0) {
      gsap.fromTo(brandButtonsRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 }
      );
    }
  }, [brands]);

  // Handle keyboard navigation for brand buttons
  const handleBrandKeyDown = (e, brand, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectBrand(brand);
    } else if (e.key === 'ArrowRight' && index < brands.length - 1) {
      brandButtonsRef.current[index + 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      brandButtonsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="finance-filter-bar" ref={filterBarRef}>
      <div className="finance-filter-bar__brands">
        <h3 className="finance-filter-bar__label">Select Brand:</h3>
        <div 
          className="finance-filter-bar__brand-list"
          role="tablist"
          aria-label="Car brands"
        >
          {brands.map((brand, index) => (
            <button
              key={brand}
              ref={el => brandButtonsRef.current[index] = el}
              className={`finance-filter-bar__brand-btn ${selectedBrand === brand ? 'finance-filter-bar__brand-btn--active' : ''}`}
              onClick={() => onSelectBrand(brand)}
              onKeyDown={(e) => handleBrandKeyDown(e, brand, index)}
              role="tab"
              aria-selected={selectedBrand === brand}
              tabIndex={selectedBrand === brand ? 0 : -1}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
      
      <div className="finance-filter-bar__models">
        <label htmlFor="model-select" className="finance-filter-bar__label">
          Select Model:
        </label>
        <select
          id="model-select"
          ref={modelSelectRef}
          className="finance-filter-bar__model-select"
          value={selectedModel}
          onChange={(e) => onSelectModel(e.target.value)}
          aria-label="Select car model"
        >
          {models.map(model => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FinanceFilterBar;