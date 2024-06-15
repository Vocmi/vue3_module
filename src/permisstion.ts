//路由鉴全,项目当中路由能不能被访问的权限设置(某一路由什么条件下可以访问,什么条件下不能访问)
import router from "@/router";
import nprogress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css";
//获取用户相关的小仓库内部token数据,去判断用户是否登陆成功
import useUserStore from "./store/modules/user";
import pinia from "./store";
let userStore = useUserStore(pinia);

//全局守卫:项目中人一路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = "识乎";
  //to:你将要访问那个路由
  //from:你从那个路由而来
  //next:路由的放行函数
  //访问某一个路由之前的守卫
  nprogress.start();
  //获取token,去判断用户登陆还是未登录
  let token = userStore.token;
  //获取用户名字
  let username = userStore.username;
  //用户登陆判断
  if (token) {
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      //登陆成功访问其余六个路由(登陆排除)
      //有用户信息
      if (username) {
        //放行
        next();
      } else {
        //如果没有用户信息,发送请求获取到了用户信息再放行
        try {
          await userStore.userInfo();
          //获取用户信息成功后放行
          next();
        } catch (error) {
          //token过期:获取不到用户信息,或者用户手动修改本地token
          //退出登陆->用户相关的数据清空
          userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    //用户未登录判断
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "login", query: { redirect: to.path } });
    }
  }
});

//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done();
});

//第一个问题:任意路由切换实现进度条业务 --nprogress
//第二个问题:路由鉴全(路由组建访问权限的设置)
//全部的路由组建:登陆|404|任意|首页

//用户未登录:可以访问login,其余六个路由不能访问(指向login)
//用户登陆成功:不可以访问login[指向首页],其余的路由可以访问
