import React, { useState, useEffect } from "react";
import axios from "axios";
import planetsConfig from "./planets.json";
import SolarSystem from "./SolarSystem";

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

const planets = ["Earth", "Neptune"];

const App = () => {
  const [currentPlanet, setCurrentPlanet] = useState({
    radius: 24764,
    texture: "earth.jpeg",
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
    <div>
      <h1>Planetary Viewer</h1>
      {planets.map((planet) => (
        <button
          key={planet}
          onClick={() => {
            setCurrentPlanet(planetsConfig[planet]);
          }}
        >
          {planet}
        </button>
      ))}
      <SolarSystem planet={currentPlanet} />
    </div>
  );
};

export default App;
