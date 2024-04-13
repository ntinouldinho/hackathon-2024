import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Planet = ({ planetName, textureUrl }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    console.log(planetName);
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

    // Texture and Geometry
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(3, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      map: loader.load(textureUrl),
    });
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Create a smaller sphere geometry (moon)
    const moonGeometry = new THREE.SphereGeometry(0.3, 32, 32);

    // Create a basic material with a texture for the moon
    const moonTextureLoader = new THREE.TextureLoader();
    const moonTexture = moonTextureLoader.load("textures/moon_1024.jpg");
    const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });

    // Create a mesh (moon) with the geometry and material
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(4, 0, 0); // Position the moon next to the planet

    scene.add(moon);

    // const labelGeometry = new TextGeometry("Moon", {
    //   font: new FontLoader().parse("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"),
    //   size: 0.1,
    //   height: 0.01
    // });

    // const labelGeometry = new THREE.TextGeometry("Moon", {
    //   font: new THREE.FontLoader().parse(
    //     "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
    //   ),
    //   size: 0.1,
    //   height: 0.01,
    // // });
    // const labelMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    // const label = new THREE.Mesh(labelGeometry, labelMaterial);
    // label.position.set(4, 0.5, 0); // Position the label above the moon
    // scene.add(label);

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

    const starGeometry = new THREE.SphereGeometry(0.1, 32, 32);
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
    controls.enablePan = true;

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.001; // Rotate the planet
      moon.rotation.y += 0.002; // Rotate the planet
      clouds.rotation.y -= 0.01; // Rotate the clouds slowly
      stars.forEach((star) => {
        star.rotation.y += 0.001; // Rotate the stars slowly
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
      renderer.render(scene, camera);
    };
    // Animation loop to let you spin the planet around
    // const animate = function () {
    //   requestAnimationFrame(animate);
    //   controls.update();
    //   renderer.render(scene, camera);
    // };

    // function animate() {
    //     requestAnimationFrame(animate);
    //     planet.rotation.y += 0.01; // Controls the rotation speed
    //     renderer.render(scene, camera);
    // }

    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [textureUrl]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Planet;
