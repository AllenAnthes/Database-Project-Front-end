<template>
    <div id="app">
        <db-header align="center"></db-header>
        <el-row class="container">
            <el-col :span="4" class="menu">
                <sidebar id="sidebar"></sidebar>
            </el-col>
            <el-col :span="20" class="content">
                <router-view></router-view>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <footer class="footer">
                    <db-footer></db-footer>
                </footer>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Sidebar from './Sidebar.vue'
    import DbHeader from './DbHeader.vue'
    import DbFooter from './DbFooter.vue'
    import EmployeeDataTable from './EmployeeDataTable.vue'
    import UserTable from "./UserTable.vue";
    import router from '../router'
    import {isLoggedIn} from '../auth/auth.js'



export default {
data () {
return {
}
},

components: {
Sidebar, DbHeader,
DbFooter, EmployeeDataTable,
UserTable,

},

}
</script>

<style>
    element.style {
        background-color: rgb(10, 47, 88);
    }

    body {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        margin: 0;
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }

    #sidebar, body, html {
        height: 100%;
    }

    #app {

        position: relative;
    }

    footer, div {
        display: block;
    }

    .container {
        padding-top: 70px;
        flex: 1;
    }

    .container, #app {
        height: 100%;
    }

    .menu {
        height: 100%;
        background-color: #eef1f6;
    }

    .content {
        padding: 25px 25px 125px;
    }

    .footer {
        height: 120px;
        background-color: #324057;
        color: #a4aebd;
        width: 100%;
        z-index: 1000;
        margin-top: -120px;
        line-height: 1;
        font-size: 22px;
    }

</style>