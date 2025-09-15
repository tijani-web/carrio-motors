import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { financeData } from '../constant/Finance';

const CarFinancing = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const cardRef = useRef(null);

  // Initialize with first available option
  useEffect(() => {
    if (financeData.length > 0) {
      const firstBrand = financeData[0].brand;
      setSelectedBrand(firstBrand);
      
      const brandModels = financeData.filter(item => item.brand === firstBrand);
      setAvailableModels([...new Set(brandModels.map(item => item.model))]);
      
      if (brandModels.length > 0) {
        setSelectedModel(brandModels[0].model);
        setSelectedScheme(brandModels[0]);
      }
    }
  }, []);

  // Handle brand selection
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    
    const brandModels = financeData.filter(item => item.brand === brand);
    setAvailableModels([...new Set(brandModels.map(item => item.model))]);
    
    if (brandModels.length > 0) {
      setSelectedModel(brandModels[0].model);
      setSelectedScheme(brandModels[0]);
    } else {
      setSelectedModel('');
      setSelectedScheme(null);
    }
  };

  // Handle model selection
  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    
    const scheme = financeData.find(
      item => item.brand === selectedBrand && item.model === model
    );
    
    if (scheme) {
      // Animate out
      gsap.to(cardRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          setSelectedScheme(scheme);
          // Animate in
          gsap.to(cardRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4
          });
        }
      });
    } else {
      setSelectedScheme(null);
    }
  };

  // Get unique brands from data
  const brands = [...new Set(financeData.map(item => item.brand))];

  return (
    <section className="financing-section">
      <div className="financing-container">
        <h2 className="financing-title">Car Financing Options</h2>
        <p className="financing-subtitle">
          Explore our competitive financing plans for your dream car
        </p>
        
        <div className="financing-controls">
          <div className="select-group">
            <label htmlFor="brand-select" className="select-label">
              Select Brand
            </label>
            <select
              id="brand-select"
              className="brand-select"
              value={selectedBrand}
              onChange={handleBrandChange}
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          
          <div className="select-group">
            <label htmlFor="model-select" className="select-label">
              Select Model
            </label>
            <select
              id="model-select"
              className="model-select"
              value={selectedModel}
              onChange={handleModelChange}
              disabled={availableModels.length === 0}
            >
              {availableModels.map(model => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="finance-card" ref={cardRef}>
          {selectedScheme ? (
            <>
              <div className="card-header">
                <h3 className="car-name">
                  {selectedScheme.brand} {selectedScheme.model}
                </h3>
                <div className="price-tag">
                  ${selectedScheme.vehiclePriceUsd.toLocaleString()}
                </div>
              </div>
              
              <div className="card-content">
                <div className="finance-detail">
                  <span className="detail-label">APR</span>
                  <span className="detail-value highlight">
                    {selectedScheme.aprPercent}%
                  </span>
                </div>
                
                <div className="finance-detail">
                  <span className="detail-label">Loan Tenure</span>
                  <span className="detail-value">
                    {selectedScheme.tenureMonths} months
                  </span>
                </div>
                
                <div className="finance-detail">
                  <span className="detail-label">Down Payment</span>
                  <span className="detail-value">
                    ${selectedScheme.downPaymentUsd.toLocaleString()} (
                    {Math.round((selectedScheme.downPaymentUsd / selectedScheme.vehiclePriceUsd) * 100)}%)
                  </span>
                </div>
                
                <div className="finance-detail emphasized">
                  <span className="detail-label">Monthly Installment</span>
                  <span className="detail-value">
                    ${selectedScheme.monthlyInstallmentUsd.toLocaleString()}
                  </span>
                </div>
              </div>
              
            </>
          ) : (
            <div className="no-data-message">
              <p>Select a car model to view financing options</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarFinancing;