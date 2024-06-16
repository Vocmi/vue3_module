<template>
  <div>
    <el-form :model="loginForm" :rules="rules" ref="loginForms">
      <el-form-item prop="username">
        <el-input :prefix-icon="User" v-model="loginForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password
          placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="nextForget">忘记密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref, defineEmits } from "vue";
//引入相关小仓库
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
import { ElNotification, ElMessage } from "element-plus";
//引入获取当前时间的函数
import { getTime } from "@/utils/time";

//引入父组件实现忘记密码跳转
const $emit = defineEmits(["nextForgetPassword"]);

const nextForget = () => {
  $emit("nextForgetPassword");
}

//获取el-form组建
let loginForms = ref();
let userStore = useUserStore();

//获取路由器
let $router = useRouter();
//定义变量控制按钮加载效果
let loading = ref(false);

//收集账号与密码数据
let loginForm = reactive({
  username: "",
  password: "",
});

//登陆按钮回调
const login = async () => {
  //保证全部表单校验通过再发请求,awit相当于把异步消息同步化,等一个消息执行成功后进行下一步操作
  await loginForms.value.validate();

  //加载效果
  loading.value = true;
  //点击登陆按钮以后干什么?
  //通知仓库发登陆请求
  //请求成功->首页展示数据的地方
  //请求失败->弹出登陆失败信息
  try {
    //保证登陆成功
    await userStore.userLogin(loginForm);
    //编成式导航跳转到展示数据首页
    $router.push("/");
    //登陆成功提示信息
    ElNotification({
      type: "success",
      message: "登陆成功",
      title: `Hi,${getTime()}好`,
    });
    //登陆成功加载效果也消失
    loading.value = false;
  } catch (error) {
    //登陆失败加载效果消失
    loading.value = false;
    //登陆失败的提示信息
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};
//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //callback:如果符合条件callBack通过,如果不符合条件注入错误提示信息
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error("账号长度至少5位"));
  }
};
const validatorPassword = (rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //callback:如果符合条件callBack通过,如果不符合条件注入错误提示信息
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码长度至少6位"));
  }
};
//定义表单校验需要配置对象
//是否开启校验 校验提示 触发时机
const rules = {
  username: [
    { trigger: "change", validator: validatorUserName },
  ],
  password: [
    { trigger: "change", validator: validatorPassword },
  ],
};
</script>

<style lang="scss" scoped>
.login_btn {
  width: 100%;
}
</style>
