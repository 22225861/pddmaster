// 1. 引入对应模块
import Vue from 'vue'
import VueRouter  from 'vue-router'

import Home from './../views/Home/Home'
import Recommend from './../views/Recommend/Recommend'
import Search from './../views/Search/Search'
import Chat from './../views/Chat/Chat'
import Me from './../views/Me/Me'

import Hot from '../views/Home/Children/Hot/Hot'
import Box from './../views/Home/Children/Box'
import Dress from './../views/Home/Children/Dress'
import Ele from './../views/Home/Children/Ele'
import Food from './../views/Home/Children/Food'
import General from './../views/Home/Children/General'
import Man from './../views/Home/Children/Man'
import Mbaby from './../views/Home/Children/MBaby'
import Shirt from './../views/Home/Children/Shirt'
import Login from "@/views/Login/Login";


// 2. 声明使用
Vue.use(VueRouter);

// 3. 输出路由对象
export default  new VueRouter({
  // 3.1 配置一级路由
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        // 热门版块
        {path: 'hot', component: Hot,meta:{showBottomTabBar:true}},
        // 服饰版块
        {path: 'dress', component: Dress},
        // 鞋包版块
        {path: 'box', component: Box},
        // 母婴版块
        {path: 'mbaby', component: Mbaby},
        // 百货版块
        {path: 'general', component: General},
        // 食品版块
        {path: 'food', component: Food},
        // 内衣版块
        {path: 'shirt', component: Shirt},
        // 男装版块
        {path: 'man', component: Man},
        // 电器版块
        {path: 'ele', component: Ele},
        {path: '/home',redirect: '/home/hot'}
      ],

    },
    {
      path: '/recommend',
      component: Recommend,
      meta:{showBottomTabBar:true}
    },
    {
      path: '/search',
      component: Search,
      meta:{showBottomTabBar:true}
    },
    {
      path: '/chat',
      component: Chat,
      meta:{showBottomTabBar:true}
    },
    {
      path: '/me',
      component: Me,
      meta:{showBottomTabBar:true}
    },
    {
      path: '/login',
      component: Login,

    },
    {
      path: '/',
      redirect: '/home',
      meta:{showBottomTabBar:true}
    },
  ]
});
