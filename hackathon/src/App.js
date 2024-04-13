import React, { useState, useEffect } from 'react';
import Planet from './Planet';
import axios from 'axios';

const planets = [
  { name: 'Moon', texture: 'http://localhost:3000/textures/moon_1024.jpg'},
  { name: 'Mercury', texture: 'https://threejs.org/examples/textures/planets/mercury_1024.jpg' },
  { name: 'Venus', texture: 'https://threejs.org/examples/textures/planets/venus_surface_1024.jpg' },
  { name: 'Earth', texture: 'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg' },
  { name: 'Mars', texture: 'https://threejs.org/examples/textures/planets/mars_1024.jpg' },
  { name: 'Jupiter', texture: 'https://threejs.org/examples/textures/planets/jupiter_1024.jpg' },
  { name: 'Saturn', texture: 'https://threejs.org/examples/textures/planets/saturn_1024.jpg' },
  { name: 'Uranus', texture: 'https://threejs.org/examples/textures/planets/uranus_1024.jpg' },
  { name: 'Neptune', texture: 'https://threejs.org/examples/textures/planets/neptune_1024.jpg' },
  { name: 'Pluto', texture: 'https://threejs.org/examples/textures/planets/pluto_1024.jpg' }
];

const App = () => {
  const [planetss, setPlanets] = useState([]);
  const [currentTexture, setCurrentTexture] = useState(planets[0].texture);


  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/planets')
  //     .then(response => {
  //       setPlanets(response.data);
  //       setCurrentTexture(response.data[0].texture);  // Set initial planet texture
  //     })
  //     .catch(error => console.error('Error fetching data: ', error));
  // }, []);

  return (
    <div>
      <h1>Planetary Viewer</h1>
      {planets.map(planet => (
        <button key={planet.name} onClick={() => setCurrentTexture(planet.texture)}>
          {planet.name}
        </button>
      ))}
      <Planet textureUrl={currentTexture} />
    </div>
  );
};

export default App;
