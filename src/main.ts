import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
//svg插件需要配置代码
import "virtual:svg-icons-register";
//引入自定义插件对象:注册整个项目全局组建index默认引入
import gloalComponent from "@/components";
//引入模板的全局样式
import "@/style/index.scss";
//引入路由进行注册
import router from "./router";
//引入仓库
import pinia from "./store";
//引入路由鉴全文件
import './permisstion'

const app = createApp(App);
//安装仓库
app.use(pinia);
app.use(ElementPlus);
app.use(ElementPlus, {
  locale: zhCn, //element-plus国际化配置
});
//安装自定义插件
app.use(gloalComponent);
//注册模板路由
app.use(router);
app.mount("#app");
