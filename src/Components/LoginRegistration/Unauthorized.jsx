import React from 'react'
import person from './pa1.png';
import Daimond from './pa2.png';
import BackGroundBlack from './pa3.png'
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate=useNavigate();
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
       403
      </h1>
      <p
        style={{
          fontSize: "24px",
          color: "#666",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
         Unauthorized<span style={{ color: "orange" }}>⚠️</span>
      </p>
      <p style={{ fontSize: "16px", color: "#888" }}>
      you don’t have permission to view this page.
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
        onClick={() => navigate("/")}
      >
        BACK TO HOME
      </button>
    </div>
  );
};
export default Unauthorized;
