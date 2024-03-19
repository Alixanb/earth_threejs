import * as THREE from "three";
import { Geometry } from "three/examples/jsm/deprecated/Geometry.js";
import { cameraPosition } from "three/examples/jsm/nodes/Nodes.js";

const loader = new THREE.TextureLoader();

const earthDayTexture = loader.load("/texture/earth/earth_daymap.jpg");
const earthNightTexture = loader.load("/texture/earth/2k_earth_nightmap.jpg");

const earthBumpMap = loader.load("/texture/earth/earth_bumpmap.png");

const sphere = new THREE.SphereGeometry(15, 128, 64);
const earth = new THREE.Mesh(
  sphere,
  new THREE.MeshStandardMaterial({
    map: earthDayTexture,
    // bumpMap: earthBumpMap,
    bumpScale: 5,
  })
);

const atmosphereGeometry = new THREE.SphereGeometry(16, 128, 64);

const atmosphereShader = new THREE.ShaderMaterial({
  transparent: true,
  opacity: 0.5,
  uniforms: {
    cameraPosition: { value: new THREE.Vector3() },
    atmosphereColor: { value: new THREE.Color(0x0077ff) },
  },
  vertexShader: `
      uniform float atmosphereRadius;
      varying float intensity;
      varying vec2 vUv;

      void main() {
        vUv = uv;
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vec3 viewDirection = normalize(cameraPosition - worldPosition.xyz);
          float distance = length(worldPosition.xyz - cameraPosition);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
  `,
  fragmentShader: `
  uniform vec3 atmosphereColor;
  uniform sampler2D baseTexture;
  varying vec2 vUv;

  
  void main() {
    vec4 baseColor = texture2D(baseTexture, vUv);
      gl_FragColor = vec4(1.0 - baseColor.rgb, baseColor.a);
  }
  
  
  `,
});

const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereShader);

function changeCameraPos(cameraPos: THREE.Vector3) {
  return;
  atmosphereShader.uniforms.cameraPosition.value = cameraPos;
}

export { earth, atmosphere, changeCameraPos };
