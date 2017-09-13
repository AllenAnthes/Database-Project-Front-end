<template>
    <div>
        <el-table
                :data="userTableData"
                showHeader="false"
                border
                stripe
                style="width: 100%"
                class="table">
            <el-table-column
                prop="username"
                label="Username"
                width="130">
            </el-table-column>
            <el-table-column
                prop="name"
                label="Name"
                width="130">
            </el-table-column>
            <el-table-column
                prop="userRole"
                label="Role"
                width="130">
            </el-table-column>
            <el-table-column
                    label="Edit / Remove"
                    width="160">
                <template scope="scope">
                    <el-button @click="editUser(scope.$index, scope.row)" size="small">Edit</el-button>
                    <el-button @click.native.prevent="deleteUser(scope.$index, tableData)" :plain="true" type="danger" size="small">Remove</el-button>
                </template>
            </el-table-column>
        </el-table>
        <db-user-edit-modal :form="form" :editformVisible="editformVisible"  v-on:closeUserModal="editformVisible"></db-user-edit-modal>
    </div>
</template>


<script>

    import { API_URL } from '../main'
    import DbUserEditModal from "./DbUserEditModal.vue";

    export default {

        components: {DbUserEditModal},
        name: 'user-table',

        data() {
            return {
                userTableData: [],
                editformVisible: false,
                form: '',
            }
        },

        mounted () {

            this.getUsers();

        },

        methods: {

            editUser: function(index, row) {
                const itemHref = row._links.self.href;
                this.$axios.get(itemHref).then((response) => {
                    this.form = response.data;
                }).catch(function (response) {
                    console.log(response)
                });
                this.editformVisible = true;
            },
            getUsers: function () {
                this.$axios.get(API_URL + 'userAccounts')
                    .then((response) => {
                        this.userTableData = response.data._embedded.userAccounts;
                        console.log(response.data);
                    }).catch(function (response) {
                    console.log(response)
                });
            },
            deleteUser(index, rows) {
                this.$confirm('This will permanently delete the entry. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: 'Delete completed'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });
                });
            },

            editformVisible() {
                this.editformVisible = false;
            }
        }
    }

</script>