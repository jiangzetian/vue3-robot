// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
// import * as dat from "dat.gui";
// import { onMounted, nextTick } from "@vue/runtime-core";

// /**
//    * Base
//    */
// // Debug
// const gui = new dat.GUI();
// gui.close();

// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Scene
// const scene = new THREE.Scene();

// /**
//  * Floor
//  */
// const floor = new THREE.Mesh(
//     new THREE.PlaneBufferGeometry(100, 100),
//     new THREE.MeshStandardMaterial({
//         color: "#444444",
//         metalness: 0,
//         roughness: 0.5,
//     })
// );
// floor.receiveShadow = true;
// floor.rotation.x = -Math.PI * 0.5;
// floor.receiveShadow = true;
// // scene.add(floor);

// /**
//  * Robot
//  */
// const D1 = new THREE.Mesh(
//     new THREE.CylinderGeometry(1, 1, 0.5, 32),
//     new THREE.MeshStandardMaterial({
//         color: "#E45826",
//         metalness: 0,
//         roughness: 0.5,
//     })
// );
// gui.add(D1.rotation, "y").min(-Math.PI).max(Math.PI).step(0.01);

// const D2 = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 16),
//     new THREE.MeshStandardMaterial({
//         color: "#1B1A17",
//         metalness: 0,
//         roughness: 0.5,
//     })
// );
// D2.position.set(0, 0.75, 0);
// // D2.rotation.z = Math.PI / 4;
// D1.add(D2);
// gui.add(D2.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01);

// const B1 = new THREE.Mesh(
//     new THREE.BoxGeometry(0.5, 3, 0.5),
//     new THREE.MeshStandardMaterial({
//         color: "#E45826",
//         metalness: 0,
//         roughness: 0.5,
//     })
// );
// B1.position.set(-1.5 * Math.sin(Math.PI / 4), 1, 0);
// B1.rotation.z = Math.PI / 4;
// D2.add(B1);

// const D3 = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 16),
//     new THREE.MeshStandardMaterial({
//         color: "#1B1A17",
//         metalness: 0,
//         roughness: 0.5,
//     })
// );
// D3.position.set(0, 1.5, 0);
// // D3.rotation.z = -Math.PI / 2;
// B1.add(D3);
// gui.add(D3.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01);

// const B2 = new THREE.Mesh(
//     new THREE.BoxGeometry(0.5, 3, 0.5),
//     new THREE.MeshStandardMaterial({
//         color: "#E45826",
//         metalness: 0,
//         roughness: 0.5,
//     })
// );
// B2.position.set(1.5, 0, 0);
// B2.rotation.z = -Math.PI / 2;
// D3.add(B2);

// const D4 = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 16),
//     new THREE.MeshStandardMaterial({
//         color: "#1B1A17",
//         metalness: 0,
//         roughness: 0.5,
//     })
// );
// D4.position.set(0, 1.5, 0);
// // D4.rotation.z = -Math.PI / 4;
// B2.add(D4);
// gui.add(D4.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01);

// const B3 = new THREE.Mesh(
//     new THREE.BoxGeometry(0.5, 3, 0.5),
//     new THREE.MeshStandardMaterial({
//         color: "#E45826",
//         metalness: 0,
//         roughness: 0.5,
//     })
// );
// // B3.position.set(0, 1.5, 0);
// B3.position.set(1.5 * Math.cos(Math.PI / 4), 1.5 * Math.sin(Math.PI / 4), 0);
// B3.rotation.z = -Math.PI / 4;
// D4.add(B3);
// scene.add(D1);

// const D5 = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 16),
//     new THREE.MeshStandardMaterial({
//         color: "#1B1A17",
//         metalness: 0,
//         roughness: 0.5,
//     })
// );
// D5.position.set(0, 1.5, 0);
// // D5.rotation.z = -Math.PI / 2;
// B3.add(D5);
// gui.add(D5.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01);

// const B4 = new THREE.Mesh(
//     new THREE.BoxGeometry(0.5, 1, 0.5),
//     new THREE.MeshStandardMaterial({
//         color: "#E45826",
//         metalness: 0,
//         roughness: 0.5,
//     })
// );
// B4.position.set(0.5, 0, 0);
// B4.rotation.z = -Math.PI / 2;
// D5.add(B4);

// D1.castShadow = true;
// D2.castShadow = true;
// B1.castShadow = true;
// D3.castShadow = true;
// B2.castShadow = true;
// D4.castShadow = true;
// B3.castShadow = true;
// D5.castShadow = true;

// scene.add(D1);

// /**
//  * helper
//  */
// const axes = new THREE.AxesHelper(20);
// scene.add(axes);

// const gridHelper = new THREE.GridHelper(100, 100);
// scene.add(gridHelper);

// /**
//  * Lights
//  */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
// directionalLight.castShadow = true;
// directionalLight.shadow.mapSize.set(1024, 1024);
// directionalLight.shadow.camera.far = 25;
// directionalLight.shadow.camera.left = -7;
// directionalLight.shadow.camera.top = 7;
// directionalLight.shadow.camera.right = 7;
// directionalLight.shadow.camera.bottom = -7;
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);

// /**
//  * Sizes
//  */
// const sizes = {
//     width: canvas.parentNode.clientWidth,
//     height: canvas.parentNode.clientHeight,
// };

// window.addEventListener("resize", () => {
//     // Update sizes
//     sizes.width = canvas.parentNode.clientWidth;
//     sizes.height = canvas.parentNode.clientHeight;
//     // Update camera
//     camera.aspect = sizes.width / sizes.height;
//     camera.updateProjectionMatrix();

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
//     75,
//     sizes.width / sizes.height,
//     0.1,
//     100
// );
// camera.position.set(0, 4, 10);
// scene.add(camera);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.target.set(0, 0.75, 0);
// controls.enableDamping = true;
// // controls.enabled = false;

// // const transformControls = new TransformControls(camera, canvas);
// // transformControls.setMode("rotate");
// // transformControls.attach(D1);
// // transformControls.showX = false;
// // // transformControls.showY = false;
// // transformControls.showZ = false;
// // scene.add(transformControls);

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
// });
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setClearColor("#fff");

// /**
//  * Animate
//  */
// const clock = new THREE.Clock();
// let previousTime = 0;

// const tick = () => {
//     const elapsedTime = clock.getElapsedTime();
//     const deltaTime = elapsedTime - previousTime;
//     previousTime = elapsedTime;

//     // Update controls
//     controls.update();

//     // Render
//     renderer.render(scene, camera);

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick);
// };

// tick();