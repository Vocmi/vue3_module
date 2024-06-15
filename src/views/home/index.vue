<template>
    <div class="-container">
        <h1>我是一级路由展示登陆成功后的数据</h1>
        <button @click="logout">退出登陆</button>
    </div>
  </template>
  
  <script lang="ts" setup>
    //引入组合式API函数之生命周期函数
    import { onMounted } from 'vue';
    //获取仓库对象
    import useUserStore from '@/store/modules/user';
    import { useRouter } from 'vue-router';
    //获取路由器对象
    let $router = useRouter();

    let userrStore = useUserStore();

   

    //退出登陆
    const logout = () =>{
        //第一件事情:需要向服务器发送请求[退出登陆接口]
        //第二件事:仓库当中关于用户相关的数据清空[token|username|avatar]
        //第三件事:跳转到登陆页面
        userrStore.userLogout();
        //跳转到登陆页面
        $router.push("/login")
    }
  </script>
  
  <style lang="scss" scoped></style>