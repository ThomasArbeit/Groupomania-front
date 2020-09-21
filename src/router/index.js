import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Signup from '../views/Signup'
import HomePage from '../views/HomePage'
import MyProfile from '../views/MyProfile'
import Post from '../views/Post'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: MyProfile
  },
  {
    path: '/Post/:id',
    name: 'Post',
    component: Post
  },
]

const router = new VueRouter({
  routes
})

export default router
