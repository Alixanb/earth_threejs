import "./style.css";
import { earth } from "./meshs/earth";
import atmospherePass from "./shaders/atmosphere";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import sunLight from "./lights/sunlight";

import * as THREE from "three";
import { RenderPass } from "three/examples/jsm/Addons.js";

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

let composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
atmospherePass.renderToScreen = true;
composer.addPass(atmospherePass);

function animate() {
  requestAnimationFrame(animate);
  earth.rotateY(0.005);

  composer.render();
}

animate();
