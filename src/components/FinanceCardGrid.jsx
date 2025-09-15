import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { formatCurrency } from '../utils/financeMath';

/**
 * FinanceCardGrid - Displays finance schemes as cards
 * @param {Object} props - Component props
 * @param {Array} props.schemes - Array of scheme objects
 * @param {Function} props.onSelectScheme - Callback when a scheme is selected
 * @param {string} props.selectedSchemeId - ID of the currently selected scheme
 * @returns {JSX.Element} Card grid component
 */
const FinanceCardGrid = ({ schemes, onSelectScheme, selectedSchemeId }) => {
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  // Animation on component mount and when schemes change
  useEffect(() => {
    if (gridRef.current) {
      // Animate the entire grid
      gsap.fromTo(gridRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
      
      // Animate individual cards with stagger
      if (cardRefs.current.length > 0) {
        gsap.fromTo(cardRefs.current, 
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 }
        );
      }
    }
  }, [schemes]);

  // Handle keyboard navigation for cards
  const handleCardKeyDown = (e, schemeId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectScheme(schemeId);
    }
  };

  if (schemes.length === 0) {
    return (
      <div className="finance-card-grid" ref={gridRef}>
        <p className="finance-card-grid__empty">No financing schemes available for this model.</p>
      </div>
    );
  }

  return (
    <div className="finance-card-grid" ref={gridRef}>
      <h3 className="finance-card-grid__heading">Available Financing Plans</h3>
      
      <div className="finance-card-grid__container">
        {schemes.map((scheme, index) => (
          <div
            key={scheme.schemeId}
            ref={el => cardRefs.current[index] = el}
            className={`finance-card ${selectedSchemeId === scheme.schemeId ? 'finance-card--selected' : ''}`}
            onClick={() => onSelectScheme(scheme.schemeId)}
            onKeyDown={(e) => handleCardKeyDown(e, scheme.schemeId)}
            tabIndex={0}
            role="button"
            aria-label={`Select ${scheme.schemeId} financing plan`}
            aria-pressed={selectedSchemeId === scheme.schemeId}
          >
            <div className="finance-card__header">
              <h4 className="finance-card__title">{scheme.schemeId}</h4>
              {selectedSchemeId === scheme.schemeId && (
                <div className="finance-card__selected-badge">Selected</div>
              )}
            </div>
            
            <div className="finance-card__content">
              <div className="finance-card__detail">
                <span className="finance-card__label">Tenure</span>
                <span className="finance-card__value">{scheme.tenureMonths} months</span>
              </div>
              
              <div className="finance-card__detail">
                <span className="finance-card__label">APR</span>
                <span className="finance-card__value finance-card__value--highlight">
                  {scheme.aprPercent}%
                </span>
              </div>
              
              <div className="finance-card__detail">
                <span className="finance-card__label">Down Payment</span>
                <span className="finance-card__value">
                  {formatCurrency(scheme.downPaymentUsd)}
                </span>
              </div>
              
              <div className="finance-card__detail">
                <span className="finance-card__label">Monthly Payment</span>
                <span className="finance-card__value finance-card__value--emphasized">
                  {formatCurrency(scheme.monthlyInstallmentUsd)}
                </span>
              </div>
            </div>
            
            <button className="finance-card__cta">
              {selectedSchemeId === scheme.schemeId ? 'Selected' : 'Select'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceCardGrid;