// SharedLinks.js
import React from 'react';

const SharedLinks = ({ links }) => {
  return (
    <div>
      <h2>Shared Links</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

export default SharedLinks;
