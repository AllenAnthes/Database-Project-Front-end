<template>

    <div id="headerDiv">
        <login-modal :loginForm="loginForm" :loginModalVisible="loginModalVisible" v-on:loginModalClosed="closeLoginModal"></login-modal>
        <header style="background-color: rgb(10, 47, 88);">

        <el-col :span="22">

        <div class="text-logo">{{ msg }}</div>
        <ul class="header-operations">
        </ul>
        </el-col>
        <el-col  :span="2">
        <el-button title="LoginBtn" @click="displayLoginModal" >
            Login
        </el-button>
        </el-col>
    </header>

    </div>

</template>



<script>

    import LoginModal from './LoginModal.vue'
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

    export default {
        components: {
            ElButton, LoginModal
        },
        name: 'header',
        data () {
            return {
                msg: 'Database prototype',
                loginModalVisible: false,
                loginForm: '',
            }
        },

        methods: {

            displayLoginModal() {
                this.loginModalVisible = true;
            },
            closeLoginModal() {
              this.loginModalVisible = false;
            }
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