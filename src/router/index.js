import Vue from 'vue'
import Router from 'vue-router'
import DbFrame from '../components/DbFrame.vue'
import DbTable from '../components/DbTable.vue'
import UserTable from '../components/UserTable.vue'
import App from '../App.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: DbFrame,
            children: [
                {
                    path: 'table',
                    component: DbTable
                }, {
                    path: 'users',
                    component: UserTable
                    }
                ]
            }
        ]
    }
)
