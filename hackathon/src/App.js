import React, { useState, useEffect } from 'react';
import Planet from './Planet';
import axios from 'axios';

const planets = [
  { name: 'Moon', texture: 'textures/moon_1024.jpg'},
  { name: 'Mercury', texture: 'textures/mercury.jpeg' },
  { name: 'Venus', texture: 'textures/venus.jpeg' },
  { name: 'Earth', texture: 'textures/earth.jpeg' },
  { name: 'Mars', texture: 'textures/mars.jpeg' },
  { name: 'Jupiter', texture: 'textures/jupiter.jpeg' },
  { name: 'Saturn', texture: 'textures/saturn.jpeg' },
  { name: 'Uranus', texture: 'textures/uranus.jpeg' },
  { name: 'Neptune', texture: 'textures/neptune.jpeg' },
  { name: 'Pluto', texture: 'textures/pluto.jpg' }
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
