import * as THREE from 'three';

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const viewport = document.getElementById('viewport');
if (viewport) {
  viewport.appendChild(renderer.domElement);
}

const light: THREE.AmbientLight = new THREE.AmbientLight(0x404040);
scene.add(light);

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate(): void {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();