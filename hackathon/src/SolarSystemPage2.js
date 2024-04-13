import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SolarSystemPage2 = ({ planet }) => {
  console.log(planet);
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene Setup
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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Add the sun
    // Create sun geometry and material
    const loader = new THREE.TextureLoader();
    const sunGeometry = new THREE.SphereGeometry(10, 32, 32); // Adjust size as needed
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      map: loader.load("textures/sun.jpeg"),
    }); // Yellow color for the sun

    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    sun.position.set(-60, 40, -80);

    // Add the Planet
    const planetSphere = getPlanet(3, planet.texture);

    scene.add(planetSphere);

    const rings = getRings(planet.ring, 0.5);
    if (rings) {
      scene.add(rings);
      rings.position.set(0, 0, 0);

      // Rotate the rings to be in the plane of the ecliptic
      rings.rotation.x = Math.PI / 2 - 3;
    }

    // Add the moons
    const moonShperes = [];
    planet.moons.forEach((moon) => {
      console.log(moon);
      const radi = (moon.radius / planet.radius) * 30;

      console.log(moon.texture);
      const moonSphere = getPlanet(0.3, moon.texture);

      scene.add(moonSphere);
      // moonSphere.position.set(4, 0, 0); // Position the moon next to the planet
      moonSphere.position.set(
        getRandomNumber(1.5, 3),
        getRandomNumber(1.5, 3),
        getRandomNumber(1.5, 3)
      ); // Position the moon next to the planet

      moonShperes.push(moonSphere);
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

    for (let i = 0; i < 3000; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
      stars.push(star);
    }

    camera.position.z = 10;
    // camera.lookAt(moon.position);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      sun.rotation.y += 0.0001;
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

      // particleSystem.rotation.x += 0.001;
      // particleSystem.rotation.y += 0.001;

      if (rings) rings.rotation.z += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [planet]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
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

function getPlanet(radius, texture) {
  // Texture and Geometry
  const loader = new THREE.TextureLoader();
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: loader.load("textures/" + texture),
  });
  const sphere = new THREE.Mesh(geometry, material);

  return sphere;
}

function getRings(texture, tube) {
  if (texture === "") return null;

  // Create planet's rings
  const loader = new THREE.TextureLoader();
  const ringGeometry = new THREE.TorusGeometry(4, tube, 2.5, 100);
  const ringMaterial = new THREE.MeshPhongMaterial({
    map: loader.load("textures/" + texture),
    side: THREE.DoubleSide,
  });
  const rings = new THREE.Mesh(ringGeometry, ringMaterial);

  return rings;
}

export default SolarSystemPage2;
