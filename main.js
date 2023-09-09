import './style.css';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector(`#bg`),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0x0096FF } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

// Lightning 
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// Shows the direction of Light
const lightHelper = new THREE.PointLightHelper(pointLight)

// Shows the direction of Grid
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

// Orbit controls Allow the camera to orbit around the center of the scene
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render( scene, camera );
}

animate();