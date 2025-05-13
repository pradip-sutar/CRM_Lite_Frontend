// NotFound.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const NotFound = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.textContainer}>
//         <h1 style={styles.heading}>404</h1>
//         <h2 style={styles.subHeading}>Page Not Found</h2>
//         <p style={styles.description}>
//           Oops! The page you're looking for doesn't exist.
//         </p>
//         <Link to="/" style={styles.homeLink}>
//           Go Back Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#f0f2f5',
//     color: '#333',
//     fontFamily: 'Arial, sans-serif',
//   },
//   textContainer: {
//     textAlign: 'center',
//     padding: '20px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     borderRadius: '8px',
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: '6rem',
//     fontWeight: 'bold',
//     margin: '0',
//     color: '#FF6B6B',
//   },
//   subHeading: {
//     fontSize: '2rem',
//     margin: '0 0 20px',
//   },
//   description: {
//     fontSize: '1.1rem',
//     marginBottom: '30px',
//     color: '#555',
//   },
//   homeLink: {
//     textDecoration: 'none',
//     color: '#fff',
//     backgroundColor: '#FF6B6B',
//     padding: '10px 20px',
//     borderRadius: '5px',
//     fontWeight: 'bold',
//     transition: 'background-color 0.3s',
//   },
//   homeLinkHover: {
//     backgroundColor: '#ff5252',
//   },
// };

// export default NotFound;

import React from "react";
import person from './pa1.png';
import Daimond from './pa2.png';
import BackGroundBlack from './pa3.png'
const NotFound = () => {
  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "72px",
          color: "#666cff",
          margin: "0",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "24px",
          color: "#666",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        Page Not Found <span style={{ color: "orange" }}>⚠️</span>
      </p>
      <p style={{ fontSize: "16px", color: "#888" }}>
        We couldn’t find the page you are looking for.
      </p>
      <div style={{ marginTop: "20px", position: "relative" }}>
        {/* Character Image */}
        <img
          src={person} 
          alt="Character"
          style={{
            height: "385px",
            marginBottom: "20px",
            width:"210px"
          }}
        />
        {/* Blue Object */}
        <img
          src={Daimond} 
          alt="Blue Object"
          style={{
            height: "110px",
            position: "absolute",
            left: "-295px",
            bottom: "29px",
          }}
        />
        <img
          src={BackGroundBlack} 
          alt="Blue Object"
          style={{
            height: "326px",
            position: "absolute",
            left: "-653px",
            bottom: "-72px",
            width:"1528px"
          }}
        />
      </div>
      <button
        style={{
          backgroundColor: "#666cff",
          color: "#fff",
          border: "none",
          borderRadius: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onClick={() => (window.location.href = "/")}
      >
        BACK TO HOME
      </button>
    </div>
  );
};

export default NotFound;
