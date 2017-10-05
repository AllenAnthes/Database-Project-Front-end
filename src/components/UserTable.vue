<template>
    <div>
        <el-table
                :data="userTableData"
                showHeader
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
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="userRole"
                    label="Role"
                    width="130">
            </el-table-column>
            <el-table-column
                    label="Edit / Remove"
                    width="120">
                <template scope="scope">
                    <el-button @click="editUser(scope.$index, scope.row)" size="small"><i class="el-icon-edit"></i>
                    </el-button>
                    <el-button @click.native.prevent="deleteUser(scope.$index, userTableData)" :plain="true"
                               type="danger" size="small"><i class="el-icon-delete"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
        <db-user-edit-modal :form="form" :editVisible="editVisible"
                            v-on:closeUserModal="editformVisible"></db-user-edit-modal>
    </div>
</template>


<script>

    import {API_URL} from '../main'
    import DbUserEditModal from "./UserEditModal.vue";
    import {getAccessToken} from "~/auth/auth";
    import Bus from '../eventBus'

    export default {

        components: {DbUserEditModal},
        data() {
            return {
                userTableData: [],
                editVisible: false,
                form: '',
            }
        },

        mounted() {

            this.getUsers();
            Bus.$on('updateUsers', () => {
                this.getUsers();
                this.editVisible = false;
                this.successNotification();
            });

        },

        methods: {

            editUser: function (index, row) {
                const itemHref = row._links.self.href;
                this.$axios.get(itemHref).then((response) => {
                    this.form = response.data;
                }).catch(function (response) {
                    console.log(response)
                });
                this.editVisible = true;
            },
            getUsers: function () {
                this.$axios.get(API_URL + 'userAccounts',
                    {headers: {Authorization: `Bearer ${getAccessToken()}`}}
                ).then((response) => {
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
                this.editVisible = false;
            }
        }
    }

</script>