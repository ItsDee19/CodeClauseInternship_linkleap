import React, { useState } from 'react';
import './ExpiryDateInput.css';

const ExpiryDateInput = ({ onSetExpiryDate }) => {
  const [expiryDate, setExpiryDate] = useState('');

  const handleChange = (event) => {
    setExpiryDate(event.target.value);
    onSetExpiryDate(event.target.value);
  };

  return (
    <input
      type="datetime-local"
      className="expiry-date-input"
      value={expiryDate}
      onChange={handleChange}
    />
  );
};

export default ExpiryDateInput;
