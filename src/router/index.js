import Vue from 'vue'
import Router from 'vue-router'
import Register from "../components/Register";
import Login from "../components/Login";
import Index from "../components/Index";
import Add from "../components/Add";
import UpdateEmp from "../components/UpdateEmp";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
      {
          path: '/login',
          name: 'Login',
          component: Login,
      },
      {
          path: '/index',
          name: 'Index',
          component: Index,
      },
      {
          path: '/add',
          name: "Add",
          component: Add,
      },
      {
          path: '/update/:num',
          name: "UpdateEmp",
          component: UpdateEmp,
      },
  ]
})
