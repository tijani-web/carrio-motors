import React from 'react'

const CarStats = ({ car }) => {
  return (
    <div className="car-stats">
      <div className="car-stats__item">
        <span className="car-stats__value">{car.topSpeed}</span>
        <span className="car-stats__label">Top Speed</span>
      </div>
      
      <div className="car-stats__divider"></div>
      
      <div className="car-stats__item">
        <span className="car-stats__value">{car.acceleration}</span>
        <span className="car-stats__label">Acceleration</span>
      </div>
      
      <div className="car-stats__divider"></div>
      
      <div className="car-stats__item">
        <span className="car-stats__value">{car.range}</span>
        <span className="car-stats__label">Range</span>
      </div>
    </div>
  );
};

export default CarStats;