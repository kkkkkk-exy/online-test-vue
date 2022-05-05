import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Main from "../views/main.vue";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/login",
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import( /* webpackChunkName: "login" */ "../views/login.vue")
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    children:[
      {
        path: '',
        name: 'set',
        component: () => import( /* webpackChunkName: "dashboard" */ "../views/sett.vue")
      }
      
    ]
  },
  {
    path: '/select',
    name: 'select',
    component:() => import( /* webpackChunkName: "select" */ "../views/select.vue")
  }
 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


export default router;