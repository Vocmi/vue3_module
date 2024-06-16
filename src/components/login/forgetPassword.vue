<template>
    <div>
        <el-form :model="resetForm" :rules="rules" ref="loginForms">
            <el-form-item prop="email">
                <div class="flex-container">
                    <el-input placeholder="请输入邮箱" class="input-style" v-model="resetForm.email"
                        :prefix-icon="Message" />
                    <el-button :disabled="isCountingDown" @click="sendVerificationCode" class="button-style">{{
                        buttonText
                        }}</el-button>
                </div>
            </el-form-item>
            <el-form-item prop="code">
                <el-input placeholder="请输入一个6位数的验证码" v-model="resetForm.code" :prefix-icon="Finished"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" :prefix-icon="Lock" v-model="resetForm.password" show-password
                    placeholder="请输入重置后的密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" class="login_btn" type="primary" size="default"
                    @click="reset">重置密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { Lock, Message, Finished } from "@element-plus/icons-vue";
import { reactive, ref, defineEmits } from "vue";
//引入相关小仓库
import useUserStore from "@/store/modules/user";
import { ElNotification, ElMessage } from "element-plus";
import { sendEmail } from "@/api/user/type";

//获取父节点，实现登录后跳转
const $emit = defineEmits(['nextPasswordLogin']);

//获取el-form组建
let loginForms = ref();

let userStore = useUserStore();

//定义变量控制按钮加载效果
let loading = ref(false);

//收集账号与密码等数据
let resetForm = reactive({
    password: "",
    email: "",
    code: "",
});
const isCountingDown = ref(false);
let countdown = ref(60);
const buttonText = ref("发送验证码");

const sendVerificationCode = async () => {
    // 邮箱检验
    if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(resetForm.email)
    ) {
        ElMessage.error("邮箱格式不正确！");
        return;
    }

    if (isCountingDown.value) return;

    //调用发送邮箱的接口
    let loginSendCode: sendEmail = {
        email: resetForm.email
    }

    try {
        await userStore.sendEmail(loginSendCode);
        isCountingDown.value = true;
        countdown.value = 60;
        buttonText.value = `${countdown.value}s后重新发送`;
        // 倒计时逻辑
        const timer = setInterval(() => {
            countdown.value--;
            buttonText.value = `${countdown.value}s后重新发送`;
            if (countdown.value <= 0) {
                clearInterval(timer);
                isCountingDown.value = false;
                countdown.value = 60;
                buttonText.value = "发送验证码";
            }
        }, 1000);
    } catch (error) {
        ElNotification({
            type: "error",
            message: (error as Error).message,
        });
    }
};

//回调
const reset = async () => {
    //保证全部表单校验通过再发请求,awit相当于把异步消息同步化,等一个消息执行成功后进行下一步操作
    await loginForms.value.validate();

    //加载效果
    loading.value = true;

    try {
        //保证密码重置成功
        await userStore.resetPassword(resetForm);

        // 密码重置成功，跳转到登录页面
        $emit('nextPasswordLogin');

        //密码重置成功提示信息
        ElNotification({
            type: "success",
            message: "密码重置成功",
        });
        //密码重置成功加载效果也消失
        loading.value = false;
    } catch (error) {
        //密码重置失败加载效果消失
        loading.value = false;
        //密码重置失败的提示信息
        ElNotification({
            type: "error",
            message: (error as Error).message,
        });
    }
};
//自定义校验规则函数
const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback();
    } else {
        callback(new Error("密码长度至少6位"));
    }
};
const validatorEmail = (rule: any, value: any, callback: any) => {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        callback();
    } else {
        console.log(value);
        callback(new Error("邮箱不正确"));
    }
};
const validatorCode = (rule: any, value: any, callback: any) => {
    if (value.length == 6) {
        callback();
    } else {
        console.log(value);
        callback(new Error("验证码错误"));
    }
};
//定义表单校验需要配置对象
//是否开启校验 校验提示 触发时机
const rules = {
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
    email: [{ trigger: "change", validator: validatorEmail }],
    code: [{ trigger: "change", validator: validatorCode }],
};
</script>

<style lang="scss" scoped>
.login_btn {
    width: 100%;
}

.flex-container {
    display: flex;
    align-items: center;
    /* 保证垂直居中 */
}

.input-style,
.button-style {
    /* 确保按钮和输入框不会因为默认的宽度或高度撑开容器 */
    flex: 0 0 auto;
    margin-right: 10px;
    /* 在输入框右侧添加一些间距 */
}

.button-style {
    padding: 0.5rem 1rem;
    /* 使用padding控制按钮大小，便于响应式调整 */
    white-space: nowrap;
}

/* 响应式设计：调整不同屏幕宽度下的按钮大小 */
@media (min-width: 481px) and (max-width: 768px) {
    .button-style {
        padding: 0.4rem 0.8rem;
        /* 中等屏幕尺寸下的按钮大小 */
    }
}

@media (max-width: 480px) {
    .button-style {
        padding: 0.3rem 0.6rem;
        /* 小屏幕尺寸下的按钮大小 */
        margin: 0 5px;
        /* 减少小屏下的边距 */
    }
}
</style>
