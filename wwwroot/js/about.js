// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const loader = new THREE.TextureLoader();
const materials = [];

const logos = [
    'images/technologies/html.png',
    'images/technologies/css.png',
    'images/technologies/git.png',
];

// Load and create planes for each logo
logos.forEach((logo) => {
    loader.load(logo, (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        plane.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, 0);
        scene.add(plane);
        materials.push(material);
    });
});

function animate() {
    requestAnimationFrame(animate);
    // Add some rotation to the group of logos
    materials.forEach((material) => {
        material.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
}

animate();