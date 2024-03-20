import * as THREE from "three";
import { ShaderPass } from "three/examples/jsm/Addons.js";

const atmospherePass = new ShaderPass({
  uniforms: {
    tDiffuse: { value: null },
  },
  vertexShader: `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  fragmentShader: `
  uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main(void) {
        vec3 bg = texture2D(tDiffuse, vUv).rgb;
      vec3 color = vec3(length(bg));
      gl_FragColor = vec4(color, 1.0);
    }
  `,
});

export default atmospherePass;
