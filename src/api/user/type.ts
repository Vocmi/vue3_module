//登陆接口需要携带参数ts类型
export interface loginForm {
  username: string;
  password: string;
}

interface dataType {
  token: string;
}

//登陆接口返回的数据类型
export interface loginResponseData {
  code: number;
  data: dataType;
}

//发送验证码携带的信息
export interface registSendCode {
  username: string;
  email: string;
}

//注册接口携带参数
export interface registForm {
  username: string;
  password: string;
  email: string;
  code: string;
}

//发送邮箱接口携带参数
export interface sendEmail {
  email: string;
}

//重置接口携带参数
export interface resetForm {
  password: string,
  email: string,
  code: string,
}

