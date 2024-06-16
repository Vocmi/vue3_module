//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin, reqUserInfo, reqSendCode, reqUserRegist, reqSendEmail, reqResetPassword } from "@/api/user";
import { loginForm, registForm, registSendCode, resetForm, sendEmail } from "@/api/user/type";
//引入操作本地存储的工具方法
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'

//创建用户小仓库
let useUserStore = defineStore("User", {
  //小仓库存储数据的地方
  state: () => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      username: '',
      avatar: ''
    };
  },
  //异步|逻辑的地方
  actions: {
    //发送邮箱方法
    async sendCode(data: registSendCode) {
      //发送邮箱请求
      let result: any = await reqSendCode(data);
      //成功返回code：1，失败为0并且返回错误信息
      if (result.code == 0) {
        return Promise.reject(new Error(result.msg));
      }
    },

    //用户注册方法
    async userRegist(data: registForm) {
      let result: any = await reqUserRegist(data);
      if (result.code == 0) {
        return Promise.reject(new Error(result.msg));
      }
    },

    //密码重置方法
    async resetPassword(data: resetForm) {
      let result: any = await reqResetPassword(data);
      if (result.code == 0) {
        return Promise.reject(new Error(result.msg));
      }
    },

    //忘记密码发送邮箱
    async sendEmail(data: sendEmail) {
      let result: any = await reqSendEmail(data);
      if (result.code == 0) {
        return Promise.reject(new Error(result.msg));
      }
    },

    //用户登陆方法
    async userLogin(data: loginForm) {
      //登陆请求
      let result: any = await reqLogin(data);
      //登陆请求:成功200->token
      //登陆请求:失败201->登陆失败错误信息
      if (result.code == 1) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据对象其实利用js对象
        this.token = result.data;
        //本地存储持久化存储一份
        SET_TOKEN(result.data);
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },

    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像名字]
      let result: any = await reqUserInfo();
      //如果获取用户信息成功,存储用户信息
      if (result.code == 200) {
        this.username = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
        return "ok";
      } else {
        return Promise.reject(new Error("获取用户信息失败"))
      }
    },
    //退出登陆
    userLogout() {
      //目前没有mock接口:退出登陆接口(通知服务器本地用户唯一标识失效)
      this.token = '';
      this.username = '';
      this.avatar = '';
      REMOVE_TOKEN();
    }
  },
  getters: {},
});

//对外暴露小仓库
export default useUserStore;
