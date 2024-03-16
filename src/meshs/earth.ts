import * as THREE from "three";

const loader = new THREE.TextureLoader();

const earthDayTexture = loader.load(
  "../public/texture/earth/2k_earth_daymap.jpg"
);
const earthNightTexture = loader.load(
  "../public/texture/earth/2k_earth_nightmap.jpg"
);
const earthNormalMap = loader.load(
  "../public/texture/earth/2k_earth_normal_map.jpg"
);

const sphere = new THREE.SphereGeometry(15, 64, 32);
const earth = new THREE.Mesh(
  sphere,
  new THREE.MeshStandardMaterial({
    map: earthDayTexture,
    normalMap: earthNormalMap,
    normalScale: new THREE.Vector2(-5, -5),
  })
);

export default earth;
