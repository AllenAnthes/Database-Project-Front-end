<template>
    <el-row class="tac">
        <el-col >
            <el-menu defaultActive="1"
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     :router=true
                     @close="handleClose">
                <el-menu-item index="1" route="/" disabled="false"><i class="el-icon-menu"></i>{{ home }}</el-menu-item>
                <el-menu-item index="2"  route="/table" disabled="false"><i class="el-icon-menu" ></i>{{ wholeTable }}</el-menu-item>
                <el-menu-item index="3"  route="/users" disabled="false"><i class="el-icon-menu"></i>{{ manageUsers }}</el-menu-item>
            </el-menu>
        </el-col>
    </el-row>

</template>

<script>

    import ElMenuItem from "../../node_modules/element-ui/packages/menu/src/menu-item.vue";

    export default {

        components: {ElMenuItem},
        name: 'sidebar',

        data() {
            return {

                home: 'Home',
                wholeTable: 'Employee Table',
                manageUsers: 'Manage Users',

            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
        }
    }
</script>

<style>
    el-menu {
        padding-left: 20px;
    }
</style>
