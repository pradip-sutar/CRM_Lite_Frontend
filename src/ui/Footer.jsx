import React from 'react';
import './Footer.css';

function Footer() {
  console.log("Footer rendered");
  return (
    <div className="footer">
      <span className='foot'>© {new Date().getFullYear()} Your Company. All Rights Reserved.</span>

    </div>
  );
}

export default Footer;
