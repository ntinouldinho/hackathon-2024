import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import planetsConfig from "./planets.json";
import { useParams } from 'react-router-dom';
import { Quiz } from "./quiz";
import {Modal} from "./Modal"
import { Learn } from "./learn";
import { Chat } from "./chat";
import { Balls } from "./Balls";
// import 'bootstrap/dist/css/bootstrap.css';

const SolarSystemPage2 = () => {
  const mountRef = useRef(null);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const [tooltip, setTooltip] = useState({ visible: false, content: "" });

  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [learnModalOpen, setLearnModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [animationOpen, setAnimationOpen] = useState(false);


  let { name } = useParams(); 
  const [planetName, setPlanetName] = useState(name)
  const planetsWithAtmosphere = ["Earth"]

  const hasAtmosphere = planetsWithAtmosphere.includes(planetName);

  let planet;

  useEffect(() => {
    planet = planetsConfig[name]
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    mountRef.current.appendChild(renderer.domElement);

    // Create axes
    const xAxis = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 0),
      10,
      0xff0000
    );
    const yAxis = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 0),
      10,
      0x00ff00
    );
    const zAxis = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0),
      10,
      0x0000ff
    );

    const onClick = (event) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1) for both components.
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
      // Update the picking ray with the camera and mouse position.
      raycaster.setFromCamera(mouse, camera);
  
      // Calculate objects intersecting the picking ray. Assume 'planetSphere' is the mesh you want to check.
      const intersects = raycaster.intersectObjects([planetSphere]);
      
    };
  
    window.addEventListener('click', onClick);

    // Add axes to the scene
    // scene.add(xAxis);
    // scene.add(yAxis);
    // scene.add(zAxis);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.rotation.x = 1;
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Add the Planet
    const planetRadius = 3;
    const planetSphere = getPlanet(planetRadius, planet.texture, hasAtmosphere);
    
    scene.add(planetSphere);

    const rings = getRings(planet.ring, 1);
    if (rings) {
      scene.add(rings);
      rings.position.set(0, 0, 0);

      // Rotate the rings to be in the plane of the ecliptic
      rings.rotation.x = Math.PI / 2 - 3;
    }

    // Define bodies with their positions and radii
    const bodies = [
      { position: planetSphere.position, radius: planetRadius }
    ];

    // Add the moons
    const moonShperes = [];
    planet.moons.forEach((moon) => {
      console.log(moon);
      const radi = (moon.radius / planet.radius) * 30;

      console.log(moon.texture);
      const moonSphere = getPlanet(0.3, moon.texture);

      //scene.add(moonSphere);
      moonSphere.position.set(
        getRandomNumber(3, 6),
        getRandomNumber(3, 6),
        getRandomNumber(3, 6)
      ); // Position the moon next to the planet
      scene.add(moonSphere); // Add moon to the scene
      moonShperes.push(moonSphere);

      bodies.push({
        position: moonSphere.position,
        radius: radi
      });
    });

    // Create a background with animated clouds and stars
    const backgroundGeometry = new THREE.SphereGeometry(100, 32, 32);
    const backgroundMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.BackSide,
    });
    const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    scene.add(background);

    const starGeometry = new THREE.SphereGeometry(0.05, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffcc });
    const stars = [];

    for (let i = 0; i < 1000; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
      stars.push(star);
    }

    const gridSize = 200;
    const gridStep = 2;
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0088bb });
    const verticalPos = 0;

      // Gravitational field calculation incorporating body size
    function calculateGravitationalCurve(x, z, bodies) {
        return bodies.reduce((acc, body) => {
          const dx = x - body.position.x;
          const dz = z - body.position.z;
          const distance = Math.sqrt(dx * dx + dz * dz);
          // const sigma = 10;
          const G = 20;
          const gravityEffect = -G * (body.radius / (distance/2));
          // const gravityEffect = -10 * (body.radius / distance)*distance;
          return acc + gravityEffect;
        }, 0);
      }

      
  
      // Create grid lines influenced by gravitational fields of both bodies
      for (let x = -gridSize; x <= gridSize; x += gridStep) {
        const pointsH = [];
        const pointsV = [];
        for (let z = -gridSize; z <= gridSize; z += gridStep) {
          const curveDepthH = calculateGravitationalCurve(x, z, bodies);
          const curveDepthV = calculateGravitationalCurve(z, x, bodies);
          pointsH.push(new THREE.Vector3(x, verticalPos + curveDepthH, z));
          pointsV.push(new THREE.Vector3(z, verticalPos + curveDepthV, x));
        }
        const geometryH = new THREE.BufferGeometry().setFromPoints(pointsH);
        const lineH = new THREE.Line(geometryH, lineMaterial);
        scene.add(lineH);
  
        const geometryV = new THREE.BufferGeometry().setFromPoints(pointsV);
        const lineV = new THREE.Line(geometryV, lineMaterial);
        scene.add(lineV);
      }

    camera.position.z = 10;
    // camera.position.set(10, 10, 10);

    // camera.lookAt(moon.position);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      planetSphere.rotation.y += 0.001; // Rotate the planet
      // clouds.rotation.y -= 0.01; // Rotate the clouds slowly
      stars.forEach((star) => {
        star.rotation.y += 0.01; // Rotate the stars slowly
        star.rotation.x += 0.01; // Rotate the stars slowly
      });
      moonShperes.forEach((moon) => {
        moon.rotation.y += 0.002; // Rotate the moon
      });
      controls.update();
      // Configure controls (optional)
      controls.enableDamping = true; // Enable smooth camera movement
      controls.dampingFactor = 0.25; // Set damping factor for smoother animation
      controls.rotateSpeed = 0.5; // Adjust rotation speed
      controls.zoomSpeed = 1.2; // Adjust zoom speed
      controls.panSpeed = 0.5; // Adjust pan speed
      controls.enableZoom = true; // Enable zooming
      controls.enablePan = true; // Enable panning
      controls.enableRotate = true; // Enable orbiting

      if (rings) rings.rotation.z += 0.001;

      camera.rotateY += 0.1

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('click', onClick);
      // mountRef.current.removeChild(renderer.domElement);
    };
  }, []);



  return (
    <div ref={mountRef} style={{ width: "100%", height: "100vh" }}>
        
        <button onClick={() => setLearnModalOpen(true)} style={{
        position: 'absolute',
        left: '150px',
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
      }}>Start Learning</button>
        <button onClick={() => setQuizModalOpen(true)} style={{
        position: 'absolute',
        left: '350px',
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
      }}>Start Quiz</button>
       <button onClick={() => setAnimationOpen(true)} style={{
        position: 'absolute',
        left: '510px',
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
      }}>Start Animation</button>
      <button onClick={() => setChatOpen(true)} style={{
        position: 'absolute',
        right: '0',
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
      }}>Ask AI  🤖</button>
      {learnModalOpen && <Modal isOpen={learnModalOpen} onClose={() => setLearnModalOpen(false)} children={<Learn planet={planetName} />} />}
      {quizModalOpen && <Modal isOpen={quizModalOpen} onClose={() => setQuizModalOpen(false)} children={<Quiz planet={planetName} />} />}
      {chatOpen && <Modal isOpen={chatOpen} onClose={() => setChatOpen(false)} children={<Chat planet={planetName} />} />}

      {animationOpen && <Modal isOpen={animationOpen} onClose={() => setAnimationOpen(false)} children={<Balls planetName={planetName} />} />}
      
    </div>
  );
  
};

// Generate a random number between -4 and -2 or between 2 and 4
function getRandomNumber(minVal, maxVal) {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Determine if the number should be negative or positive
  const isNegative = Math.random() < 0.5;

  // Determine the range
  let min, max;
  if (isNegative) {
    min = -maxVal;
    max = -minVal;
  } else {
    min = minVal;
    max = maxVal;
  }

  // Calculate the random number within the specified range
  const randomInRange = Math.random() * (max - min) + min;

  return randomInRange;
}

function getPlanet(radius, texture, hasAtmosphere=false) {
  // Texture and Geometry
  const loader = new THREE.TextureLoader();
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: loader.load("../../textures/" + texture),
  });
  const sphere = new THREE.Mesh(geometry, material);
  if(hasAtmosphere){
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
  
    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.1, 32, 32);
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    sphere.add(atmosphere);
  }
  return sphere;
}

function getRings(texture, tube) {
  if (texture === "") return null;

  // Create planet's rings
  const textureLoader = new THREE.TextureLoader();
  const rText = textureLoader.load('../../textures/' + texture, function (tex) {
  // Repeat the texture along the torus' circumference
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 1); // You may need to adjust these values
  tex.rotation = Math.PI / 2;
  // '4' could be any number that helps the texture repeat around the ring
  // '1' means the texture will not repeat along the thickness of the ring
  }); 
  const ringMaterial = new THREE.MeshPhongMaterial({
    map: rText,
    side: THREE.DoubleSide,
  });

  const ringGeometry = new THREE.TorusGeometry(4.5, tube, 2.5, 50);
  const rings = new THREE.Mesh(ringGeometry, ringMaterial);



  return rings;
}

export default SolarSystemPage2;
