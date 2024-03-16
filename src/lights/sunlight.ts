import * as THREE from "three";
/**
 * Represent a directional light simulating the sunlight
 * @type {DirectionalLight}
 * @see https://threejs.org/docs/#api/en/lights/DirectionalLight
 */
const sunLight = new THREE.DirectionalLight(0xffffff, 1);

sunLight.position.set(1, 1, 0); //default; light shining from top
sunLight.castShadow = true; // default false

sunLight.shadow.mapSize.width = 512; // default
sunLight.shadow.mapSize.height = 512; // default
sunLight.shadow.camera.near = 0.5; // default
sunLight.shadow.camera.far = 500; // default

export default sunLight;
