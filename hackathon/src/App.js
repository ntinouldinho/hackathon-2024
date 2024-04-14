import React, { useState, useEffect } from "react";
import axios from "axios";
import planetsConfig from "./planets.json";
import SolarSystemPage2 from "./SolarSystemPage2";
// import SolarSystem from "./SolarSystem";

// const planets = [
//   { name: "Moon", texture: "textures/moon_1024.jpg" },
//   { name: "Mercury", texture: "textures/mercury.jpeg" },
//   { name: "Venus", texture: "textures/venus.jpeg" },
//   { name: "Earth", texture: "textures/earth.jpeg" },
//   { name: "Mars", texture: "textures/mars.jpeg" },
//   { name: "Jupiter", texture: "textures/jupiter.jpeg" },
//   { name: "Saturn", texture: "textures/saturn.jpeg" },
//   { name: "Uranus", texture: "textures/uranus.jpeg" },
//   { name: "Neptune", texture: "textures/neptune.jpeg" },
//   { name: "Pluto", texture: "textures/pluto.jpg" },
// ];

const planets = [
  "Earth",
  "Neptune",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Pluto",
];

const App = () => {
  console.log(planetsConfig);
  const [currentPlanet, setCurrentPlanet] = useState({
    radius: 24764,
    texture: "earth.jpeg",
    ring: "",
    moons: [
      {
        name: "Moon",
        radius: 1737,
        texture: "moon_1024.jpg",
      },
    ],
  });

  // const [planetName, setPlanetName] = useState("Earth");

  return (
    <>
      <div style={{
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100vh',
    background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)', /* Deep space inspired gradient */
    color: '#FFFFFF',
    fontFamily: 'Orbitron, sans-serif',
    textAlign: 'center'
}}>
    {/* The commented out header can be styled and used if uncommented */}
    {/* <h1 style={{ color: '#00BFFF', textShadow: '0 0 10px #00BFFF' }}>Planetary Viewer</h1> */}
    {planets.map((planet) => (
        <button
            key={planet}
            onClick={() => {
                setCurrentPlanet(planetsConfig[planet]);
            }}
            style={{
              margin: '15px 10px',
              padding: '5px 10px',
                border: 'none',
                borderRadius: '5px',
                background: 'rgba(0, 191, 255, 0.6)',
                boxShadow: '0 0 10px #00BFFF',
                color: 'white',
                textShadow: '0 0 5px cyan',
                cursor: 'pointer',
            }}
        >
            {planet}
        </button>
    ))}
    {/* SolarSystemPage2 is left unstyled as requested */}
    <SolarSystemPage2 planet={currentPlanet} />
</div>

    </>
  );
};

export default App;
