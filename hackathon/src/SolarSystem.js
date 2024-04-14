import * as THREE from "three";
import SceneInit from "./lib/SceneInit";
import Planet from "./lib/Planet";
import Rotation from "./lib/Rotation";
import { useEffect, useState, useRef } from "react";

const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);


const SolarSystem = () => {
    let flag=true
  const [currentPage, setCurrentPage] = useState("solar")
  const [selectedPlanet, setSelectedPlanet] = useState("")
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let uuids = {}
  let renderer;
  let test;

  // const mountRef = useRef(null);
  

  useEffect( () => {
    console.log("oninnn")
    if(flag){
      renderer = new THREE.WebGLRenderer();
      console.log(window.innerWidth, window.innerHeight)
      renderer.setSize(window.innerWidth, window.innerHeight);
    // TODO: Understand this code later.
    test = new SceneInit();

    // mountRef.current.appendChild(test.domElement);
    test.initScene();
    test.animate();

    const sunGeometry = new THREE.SphereGeometry(8);
    const sunTexture = new THREE.TextureLoader().load("textures/sun.jpeg");
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    const solarSystem = new THREE.Group();
    solarSystem.add(sunMesh);
    test.scene.add(solarSystem);

    const mercury = new Planet(2, 16, "textures/mercury.jpeg");
    const mercuryMesh = mercury.getMesh();
    let mercurySystem = new THREE.Group();
    mercurySystem.add(mercuryMesh);

    const venus = new Planet(3, 32, "textures/venus.jpeg");
    const venusMesh = venus.getMesh();
    let venusSystem = new THREE.Group();
    venusSystem.add(venusMesh);

    const earth = new Planet(4, 48, "textures/earth.jpeg");
    const earthMesh = earth.getMesh();
    let earthSystem = new THREE.Group();
    earthSystem.add(earthMesh);

    const mars = new Planet(3, 64, "textures/mars.jpeg");
    const marsMesh = mars.getMesh();
    let marsSystem = new THREE.Group();
    marsSystem.add(marsMesh);

    solarSystem.add(mercurySystem, venusSystem, earthSystem, marsSystem);

    const mercuryRotation = new Rotation(mercuryMesh);
    const mercuryRotationMesh = mercuryRotation.getMesh();
    mercurySystem.add(mercuryRotationMesh);
    const venusRotation = new Rotation(venusMesh);
    const venusRotationMesh = venusRotation.getMesh();
    venusSystem.add(venusRotationMesh);
    const earthRotation = new Rotation(earthMesh);
    const earthRotationMesh = earthRotation.getMesh();
    
    earthSystem.add(earthRotationMesh);
    const marsRotation = new Rotation(marsMesh);
    const marsRotationMesh = marsRotation.getMesh();
    marsSystem.add(marsRotationMesh);

    uuids["Earth"] = earthMesh.uuid
    uuids["Mercury"] = mercuryMesh.uuid
    uuids["Venus"] = venusMesh.uuid
    uuids["Mars"] = marsMesh.uuid
    uuids["Sun"] = sunMesh.uuid


    // NOTE: Animate solar system at 60fps.
    const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);
    const animate = () => {
      sunMesh.rotation.y += 0.001;
      mercurySystem.rotation.y += EARTH_YEAR * 4;
      venusSystem.rotation.y -= EARTH_YEAR * 2;
      earthSystem.rotation.y += EARTH_YEAR;
      marsSystem.rotation.y += EARTH_YEAR * 0.5;
      requestAnimationFrame(animate);
    };
    animate();
    let canvas = document.querySelector("#myThreeJsCanvas");

        canvas.addEventListener("click", (event) => {
        event.preventDefault();

        // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and mouse position and compute intersections
        raycaster.setFromCamera(mouse, test.camera);

        // Check if we intersect with any of the planets in our scene (or, in general, any objects you are interested in)
        let intersects = raycaster.intersectObjects(test.scene.children, true);

        if (intersects.length > 0) {
            // intersects[0] contains the first (closest) intersection
            Object.entries(uuids).forEach(([key, value]) => {
                if (value === intersects[0].object.uuid){
                    console.log('You clicked on: ', key)
                    window.location.href = '/planet/'+key;
                }
                
            });
        }
        })
    flag=false
  }
 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">  
        <canvas id="myThreeJsCanvas" /> 
    </div>
  );
}

export default SolarSystem;