// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


// Create a Three.JS Scene
const scene = new THREE.Scene();
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Keep track of the mouse position, so we can make the tierra move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Keep the 3D object on a global variable so we can access it later
let object;

// OrbitControls allow the camera to move around the scene
// let controls;

// Set which object to render
let objToRender = 'tierra';

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the file
loader.load(
    `models/${objToRender}/scene.gltf`,
    function (gltf) {
        // If the file is loaded, add it to the scene
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        // While it is loading, log the progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        // If there is an error, log it
        console.error(error);
    }
);

// Instantiate a new renderer and set its size
// Alpha: true allows for the transparent background
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Set how far the camera will be from the 3D model
camera.position.z = objToRender === "tierra" ? 10 : 500;

// Add lights to the scene, so we can actually see the 3D model
// (color, intensity)
const topLight = new THREE.DirectionalLight(0xffffff, 1);
// top-left-ish
topLight.position.set(500, 500, 500)
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "tierra" ? 5 : 1);
scene.add(ambientLight);

// This adds controls to the camera, so we can rotate / zoom it with the mouse
//if (objToRender === "tierra")
//{
//    controls = new OrbitControls(camera, renderer.domElement);
//}

// Render the scene
function animate()
{
    requestAnimationFrame(animate);
    // Here we could add some code to update the scene, adding some automatic movement

    // Make the tierra move
    if (object && objToRender === "tierra")
    {
        // I've played with the constants here until it looked good
        // object.rotation.x += 0.01;
        object.rotation.y += 0.005;
        //object.rotation.y = -3 + mouseX / window.innerWidth * 3;
        //object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    }
    renderer.render(scene, camera);
}

// Function to update the camera's position based on screen size
function updateCameraForScreenSize()
{
    if (window.innerWidth < 768)
    {
        // Mobile view: Zoom out the camera
        // Adjust this value as needed for desired zoom-out
        camera.position.z = 15;
    }
    else
    {
        // Desktop view: Default zoom
        camera.position.z = objToRender === "tierra" ? 10 : 500;
    }
}

// Call this function initially to set the right camera position
updateCameraForScreenSize();

// Add a listener to the window,
// Add a listener for window resizing, so we can resize the window and adjust the camera dynamically
window.addEventListener("resize", function ()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Adjust camera on resize
    updateCameraForScreenSize();
});

//window.addEventListener("resize", function ()
//{
//    camera.aspect = window.innerWidth / window.innerHeight;
//    camera.updateProjectionMatrix();
//    renderer.setSize(window.innerWidth, window.innerHeight);
//});

// Add mouse position listener, so we can make the tierra move
//document.onmousemove = (e) =>
//{
//    mouseX = e.clientX;
//    mouseY = e.clientY;
//}

// Start the 3D rendering
animate();