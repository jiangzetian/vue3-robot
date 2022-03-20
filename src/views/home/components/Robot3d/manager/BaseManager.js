import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class baseManager {
    constructor(canvas) {
        //Gui
        this.gui = new dat.GUI();
        this.gui.hide();
        //Canvas
        this.canvas = canvas
        //Sizes
        this.sizes = {}
        //Camera
        this.camera = null
        //Renderer
        this.renderer = null
        // Scene
        this.scene = new THREE.Scene();

        //AnimateTick
        this.clock = new THREE.Clock();
        this.previousTime = 0;

        this.initWindowSizes()
        this.initcamera()
        this.inLights()
        this.initHelper()
        this.initControls()
        this.initRobot()
        this.initRenderer()
        this.initAnimateTick()
    }

    /**
     * Sizes
     */
    initWindowSizes() {
        /**
         * Sizes
         */
        const sizes = {
            width: this.canvas.parentNode.clientWidth,
            height: this.canvas.parentNode.clientHeight,
        };

        window.addEventListener("resize", () => {
            // Update sizes
            sizes.width = this.canvas.parentNode.clientWidth;
            sizes.height = this.canvas.parentNode.clientHeight;
            // Update camera
            this.camera.aspect = sizes.width / sizes.height;
            this.camera.updateProjectionMatrix();

            // Update renderer
            this.renderer.setSize(sizes.width, sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        this.sizes = sizes;
    }

    /**
     * Camera
     */
    initcamera() {
        // Base camera
        const camera = new THREE.PerspectiveCamera(
            75,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );
        camera.position.set(0, 4, 10);
        this.scene.add(camera);
        this.camera = camera;
    }

    /**
     * inLights
     */
    inLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.set(1024, 1024);
        directionalLight.shadow.camera.far = 25;
        directionalLight.shadow.camera.left = -7;
        directionalLight.shadow.camera.top = 7;
        directionalLight.shadow.camera.right = 7;
        directionalLight.shadow.camera.bottom = -7;
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }

    /**
     * Helper
     */
    initHelper() {
        const axes = new THREE.AxesHelper(20);
        this.scene.add(axes);

        const gridHelper = new THREE.GridHelper(100, 100);
        this.scene.add(gridHelper);
    }

    /**
     * Controls
     */
    initControls() {
        const controls = new OrbitControls(this.camera, this.canvas);
        controls.target.set(0, 0.75, 0);
        controls.enableDamping = true;
        this.controls = controls;
    }

    setControlsEnabled(enabled) {
        this.controls.enabled = enabled
    }

    /**
     * Robot
     */
    initRobot() {
        const D1 = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 0.5, 32),
            new THREE.MeshStandardMaterial({
                color: "#E45826",
                metalness: 0,
                roughness: 0.5,
            })
        );
        this.gui.add(D1.rotation, "y").min(-Math.PI).max(Math.PI).step(0.01);

        const D2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 16),
            new THREE.MeshStandardMaterial({
                color: "#1B1A17",
                metalness: 0,
                roughness: 0.5,
            })
        );
        D2.position.set(0, 0.75, 0);
        // D2.rotation.z = Math.PI / 4;
        D1.add(D2);
        this.gui.add(D2.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01);

        const B1 = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 3, 0.5),
            new THREE.MeshStandardMaterial({
                color: "#E45826",
                metalness: 0,
                roughness: 0.5,
            })
        );
        B1.position.set(-1.5 * Math.sin(Math.PI / 4), 1, 0);
        B1.rotation.z = Math.PI / 4;
        D2.add(B1);

        const D3 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 16),
            new THREE.MeshStandardMaterial({
                color: "#1B1A17",
                metalness: 0,
                roughness: 0.5,
            })
        );
        D3.position.set(0, 1.5, 0);
        // D3.rotation.z = -Math.PI / 2;
        B1.add(D3);
        this.gui.add(D3.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01);

        const B2 = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 3, 0.5),
            new THREE.MeshStandardMaterial({
                color: "#E45826",
                metalness: 0,
                roughness: 0.5,
            })
        );
        B2.position.set(1.5, 0, 0);
        B2.rotation.z = -Math.PI / 2;
        D3.add(B2);

        const D4 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 16),
            new THREE.MeshStandardMaterial({
                color: "#1B1A17",
                metalness: 0,
                roughness: 0.5,
            })
        );
        D4.position.set(0, 1.5, 0);
        // D4.rotation.z = -Math.PI / 4;
        B2.add(D4);
        this.gui.add(D4.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01);

        const B3 = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 3, 0.5),
            new THREE.MeshStandardMaterial({
                color: "#E45826",
                metalness: 0,
                roughness: 0.5,
            })
        );
        // B3.position.set(0, 1.5, 0);
        B3.position.set(1.5 * Math.cos(Math.PI / 4), 1.5 * Math.sin(Math.PI / 4), 0);
        B3.rotation.z = -Math.PI / 4;
        D4.add(B3);

        const D5 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 16),
            new THREE.MeshStandardMaterial({
                color: "#1B1A17",
                metalness: 0,
                roughness: 0.5,
            })
        );
        D5.position.set(0, 1.5, 0);
        // D5.rotation.z = -Math.PI / 2;
        B3.add(D5);
        this.gui.add(D5.rotation, "z").min(-Math.PI).max(Math.PI).step(0.01);

        const B4 = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 1, 0.5),
            new THREE.MeshStandardMaterial({
                color: "#E45826",
                metalness: 0,
                roughness: 0.5,
            })
        );
        B4.position.set(0.5, 0, 0);
        B4.rotation.z = -Math.PI / 2;
        D5.add(B4);

        D1.castShadow = true;
        D2.castShadow = true;
        B1.castShadow = true;
        D3.castShadow = true;
        B2.castShadow = true;
        D4.castShadow = true;
        B3.castShadow = true;
        D5.castShadow = true;
        B4.castShadow = true;


        this.scene.add(D1);
        this.D1 = D1
        this.D2 = D2
        this.D3 = D3
        this.D4 = D4
        this.D5 = D5
    }
    setRobotRotation(rotation, name, direction) {
        this[name].rotation[direction] = rotation
    }

    /**
     * Renderer
     */
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // this.renderer.setClearColor("#fff");
    }

    /**
     * AnimateTick
     */
    initAnimateTick() {
        const elapsedTime = this.clock.getElapsedTime();
        const deltaTime = elapsedTime - this.previousTime;
        this.previousTime = elapsedTime;

        //Update controls
        this.controls.update();

        // Render
        this.renderer.render(this.scene, this.camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(() => {
            this.initAnimateTick()
        });
    }
}