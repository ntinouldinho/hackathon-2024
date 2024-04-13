import React, { useState } from 'react';
import Planet from './Planet';

const planets = [
  { name: 'Moon', texture: 'https://threejs.org/examples/textures/planets/moon_1024.jpg'},
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
  const [currentTexture, setCurrentTexture] = useState(planets[0].texture);

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
