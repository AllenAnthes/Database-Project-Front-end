<template>
    <el-row class="tac">
        <el-col>
            <el-menu defaultActive="1"
                     class="navbar"
                     :router=true
                     @close="handleClose">
                <el-menu-item index="1" route="/" disabled="false"><i class="el-icon-menu"></i>{{ home }}</el-menu-item>
                <el-menu-item index="2" route="/table" disabled="false"><i class="el-icon-menu"></i>{{ wholeTable }}
                </el-menu-item>
                <el-menu-item index="3" route="/users" disabled="false"><i class="el-icon-menu"></i>{{ manageUsers }}
                </el-menu-item>
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
                wholeTable: 'Employee Table',
                manageUsers: 'Manage Users',
            }
        },

    }
</script>
