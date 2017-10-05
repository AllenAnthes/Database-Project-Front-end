<template>
    <div id="headerDiv">
        <header style="background-color: rgb(10, 47, 88);">
            <el-col :span="22">
                <div class="text-logo">{{ msg }}</div>
                <ul class="header-operations">
                </ul>
            </el-col>
            <el-col :span="2">
                <el-button class="btn btn-danger log" v-show="isLoggedIn()" @click="handleLogout()">Log out </el-button>
                <el-button class="btn btn-info log" v-show="!isLoggedIn()" @click="handleLogin()">Log In</el-button>
            </el-col>
        </header>
    </div>
</template>


<script>

    import {isLoggedIn, login, logout} from '../auth/auth';

    export default {
        name: 'header',
        data() {
            return {
                msg: 'Database prototype',

            }
        },
        methods: {
            handleLogin() {
                login();
            },
            handleLogout() {
                logout();
            },
            isLoggedIn() {
                return isLoggedIn();
            },
        }
    }

</script>

<style>
    header {
        height: 70px;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        padding: 0 20px;
        z-index: 1;
        box-sizing: border-box;
    }

    .text-logo {
        display: inline-block;
        vertical-align: middle;
        border-style: none;
        position: relative;
        top: 26px;
        right: -20px;
        font-size: 25px;
        color: white;
    }
</style>