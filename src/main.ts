import "./style.css";
import earth from "./meshs/earth";
import sunLight from "./lights/sunlight";

import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg") as HTMLCanvasElement,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

scene.add(earth);
scene.add(sunLight);

function animate() {
  requestAnimationFrame(animate);
  earth.rotateY(0.005);
  renderer.render(scene, camera);
}

animate();
