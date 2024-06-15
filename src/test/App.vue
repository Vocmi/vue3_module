<template>
  <div class="-container">
    <h1>App根组建</h1>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { reqLogin } from '@/api/user';
onMounted(()=>{
  reqLogin({username:'admin',password:'11'})
})
</script>

<style lang="scss" scoped></style>