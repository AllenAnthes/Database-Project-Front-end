<template>
    <el-row class="tac">
        <el-col >
            <el-menu defaultActive="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item index="1" route="#"><i class="el-icon-menu"></i>{{ home }}</el-menu-item>
                <el-menu-item index="2"  route="#"><i class="el-icon-menu"></i>{{ wholeTable }}</el-menu-item>
                <el-menu-item index="3"  route="#"><i class="el-icon-menu"></i>{{ about }}</el-menu-item>

            </el-menu>
        </el-col>
    </el-row>

</template>

<script>
    export default {

        name: 'sidebar',

        data() {
            return {

                home: 'Home',
                wholeTable: 'Whole table',
                about: 'About'

            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    el-menu {
        padding-left: 20px;
    }
</style>
