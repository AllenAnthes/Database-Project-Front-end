<template>
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
</template>

<script>


    import Sidebar from './components/Sidebar.vue'
    import DbHeader from './components/DbHeader.vue'
    import DbFooter from './components/DbFooter.vue'
    import DbTable from './components/EmployeeDataTable.vue'
    import UserTable from './components/UserTable.vue'

    export default {

        components: {
            Sidebar, DbHeader,
            DbFooter, DbTable,
            UserTable,

        },
    }
</script>


<style>
</style>