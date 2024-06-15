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

