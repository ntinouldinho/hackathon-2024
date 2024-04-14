import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const gravities = {
    "Mercury":3.7,
    "Earth": 9.81,
    "Venus": 8.87,
    "Mars": 3.711,
    "Jupiter": 24.79,
    "Saturn": 10.44,
    "Uranus": 8.69,
    "Neptune": 11.15
}
export const Balls = ({planetName}) => {
    const mountRef = useRef(null);
    // const [planetGravity, setPlanetGravity] = useState(9.81);
    const planetGravity = gravities[planetName]
    console.log(planetName)
    console.log(gravities)
    useEffect(() => {
        if (!mountRef.current) {
            console.error('The mount point is not rendered yet');
            return;
        }
        console.log("ninninii")
        // Setup scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(0.3*window.innerWidth, 0.5*window.innerHeight);
        renderer.setClearColor(0xf0f0f0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(10, 20, 20);
        pointLight.castShadow = true;
        scene.add(pointLight);

        // Box geometry with edge lines
        const boxGeometry = new THREE.BoxGeometry(10, 10, 5);
        const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc, opacity: 0.2, transparent: true });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.castShadow = true;
        box.receiveShadow = true;
        scene.add(box);

        const edges = new THREE.EdgesGeometry(boxGeometry);
        const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x0000ff }));
        scene.add(lines);

        // Ball geometries
        const ballGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x0033ff });
        const earthBall = new THREE.Mesh(ballGeometry, earthMaterial);
        earthBall.position.set(-1, 5, 0);
        earthBall.castShadow = true;
        earthBall.receiveShadow = true;
        scene.add(earthBall);

        const planetMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const planetBall = new THREE.Mesh(ballGeometry, planetMaterial);
        planetBall.position.set(1, 5, 0);
        planetBall.castShadow = true;
        planetBall.receiveShadow = true;
        scene.add(planetBall);

        // Camera position
        camera.position.set(0, 0, 20);

        let earthGravity = 9.81; // m/s²
        let earthVelocity = 0;
        let planetVelocity = 0;
        let lastTime = Date.now();

        // Animation function
        const animate = () => {
            requestAnimationFrame(animate);

            const now = Date.now();
            const delta = (now - lastTime) / 1000;
            lastTime = now;

            // Update velocity based on gravity and time
            earthVelocity += earthGravity * delta;
            planetVelocity += planetGravity * delta;

            // Update positions based on velocity
            earthBall.position.y -= earthVelocity * delta;
            planetBall.position.y -= planetVelocity * delta;

            // Check for bounce
            if (earthBall.position.y <= -5) {
                earthVelocity *= -0.9; // Lose some energy on bounce
                earthBall.position.y = -5;
            }
            if (planetBall.position.y <= -5) {
                planetVelocity *= -0.9; // Lose some energy on bounce
                planetBall.position.y = -5;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup function
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);

            }
        };
    }, []); // Effect depends on planetGravity

    return  <div class="container" style={{display:'flex', flexDirection:'row'}}><div ref={mountRef} style={{ width: '100%', height: '100%'}}></div>
    <div style={{padding:'10px'}}>
  <p>Imagine the universe is like a huge playground with an enormous, stretchy floor mat, kind of like a bouncy castle's bottom. Now, every planet is like a different-sized play ball that we put on this mat.</p>

  <p>Mercury is like a small tennis ball. It's not very heavy, so it only makes a tiny dip in the mat. Venus is like a heavy medicine ball; it's about the same size as Earth, but it makes a deeper dip because it's really dense. Earth is like a soccer ball. It's just the right size to make a perfect dent to keep us and our moon company without letting us fall off the mat.</p>

  <p>Mars is like a lighter soccer ball. It's smaller and not as heavy as Earth, so the dip it makes is not as deep. Jupiter, though, is like a giant beach ball that's super heavy. It's so big and heavy that it makes the deepest dent of all, which means it can have lots of moons spinning around it without losing any.</p>

  <p>Saturn is like a big exercise ball. It's pretty heavy, too, and makes a large dip, but not quite as big as Jupiter's. Uranus and Neptune are like basketballs. They're a bit smaller and lighter than Saturn, so their dents are not as big, but still quite deep. They're super cold, though, so imagine them as basketballs filled with ice!</p>

  <p>When you toss smaller balls (like moons) onto the mat, they roll around the big planets because of the dents they make, just like if you rolled marbles around a bowl. And all the balls stay put on this cosmic mat because the edges are turned up, so nothing rolls off into the dark space beyond.</p>
</div>
</div>
    }
            
