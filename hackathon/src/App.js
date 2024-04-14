// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import planetsConfig from "./planets.json";
// import SolarSystemPage2 from "./SolarSystemPage2";
// // import SolarSystem from "./SolarSystem";

// // const planets = [
// //   { name: "Moon", texture: "textures/moon_1024.jpg" },
// //   { name: "Mercury", texture: "textures/mercury.jpeg" },
// //   { name: "Venus", texture: "textures/venus.jpeg" },
// //   { name: "Earth", texture: "textures/earth.jpeg" },
// //   { name: "Mars", texture: "textures/mars.jpeg" },
// //   { name: "Jupiter", texture: "textures/jupiter.jpeg" },
// //   { name: "Saturn", texture: "textures/saturn.jpeg" },
// //   { name: "Uranus", texture: "textures/uranus.jpeg" },
// //   { name: "Neptune", texture: "textures/neptune.jpeg" },
// //   { name: "Pluto", texture: "textures/pluto.jpg" },
// // ];

// const planets = [
//   "Earth",
//   "Neptune",
//   "Mercury",
//   "Venus",
//   "Mars",
//   "Jupiter",
//   "Saturn",
//   "Uranus",
//   "Pluto",
// ];

// const App = () => {
//   console.log(planetsConfig);
//   const [currentPlanet, setCurrentPlanet] = useState({
//     radius: 24764,
//     texture: "earth.jpeg",
//     ring: "",
//     moons: [
//       {
//         name: "Moon",
//         radius: 1737,
//         texture: "moon_1024.jpg",
//       },
//     ],
//   });

//   // const [planetName, setPlanetName] = useState("Earth");

//   return (
//     <>
//       <div>
//         {/* <h1>Planetary Viewer</h1> */}
//         {planets.map((planet) => (
//           <button
//             key={planet}
//             onClick={() => {
//               setCurrentPlanet(planetsConfig[planet]);
//             }}
//           >
//             {planet}
//           </button>
//         ))}
//         {/* <SolarSystem /> */}
//         <SolarSystemPage2 planet={currentPlanet} />
//       </div>
//     </>
//   );
// };

// export default App;

import * as THREE from "three";
import { useEffect, useState, useRef } from "react";
import SceneInit from "./lib/SceneInit";
import Planet from "./lib/Planet";
import Rotation from "./lib/Rotation";
import SolarSystemPage2 from "./SolarSystemPage2";
import planetsConfig from "./planets.json";
import SolarSystem from "./SolarSystem";

import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
export default function App() {
  

  return (
    <Router>
        <Routes>
          <Route path="/" element={<SolarSystem />} />

          <Route path="/planet/:name" element={<SolarSystemPage2 />} />
        </Routes>
    </Router>
    
  );
}