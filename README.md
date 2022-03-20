## 一、效果预览

## 二、技术栈

1. web 端使用 Vue3+element-plus UI
2. 3D 显示使用 three.js

## 三、过程

1. 新建 Vue3 项目
2. 清除无关的新手引导代码
3. 安装 vue-router 4
4. 安装 three.js
5. 新建 src/views/home/index.vue 为主页
6. 新建 src/layout/index.vue layout 主页
7. 新建 src/layout/components/Menu 组件
8. 新建 src/layout/components/Robot3d 组件

## 三、核心代码

1. 使用 three.js 构建 3D 机械臂
2. 除去必要的 3D 场景元素外，initRobot 方法是构建机械臂的核心

- 总共有活动关节 5 个分别是：D1~D5
- 总共有力臂 4 个分别是：B1~B4
- 根据结构从 D1 开始嵌套为子节点
- 最终渲染生成力臂

3. 其中的 setRobotRotation 方法对外提供角度控制
4. 其中的 setControlsEnabled 方法对外提供视角开关控制

```js
// 文件路径：src/views/home/components/Robot3d/manager/BaseManager.js

import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class baseManager {
  constructor(canvas) {
    //Gui
    this.gui = new dat.GUI();
    this.gui.hide();
    //Canvas
    this.canvas = canvas;
    //Sizes
    this.sizes = {};
    //Camera
    this.camera = null;
    //Renderer
    this.renderer = null;
    // Scene
    this.scene = new THREE.Scene();

    //AnimateTick
    this.clock = new THREE.Clock();
    this.previousTime = 0;

    this.initWindowSizes();
    this.initcamera();
    this.inLights();
    this.initHelper();
    this.initControls();
    this.initRobot();
    this.initRenderer();
    this.initAnimateTick();
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
    this.controls.enabled = enabled;
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
    B3.position.set(
      1.5 * Math.cos(Math.PI / 4),
      1.5 * Math.sin(Math.PI / 4),
      0
    );
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
    this.D1 = D1;
    this.D2 = D2;
    this.D3 = D3;
    this.D4 = D4;
    this.D5 = D5;
  }
  setRobotRotation(rotation, name, direction) {
    this[name].rotation[direction] = rotation;
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
      this.initAnimateTick();
    });
  }
}
```

5. home/components/Robot3d/index.vue 实现 3D 场景的呈现
6. 调用 BaseManager 类完成渲染
7. 并且定义控制角度和视角开关的方法

```html
// 路径：src/views/home/components/Robot3d/index.vue
<template>
  <canvas class="webgl" ref="webgl"></canvas>
</template>

<script setup>
  import { defineExpose, onMounted } from "vue";
  import BaseManager from "./manager/BaseManager.js";

  let base = null;

  onMounted(() => {
    base = new BaseManager(document.querySelector("canvas.webgl"));
  });

  const setRobotRotation = (e, name, direction) => {
    base.setRobotRotation(e, name, direction);
  };

  const setControlsEnabled = (enabled) => {
    base.setControlsEnabled(enabled);
  };

  defineExpose({ setRobotRotation, setControlsEnabled });
</script>

<style scscope>
  .webgl {
    width: 100%;
    height: 100%;
    outline: none;
  }
</style>
```

8. home/components/Menu/index.vue 实现控制界面

```html
// 路径：src/views/home/components/Menu/index.vue
<template>
  <el-scrollbar height="100%">
    <div class="slider-block">
      <div class="slider-item">
        <span class="demonstration">鼠标视角控制器</span>
        <el-switch v-model="mouseValue" @change="switchChange" />
      </div>
      <div class="slider-item">
        <span class="demonstration">关节一（绕Y轴旋转）</span>
        <el-slider
          v-model="value1"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D1', 'y')"
        />
      </div>
      <div class="slider-item">
        <span class="demonstration">关节二（绕Z轴旋转）</span>
        <el-slider
          v-model="value2"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D2', 'z')"
        />
      </div>
      <div class="slider-item">
        <span class="demonstration">关节三（绕Z轴旋转）</span>
        <el-slider
          v-model="value3"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D3', 'z')"
        />
      </div>
      <div class="slider-item">
        <span class="demonstration">关节四（绕Z轴旋转）</span>
        <el-slider
          v-model="value4"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D4', 'z')"
        />
      </div>
      <div class="slider-item">
        <p class="demonstration">关节五</p>
        <span class="demonstration">绕x轴旋转</span>
        <el-slider
          v-model="value5_1"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D5', 'x')"
        />
        <span class="demonstration">绕y轴旋转</span>
        <el-slider
          v-model="value5_2"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D5', 'y')"
        />
        <span class="demonstration">绕Z轴旋转</span>
        <el-slider
          v-model="value5_3"
          show-input
          :min="min"
          :max="max"
          :step="0.01"
          @input="sliderInput($event, 'D5', 'z')"
        />
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
  import { ref, defineEmits } from "vue";

  const mouseValue = ref(true);
  const value1 = ref(0);
  const value2 = ref(0);
  const value3 = ref(0);
  const value4 = ref(0);

  const value5_1 = ref(0);
  const value5_2 = ref(0);
  const value5_3 = ref(0);

  const min = ref(Number(-Math.PI.toFixed(2)));
  const max = ref(Number(Math.PI.toFixed(2)));

  const emit = defineEmits(["sliderInput", "switchChange"]);

  const sliderInput = (e, name, direction) => {
    emit("sliderInput", e, name, direction);
  };

  const switchChange = (e) => {
    emit("switchChange", e);
  };
</script>

<style scope>
  .slider-block {
    padding: 20px 10px;
  }
  .slider-item {
    margin: 20px 0;
  }
  .demonstration {
    margin: 0 10px 10px 0;
  }
</style>
```

9. 引入 home 页的两个自定义组件

```html
// 路径：src/views/home/index.vue
<template>
  <el-container>
    <el-drawer v-model="drawer" direction="ltr" size="100%">
      <el-aside>
        <menu @sliderInput="sliderInput" @switchChange="switchChange" />
      </el-aside>
    </el-drawer>
    <el-main>
      <div class="btn" v-show="!drawer">
        <el-button
          type="primary"
          :icon="Operation"
          circle
          size="large"
          @click="drawerSwitch"
        />
      </div>
      <Robot3d ref="Robot3dRef" />
    </el-main>
  </el-container>
</template>

<script setup>
  import { ref } from "vue";
  import Menu from "./components/Menu/index.vue";
  import Robot3d from "./components/Robot3d/index.vue";
  import { Operation } from "@element-plus/icons-vue";
  const Robot3dRef = ref();
  const sliderInput = (e, name, direction) => {
    Robot3dRef.value.setRobotRotation(e, name, direction);
  };
  const switchChange = (e) => {
    Robot3dRef.value.setControlsEnabled(e);
  };

  const drawer = ref(false);
  const drawerSwitch = () => {
    drawer.value = !drawer.value;
  };
</script>

<style scscope>
  .el-aside {
    width: 100%;
    background-color: #304156;
    color: #eee;
  }
  .el-overlay {
    max-width: 450px;
  }
  .el-drawer__header {
    margin: 0;
    background-color: #304156;
    color: #eee;
  }
  .el-drawer__body {
    background-color: #304156;
    padding: 0;
  }
  .el-container {
    height: 100%;
  }
  .el-main {
    padding: 0;
    margin: 0;
    overflow: hidden;
    outline: none;
  }
  .btn {
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
```

10. 通过上述核心代码就能构建机械臂控制和预览

## 四、源码地址

```txt
https://github.com/jiangzetian/vue3-robot
```

## 五、视频预览

1. [点击此处即可预览](https://www.bilibili.com/video/BV1yb4y1p734/)
