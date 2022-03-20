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
