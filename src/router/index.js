import Vue from 'vue'
import Router from 'vue-router'
import DbFrame from '../components/DbFrame.vue'
import DbTable from '../components/EmployeeDataTable.vue'
import UserTable from '../components/UserTable.vue'
import Callback from '../components/Callback.vue'
import {requireAuth} from '../auth/auth'


Vue.use(Router)

export default new Router({

    mode: 'history',
    routes: [
        {
            path: '/callback',
            component: Callback

        },

        {
            path: '/',
            component: DbFrame,
            children: [
                {
                    path: 'table',
                    component: DbTable,
                    // Security disabled both here and in the backend for demo
                    // beforeEnter: requireAuth,
                }, {
                    path: 'users',
                    component: UserTable,
                    // beforeEnter: requireAuth,
                }
            ]
        }
    ]
})

