//统一管理项目用户相关的接口
import request from "@/utils/request";
import { loginForm, loginResponseData, registForm, registSendCode, resetForm, sendEmail } from "./type";
//统一管理接口
enum API {
    LOGIN_URL = "/login",
    USERINFO_URL = "/user/info",
    SENDCODE_URL = "/code",
    USER_REGIST = "/register",
    SEND_EMAIL = "/sendEmail",
    RESET_PASSWORD = "/resetPassword"

}
//暴露请求函数
//登陆接口方法 
export const reqLogin = (data: loginForm) => request.post(API.LOGIN_URL, data);
//获取用户信息接口方法
export const reqUserInfo = () => request.get(API.USERINFO_URL)
//获取验证码
export const reqSendCode = (data: registSendCode) => request.post(API.SENDCODE_URL, data);
//用户注册
export const reqUserRegist = (data: registForm) => request.post(API.USER_REGIST, data);
//发送邮箱
export const reqSendEmail = (data: sendEmail) => request.post(API.SEND_EMAIL, data);
//重置密码
export const reqResetPassword = (data: resetForm) => request.post(API.RESET_PASSWORD, data);