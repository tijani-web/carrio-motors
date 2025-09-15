import React, { useState, useEffect } from 'react';
import './Footer.css';

const Ticker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState({ city: '', country: '' });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            setLocation({
              city: data.city || data.locality || 'Unknown City',
              country: data.countryName || 'Unknown Country'
            });
          } catch (error) {
            console.error('Error fetching location:', error);
            setLocation({ city: 'Unknown Location', country: '' });
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocation({ city: 'Location Access Denied', country: '' });
        }
      );
    } else {
      setLocation({ city: 'Geolocation Not Supported', country: '' });
    }
  }, []);

  // Format date and time
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const tickerText = `📅 ${formatDate(currentTime)} | ⏰ ${formatTime(currentTime)} | 📍 ${location.city}${location.country ? ', ' + location.country : ''}`;

  return (
    <div className="ticker">
      <div className="ticker__content">
        <span className="ticker__text">{tickerText}</span>
        <span className="ticker__text">{tickerText}</span>
        <span className="ticker__text">{tickerText}</span>
      </div>
    </div>
  );
};

export default Ticker;