import * as THREE from "three";

export default class Planet {
  constructor(radius, positionX, textureFile, planetName) {
    this.radius = radius;
    this.positionX = positionX;
    this.textureFile = textureFile;
    this.mesh = null;  // Initialize mesh to ensure it is defined
    this.planetName = planetName;
  }

  createTextLabel(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; // Increased canvas width to accommodate larger text
    canvas.height = 256; // Increased canvas height
    const context = canvas.getContext('2d');
    context.fillStyle = '#FFF';  // Set text color
    context.font = '48px Arial';  // Increase font size to 48px
    context.textAlign = 'center'; // Center the text
    context.textBaseline = 'middle'; // Align text in the middle vertically
    context.fillText(text, canvas.width / 2, canvas.height / 2); // Adjust text positioning

//     context.fillStyle = 'rgba(255, 0, 0, 1)'; // Red background for visibility
// context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas
// context.fillStyle = '#FFF';  // White text color

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;  // Ensure the texture updates
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(10, 5, 1); // Adjust these values as necessary

    return sprite;
}


  getMesh() {
    if (this.mesh === null) {  // Simplified check for null
      const geometry = new THREE.SphereGeometry(this.radius);
      const texture = new THREE.TextureLoader().load(this.textureFile);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.mesh = new THREE.Mesh(geometry, material);

      // Create the text label and use 'this' to reference the method
      const textLabel = this.createTextLabel(this.planetName);

      // Position the label above the sphere
      textLabel.position.set(0, this.radius + 0.1, 0);  // Adjust the y position to be just above the sphere

      this.mesh.add(textLabel);  // Add the label as a child of the mesh
      this.mesh.position.x = this.positionX;  // Set the initial position
    }
    return this.mesh;
  }
}
