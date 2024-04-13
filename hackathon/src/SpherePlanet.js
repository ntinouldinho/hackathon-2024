import * as THREE from "three";

function getSpherePlanet(radius, texture) {
  // Texture and Geometry
  const loader = new THREE.TextureLoader();
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: loader.load("textures/" + texture),
  });
  const sphere = new THREE.Mesh(geometry, material);

  return sphere;
}

export default getSpherePlanet;
