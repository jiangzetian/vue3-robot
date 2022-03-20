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
