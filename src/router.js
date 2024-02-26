// import { frm } from 'core-js/core/array'
import {createRouter, createWebHistory} from 'vue-router'
import AppEmailBodyVue from './components/AppEmailBody.vue'
import AppDashboardVue from './views/AppDashboard.vue'
import AppForgetVue from './views/AppForget.vue'
import AppLoginVue from './views/AppLogin.vue'
// import AppMailVue from './views/AppMail.vue'
import NotFound from './views/NotFound.vue'

const Mail = () => import('./views/AppMail.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: AppLoginVue, alias: '/' }, // localhost:port/login
        { path: '/forget', component: AppForgetVue, meta: {
            cantEnter: true
        }},
        { path: '/dashboard', component: AppDashboardVue, name: 'home', beforeEnter() {
            console.log('beforeEnter');
        }},
        { path: '/mail',
          component: Mail, 
          name:'email',
          children: [
            { path: ':mailId?', component: AppEmailBodyVue, props: true }
        ]},
        { path: '/:notFound(.*)', component: NotFound}
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
}) 

router.beforeEach((to, from, next) => {
    console.log('beforeEach');
    if (to.meta.cantEnter) {
        next({name: 'home'})
    }
    else {
        next()
    }
})

// router.afterEach((to, from) => {
    
// })

export default router