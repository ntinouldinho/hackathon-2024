import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import getSpherePlanet from "./SpherePlanet";

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

    // Add the Planet
    const planetSphere = getSpherePlanet(3, planet.texture);
    // const planetSphere = getSpherePlanet(planet.radius, planet.texture);

    scene.add(planetSphere);

    // Create Saturn's rings
    const loader = new THREE.TextureLoader();
    const ringGeometry = new THREE.TorusGeometry(4, 0.5, 2.5, 100);
    const ringMaterial = new THREE.MeshPhongMaterial({
      map: loader.load("textures/verticalring.jpeg"),
      side: THREE.DoubleSide,
    });
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(rings);
    rings.position.set(0, 0, 0);

    // Rotate the rings to be in the plane of the ecliptic
    rings.rotation.x = Math.PI / 2 - 3;

    // Add the moons
    const moonShperes = [];
    planet.moons.forEach((moon) => {
      console.log(moon);
      const radi = (moon.radius / planet.radius) * 30;

      console.log(moon.texture);
      const moonSphere = getSpherePlanet(0.3, moon.texture);

      scene.add(moonSphere);
      // moonSphere.position.set(4, 0, 0); // Position the moon next to the planet
      moonSphere.position.set(
        getRandomNumber(),
        getRandomNumber(),
        getRandomNumber()
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

    const cloudGeometry = new THREE.SphereGeometry(110, 32, 32);
    const cloudMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.2,
      transparent: true,
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

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

    camera.position.z = 10;
    // camera.lookAt(moon.position);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      planetSphere.rotation.y += 0.001; // Rotate the planet
      clouds.rotation.y -= 0.01; // Rotate the clouds slowly
      stars.forEach((star) => {
        star.rotation.y += 0.001; // Rotate the stars slowly
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

      rings.rotation.z += 0.001;

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
function getRandomNumber() {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Determine if the number should be negative or positive
  const isNegative = Math.random() < 0.5;

  // Determine the range
  let min, max;
  if (isNegative) {
    min = -4;
    max = -2;
  } else {
    min = 2;
    max = 4;
  }

  // Calculate the random number within the specified range
  const randomInRange = Math.random() * (max - min) + min;

  return randomInRange;
}

export default SolarSystemPage2;