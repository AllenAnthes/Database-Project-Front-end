<template>
    <header style="background-color: rgb(10, 47, 88);">
        <el-col :span="20">

        <div class="text-logo">{{ msg }}</div>
        <ul class="header-operations">
        </ul>
        </el-col>
        <el-col :span="4">
        <el-form :model="loginForm" :rules="rules2" class="demo-ruleForm">
            <el-form-item label="Username" style="height: 15px;" align="left" labelWidth="120px">
                <el-col :span="18">
                <el-input v-model="placeholder" size="mini" align="right" placeholder="Enter Username"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="Password" style="height: 15px;" align="left" labelWidth="120px">
                <el-col :span="18">
                    <el-input type="password" v-model="placeholder" size="mini" align="right" placeholder="Enter Password"></el-input>
                </el-col>
            </el-form-item>
        </el-form>
        </el-col>
    </header>


</template>


<script>
    export default {
        name: 'headerComp',
        data () {
            return {
                msg: 'Database prototype'
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