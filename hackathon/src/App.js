import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import SolarSystem from './SolarSystem';
import SolarSystemPage2 from './SolarSystemPage2';

export default function App() {
  return (
    <Router>
      <div>
        <BackButton />
        
        <Routes>
          <Route path="/" element={<SolarSystem />} />
          <Route path="/planet/:name" element={<SolarSystemPage2 />} />
        </Routes>
      </div>
    </Router>
  );
}

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to navigate back
  const goBack = () => {
    navigate(-1); // Moves one step back in the history stack
  };

  if (location.pathname === '/') {
    return null; // Do not render anything if it's the home page
  }

  return (
    <button onClick={goBack}
      style={{
        position: 'absolute',
        margin: '10px',
        padding: '10px 20px',
        background: 'linear-gradient(145deg,  #1f77fe,  #0808af )',
        color: 'white',
        fontSize: '16px',
        borderRadius: '3px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease-in-out'
      }}
      onMouseOver={e => {
        e.target.style.transform = 'scale(1.05)';
      }}
      onMouseOut={e => {
        e.target.style.transform = 'scale(1)';
      }}
    >
      Go Back
    </button>
  );
}
