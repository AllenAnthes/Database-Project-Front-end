<template>
    <div>
        <el-table
            :data="tableData"
            showHeader="false"
            border
            stripe
            style="width: 100%"
            :default-sort = "{prop: 'lastName', order: 'ascending'}"
            class="table">
            <el-table-column
                sortable
                prop="lastName"
                label="Last Name"
                width="130">
            </el-table-column>
            <el-table-column
                sortable
                prop="firstName"
                label="First Name"
                width="140">
            </el-table-column>
            <el-table-column
                prop="email"
                label="Email"
                width="180">
            </el-table-column>
            <el-table-column
                prop="phoneNumber"
                label="Phone Number"
                width="150">
            </el-table-column>
            <el-table-column
                :filters="[
                    { text: 'Carpenter', value: 'Carpenter' },
                    { text: 'Electrician', value: 'Electrician' },
                    { text: 'Welder', value: 'Welder' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"

                prop="trade"
                label="Trade"
                width="140">
            </el-table-column>
            <el-table-column
                    label="Edit / Remove"
                width="160">
                <template scope="scope">
                    <el-button @click="editItem(scope.$index, scope.row)" size="small">Edit</el-button>
                    <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" :plain="true" type="danger" size="small">Remove</el-button>
                </template>
            </el-table-column>
        </el-table>
        <db-modal :form="form" :dialogFormVisible="dialogFormVisible"  v-on:closeModal="dialogVisible"></db-modal>
    </div>
</template>
<script>


    import Bus from '../eventBus'
    import DbModal from './DbModal.vue'
    import { API_URL } from '../main'

    export default {
        data(){
            return {
                tableData: [],
                apiUrl: 'http://127.0.0.1:8080/api/employees',
                dialogFormVisible: false,
                form: '',
            }
        },

        components: {
            DbModal
        },
        mounted () {
            this.getEmployees();
            Bus.$on('update', () => {
                this.getEmployees();
                this.dialogFormVisible = false;
                this.successNotification();
            });
            Bus.$on('filterResultData', (results) => {
                this.tableData = results;
            })
        },

        methods: {
            dialogVisible: function () {
                this.dialogFormVisible = false;
                this.canceledNotification();

            },

            getEmployees: function () {
                this.$axios.get(API_URL + 'employees')
                .then((response) => {
                    this.tableData = response.data._embedded.employees;
                    console.log(response.data);
                }).catch(function (response) {
                    console.log(response)
                });
            },


            editItem: function (index, row) {
                const itemHref = row._links.self.href;
                this.$axios.get(itemHref).then((response) => {
                    this.form = response.data;
                }).catch(function (response) {
                    console.log(response)
                });
                this.dialogFormVisible = true;
            },

//            deleteRow(index, rows) {
//                rows.splice(index, 1);
//                this.deleteNotification();
//
//            },

            deleteRow(index, rows) {
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

            filterTag(value, row) {
                return row.trade === value;
            },

//            formatter(row, column) {
//                let data = this.$moment(row.create_datetime, this.$moment.ISO_8601);
//                return data.format('YYYY-MM-DD')
//            },

            successNotification () {
                this.$message({
                    title: 'Sucess!',
                    message: 'Entry successfully edited',
                    type: 'success',
                    duration: 2000
                })
            },


            canceledNotification () {
                this.$message({
                    title: 'Canceled',
                    message: 'Action Canceled',
                    type: 'info',
                })
            },
        }
    }
</script>

<style>
    .table {
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .pagination {
        margin-top: 10px;
        float: right;
    }

</style>