import React, { useState } from 'react';
import './PasswordInput.css';

const PasswordInput = ({ onSetPassword }) => {
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    setPassword(event.target.value);
    onSetPassword(event.target.value);
  };

  return (
    <input
      type="password"
      className="password-input"
      value={password}
      onChange={handleChange}
      placeholder="Enter password"
    />
  );
};

export default PasswordInput;
