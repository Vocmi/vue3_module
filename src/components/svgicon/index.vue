<template>
  <div class="-container">
    <!-- svg图标外层容器节点,内部需要与use图标联合使用 -->
    <!-- k-v一致省略v -->
    <svg :style="{ width, height }">
      <!-- xlink : href 执行用那一个图标,属性值务必#icon-图标名字 -->
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script lang="ts" setup>
//接受父组件传递过来的参数
defineProps({
  //xlink:href
  prefix: {
    type: String,
    default: "#icon-",
  },
  //提供使用的图标名字
  name: String,
  //接受父组件传递颜色
  color: {
    type: String,
    default: "",
  },
  //接受父组件传递过来的图标的宽高
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
});
</script>

<style lang="scss" scoped></style>
