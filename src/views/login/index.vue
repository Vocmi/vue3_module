<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>hello</h1>
          <h2>识乎</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              >登陆</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
//引入相关小仓库
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
//引入获取当前时间的函数
import { getTime } from "@/utils/time";

//获取el-form组建
let loginForms = ref();

let userStore = useUserStore();

//获取路由器
let $router = useRouter();
//定义变量控制按钮加载效果
let loading = ref(false);

//收集账号与密码数据
let loginForm = reactive({ username: "admin", password: "111" });
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
    // { required: true, message: "用户名不能为空", trigger: "blur" },
    // {
    //   required: true,
    //   min: 6,
    //   max: 10,
    //   message: "账号长度至少6位",
    //   trigger: "change",
    // },
    { trigger: "change", validator: validatorUserName },
  ],
  password: [
    // {
    //   require: true,
    //   min: 6,
    //   max: 15,
    //   message: "密码的长度至少6位",
    //   trigger: "change",
    // },
    { trigger: "change", validator: validatorPassword },
  ],
};
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
  width: 80%;
  top: 30vh;
  background: url("@/assets/images/login_form.png") no-repeat;
  background-size: cover;
  padding: 40px;

  h1 {
    color: white;
    font-size: 40px;
  }

  h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
