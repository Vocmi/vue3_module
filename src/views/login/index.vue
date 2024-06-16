<template>
  <div class="login_container">
    <el-row>
      <el-col :span="8" :xs="0"></el-col>
      <el-col :span="8" :xs="24" class="login_form">
        <el-form-item>
          <el-button text @click="switchTopasswordLogin" :class="{ active: isPasswordActive }">密码登录</el-button>
          <el-button text @click="switchToregistLogin" :class="{ active: !isPasswordActive }">注册账户</el-button>
        </el-form-item>
        <!-- 动态组件，根据currentView的值显示对应的子组件 -->
        <component :is="currentComponent" @nextPasswordLogin="nextPassword" @nextForgetPassword="nextForget">
        </component>
      </el-col>
      <el-col :span="8" :xs="0"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import registLogin from "@/components/login/registLogin.vue";
import passwordLogin from "@/components/login/passwordLogin.vue";
import forgetPassword from '@/components/login/forgetPassword.vue';
import { ElButton } from 'element-plus';

// 定义组件引用对象,k-v一致v省略
//上面出现了组件不显示的bug，可能是因为识别成字符串的原因，所以对上面两个子组件进行了封装
//万物皆可any，懒得进行ts封装了
const componentsMap: any = {
  registLogin,
  passwordLogin,
  forgetPassword
};

// 使用 computed 属性来根据currentView的值返回对应的组件引用
const currentComponent = computed(() => componentsMap[currentView.value]);

const currentView = ref('passwordLogin'); // 初始展示的组件

//用来控制按钮颜色
const isPasswordActive = ref(true);

const switchToregistLogin = () => {
  currentView.value = 'registLogin';
  isPasswordActive.value = false;
};

const switchTopasswordLogin = () => {
  currentView.value = 'passwordLogin';
  isPasswordActive.value = true;
};

//实现页面跳转到登录页面
const nextPassword = () => {
  currentView.value = 'passwordLogin';
}

//跳转到忘记密码界面
const nextForget = () => {
  console.log("该事件触发了")
  currentView.value = 'forgetPassword';
}

</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  top: 30vh;
  background-color: white;
  background-size: cover;
  padding: 40px;
}

.active {
  color: #0077BE;
}
</style>
