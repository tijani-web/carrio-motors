import React, { useState, useEffect } from 'react';
import { calculateEMI, formatCurrency } from '../utils/financeMath';

/**
 * FinanceCalculator - Interactive calculator for custom down payments
 * @param {Object} props - Component props
 * @param {number} props.vehiclePriceUsd - Total vehicle price
 * @param {Object} props.initialScheme - Initial scheme data
 * @param {Function} props.onRecalculate - Callback when scheme is recalculated
 * @returns {JSX.Element} Calculator component
 */
const FinanceCalculator = ({ vehiclePriceUsd, initialScheme, onRecalculate }) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState(
    ((initialScheme.downPaymentUsd / vehiclePriceUsd) * 100).toFixed(1)
  );
  const [tenureMonths, setTenureMonths] = useState(initialScheme.tenureMonths);
  const [aprPercent, setAprPercent] = useState(initialScheme.aprPercent);
  
  const downPaymentUsd = (vehiclePriceUsd * downPaymentPercent) / 100;
  const financedAmountUsd = vehiclePriceUsd - downPaymentUsd;
  const monthlyInstallmentUsd = calculateEMI(financedAmountUsd, aprPercent, tenureMonths);
  
  useEffect(() => {
    // Notify parent of recalculated values if callback provided
    if (onRecalculate) {
      onRecalculate({
        ...initialScheme,
        downPaymentUsd,
        financedAmountUsd,
        monthlyInstallmentUsd,
        tenureMonths,
        aprPercent
      });
    }
  }, [downPaymentUsd, financedAmountUsd, monthlyInstallmentUsd, tenureMonths, aprPercent, initialScheme, onRecalculate]);

  const handleDownPaymentChange = (e) => {
    const value = Math.min(Math.max(parseFloat(e.target.value) || 0, 0), 100);
    setDownPaymentPercent(value);
  };

  const handleTenureChange = (e) => {
    setTenureMonths(parseInt(e.target.value));
  };

  const handleAprChange = (e) => {
    setAprPercent(parseFloat(e.target.value));
  };

  return (
    <div className="finance-calculator">
      <h4 className="finance-calculator__heading">Payment Calculator</h4>
      
      <div className="finance-calculator__form">
        <div className="finance-calculator__field">
          <label htmlFor="down-payment" className="finance-calculator__label">
            Down Payment: {downPaymentPercent}%
          </label>
          <input
            id="down-payment"
            type="range"
            min="10"
            max="90"
            step="5"
            value={downPaymentPercent}
            onChange={handleDownPaymentChange}
            className="finance-calculator__slider"
          />
          <div className="finance-calculator__value">
            {formatCurrency(downPaymentUsd)}
          </div>
        </div>
        
        <div className="finance-calculator__field">
          <label htmlFor="loan-tenure" className="finance-calculator__label">
            Loan Tenure: {tenureMonths} months
          </label>
          <input
            id="loan-tenure"
            type="range"
            min="12"
            max="84"
            step="12"
            value={tenureMonths}
            onChange={handleTenureChange}
            className="finance-calculator__slider"
          />
        </div>
        
        <div className="finance-calculator__field">
          <label htmlFor="apr" className="finance-calculator__label">
            Interest Rate (APR): {aprPercent}%
          </label>
          <input
            id="apr"
            type="range"
            min="0"
            max="20"
            step="0.1"
            value={aprPercent}
            onChange={handleAprChange}
            className="finance-calculator__slider"
          />
        </div>
      </div>
      
      <div className="finance-calculator__results">
        <div className="finance-calculator__result-item">
          <span>Financed Amount</span>
          <span>{formatCurrency(financedAmountUsd)}</span>
        </div>
        
        <div className="finance-calculator__result-item finance-calculator__result-item--emphasized">
          <span>Estimated Monthly Payment</span>
          <span>{formatCurrency(monthlyInstallmentUsd)}</span>
        </div>
      </div>
    </div>
  );
};

export default FinanceCalculator;