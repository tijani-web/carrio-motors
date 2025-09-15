import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { calculateEMI, formatCurrency } from '../utils/financeMath';
import FinanceCalculator from './FinanceCalculator';

/**
 * FinanceSchemeDetails - Displays detailed breakdown of a selected finance scheme
 * @param {Object} props - Component props
 * @param {Object|null} props.scheme - The selected scheme object
 * @param {Function} props.onRequestQuote - Callback when requesting a quote
 * @returns {JSX.Element} Scheme details component
 */
const FinanceSchemeDetails = ({ scheme, onRequestQuote }) => {
  const detailsRef = useRef(null);
  const [showCalculator, setShowCalculator] = useState(false);

  // Animation when scheme changes
  useEffect(() => {
    if (detailsRef.current) {
      if (scheme) {
        gsap.fromTo(detailsRef.current, 
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      } else {
        gsap.to(detailsRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.3
        });
      }
    }
  }, [scheme]);

  if (!scheme) {
    return (
      <div className="finance-scheme-details" ref={detailsRef}>
        <div className="finance-scheme-details__placeholder">
          <h3>Select a financing plan to view details</h3>
          <p>Choose from the available options on the left to see a detailed breakdown.</p>
        </div>
      </div>
    );
  }

  // Calculate derived values
  const vehiclePrice = scheme.vehiclePriceUsd;
  const downPayment = scheme.downPaymentUsd;
  const financedAmount = scheme.financedAmountUsd;
  const tenureMonths = scheme.tenureMonths;
  const apr = scheme.aprPercent;
  const monthlyInstallment = scheme.monthlyInstallmentUsd;
  
  const totalPayable = monthlyInstallment * tenureMonths;
  const totalInterestPaid = totalPayable - financedAmount;

  return (
    <div 
      className="finance-scheme-details" 
      ref={detailsRef}
      aria-labelledby="scheme-details-heading"
    >
      <h3 id="scheme-details-heading" className="finance-scheme-details__heading">
        {scheme.schemeId} - Plan Details
      </h3>
      
      <div className="finance-scheme-details__content">
        <div className="finance-scheme-details__summary">
          <div className="finance-scheme-details__summary-item">
            <span className="finance-scheme-details__summary-label">Vehicle Price</span>
            <span className="finance-scheme-details__summary-value">
              {formatCurrency(vehiclePrice)}
            </span>
          </div>
          
          <div className="finance-scheme-details__summary-item">
            <span className="finance-scheme-details__summary-label">Down Payment</span>
            <span className="finance-scheme-details__summary-value">
              {formatCurrency(downPayment)} ({(downPayment / vehiclePrice * 100).toFixed(1)}%)
            </span>
          </div>
          
          <div className="finance-scheme-details__summary-item">
            <span className="finance-scheme-details__summary-label">Amount Financed</span>
            <span className="finance-scheme-details__summary-value">
              {formatCurrency(financedAmount)}
            </span>
          </div>
          
          <div className="finance-scheme-details__summary-item">
            <span className="finance-scheme-details__summary-label">Loan Tenure</span>
            <span className="finance-scheme-details__summary-value">
              {tenureMonths} months
            </span>
          </div>
          
          <div className="finance-scheme-details__summary-item">
            <span className="finance-scheme-details__summary-label">Interest Rate (APR)</span>
            <span className="finance-scheme-details__summary-value">
              {apr}% per annum
            </span>
          </div>
        </div>
        
        <div className="finance-scheme-details__breakdown">
          <h4 className="finance-scheme-details__breakdown-heading">Payment Breakdown</h4>
          
          <div className="finance-scheme-details__breakdown-item finance-scheme-details__breakdown-item--emphasized">
            <span>Monthly Installment</span>
            <span>{formatCurrency(monthlyInstallment)}</span>
          </div>
          
          <div className="finance-scheme-details__breakdown-item">
            <span>Total Interest Payable</span>
            <span>{formatCurrency(totalInterestPaid)}</span>
          </div>
          
          <div className="finance-scheme-details__breakdown-item finance-scheme-details__breakdown-item--total">
            <span>Total Amount Payable</span>
            <span>{formatCurrency(totalPayable)}</span>
          </div>
        </div>
        
        <button
          className="finance-scheme-details__calculator-toggle"
          onClick={() => setShowCalculator(!showCalculator)}
          aria-expanded={showCalculator}
        >
          {showCalculator ? 'Hide Calculator' : 'Customize Down Payment'}
        </button>
        
        {showCalculator && (
          <FinanceCalculator
            vehiclePriceUsd={vehiclePrice}
            initialScheme={scheme}
          />
        )}
        
        <button
          className="finance-scheme-details__cta"
          onClick={() => onRequestQuote(scheme.schemeId)}
        >
          Request Quote
        </button>
      </div>
    </div>
  );
};

export default FinanceSchemeDetails;