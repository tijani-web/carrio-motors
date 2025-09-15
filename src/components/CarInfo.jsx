import React from 'react';

const CarInfo = ({ car }) => {
  return (
    <div className="car-info">
      <h1 className="car-info__name">{car.name}</h1>
      <p className="car-info__tagline">{car.tagline}</p>
    </div>
  );
};

export default CarInfo;