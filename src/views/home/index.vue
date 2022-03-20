<template>
  <el-container>
    <el-drawer v-model="drawer" direction="ltr" size="100%">
      <el-aside>
        <Menu @sliderInput="sliderInput" @switchChange="switchChange" />
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
