import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { financeData } from '../constant/Finance';
import FinanceFilterBar from './FinanceFilterBar';
import FinanceCardGrid from './FinanceCardGrid';
import FinanceSchemeDetails from './FinanceSchemeDetails';

/**
 * FinanceSection - Top-level container for the finance section
 * @returns {JSX.Element} Finance section component
 */
const FinanceSection = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSchemeId, setSelectedSchemeId] = useState(null);
  const [availableModels, setAvailableModels] = useState([]);
  const [availableSchemes, setAvailableSchemes] = useState([]);
  const sectionRef = useRef(null);

  // Extract unique brands from the data
  const brands = [...new Set(financeData.map(item => item.brand))];

  // Initialize with first brand and model
  useEffect(() => {
    if (financeData.length > 0) {
      const firstBrand = brands[0];
      setSelectedBrand(firstBrand);
      
      // Get models for the first brand
      const firstBrandModels = [...new Set(
        financeData
          .filter(item => item.brand === firstBrand)
          .map(item => item.model)
      )];
      
      if (firstBrandModels.length > 0) {
        const firstModel = firstBrandModels[0];
        setSelectedModel(firstModel);
        
        // Get schemes for the first brand and model
        const firstModelSchemes = financeData.filter(
          item => item.brand === firstBrand && item.model === firstModel
        );
        
        if (firstModelSchemes.length > 0) {
          setSelectedSchemeId(firstModelSchemes[0].schemeId);
        }
      }
    }
  }, []);

  // Update available models when brand changes
  useEffect(() => {
    if (selectedBrand) {
      const models = [...new Set(
        financeData
          .filter(item => item.brand === selectedBrand)
          .map(item => item.model)
      )];
      
      setAvailableModels(models);
      
      // Auto-select first model when brand changes if current model is not available
      if (models.length > 0 && !models.includes(selectedModel)) {
        setSelectedModel(models[0]);
      }
    }
  }, [selectedBrand, selectedModel]);

  // Update available schemes when model changes
  useEffect(() => {
    if (selectedBrand && selectedModel) {
      const schemes = financeData.filter(
        item => item.brand === selectedBrand && item.model === selectedModel
      );
      
      setAvailableSchemes(schemes);
      
      // Auto-select first scheme when model changes
      if (schemes.length > 0) {
        setSelectedSchemeId(schemes[0].schemeId);
      }
    }
  }, [selectedBrand, selectedModel]);

  // Entry animation
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  // Get selected scheme data
  const selectedScheme = availableSchemes.find(scheme => scheme.schemeId === selectedSchemeId) || null;

  // Handle request quote
  const handleRequestQuote = (schemeId) => {
    console.log(`Quote requested for scheme: ${schemeId}`);
    // In a real application, this would trigger an API call or navigation
  };

  return (
    <section 
      className="finance-section" 
      ref={sectionRef}
      aria-labelledby="finance-section-heading"
    >
      <div className="finance-section__container">
        <h2 id="finance-section-heading" className="finance-section__heading">
          Financing Options
        </h2>
        <p className="finance-section__subheading">
          Explore flexible financing plans tailored for your dream car
        </p>
        
        <FinanceFilterBar
          brands={brands}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          models={availableModels}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
        />
        
        <div className="finance-section__content">
          <FinanceCardGrid
            schemes={availableSchemes}
            onSelectScheme={setSelectedSchemeId}
            selectedSchemeId={selectedSchemeId}
          />
          
          <FinanceSchemeDetails
            scheme={selectedScheme}
            onRequestQuote={handleRequestQuote}
          />
        </div>
      </div>
    </section>
  );
};

export default FinanceSection;