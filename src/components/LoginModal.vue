<template>
    <el-dialog title="LoginForm"
    :visible.sync="loginModalVisible"
    :before-close="handleClose">

        <el-form :model="loginForm"
                 class="login-form"
        :show-close="true">
            <el-form-item label="Username" style="height: 15px;" :label-position="left" labelWidth="120px">
                <el-col>
                    <el-input v-model="loginForm.username" align="right" placeholder="Enter Username"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="Password" style="height: 15px" :label-position="left" labelWidth="120px">
                <el-col>
                    <el-input type="password" v-model="loginForm.password"  align="right" placeholder="Enter Password"></el-input>
                </el-col>
            </el-form-item>
        </el-form>

        <span slot="footer" class="login-footer">
            <el-button @click="closeLoginModal">Cancel</el-button>
            <el-button type="primary" @click="handleLogin">Submit</el-button>
        </span>
    </el-dialog>


</template>

<script>

    export default {

        data() {
            return {

            }
        },
        name: 'login-modal',

        props: ['loginModalVisible', 'loginForm'],

        methods: {

            closeLoginModal() {
                this.$emit('loginModalClosed');
            },

            handleLogin() {
                this.$emit('loginModalClosed');
            }
        }
    }

</script>