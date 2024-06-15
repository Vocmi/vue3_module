//引入项目中全部的全局组建
import SvgIcon from './svgicon/index.vue';
import Pagination from './Pagination/index.vue';

//k-v一致省略v 上面是两个对象
const allGloablComponent: any= {
    SvgIcon,
    Pagination
}

//对外暴露一个插件对象
export default {
    //务必叫做install方法
    install(app: any){
        //注册项目全部的全局组建
        Object.keys(allGloablComponent).forEach(key => { 
            // 注册为全局组建
            app.component(key,allGloablComponent[key]);
        });
    }
}