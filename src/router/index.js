import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import User from "@/components/user/user.vue"
import Right from '@/components/rights/right.vue'
import UserRight from '@/components/rights/userRight.vue'
import Goods from '@/components/good/goods.vue'
import Params from '@/components/good/params.vue'
import Categories from '@/components/good/categories.vue'
import Orders from '@/components/order/orders.vue'
import Reports from '@/components/report/reports.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: "user",
          path: "users",
          component: User
        },
        {
          name: "right",
          path: "rights",
          component: Right
        },
        {
          name: 'userRight',
          path: 'roles',
          component: UserRight
        },
        {
          name: 'goods',
          path: 'goods',
          component: Goods
        },
        {
          name: 'params',
          path: 'params',
          component: Params
        },
        {
          name: 'categories',
          path: 'categories',
          component: Categories
        },
        {
          name: 'orders',
          path: 'orders',
          component: Orders
        },
        {
          name: 'reports',
          path: 'reports',
          component: Reports
        }
      ]
    }
  ]
})
