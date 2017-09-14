<template>
    <div>
        <db-modal :form="form" :dialogFormVisible="dialogFormVisible"  v-on:closeModal="dialogVisible"></db-modal>

        <data-tables :data="tableData" :action-col-def="actionColDef" :actions-def="actionsDef" @filtered-data="handleFilteredData">
            <el-table-column
                    sortable
                    prop="lastName"
                    label="Last Name"
                    width="fit">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="firstName"
                    label="First Name"
                    width="fit">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="Email"
                    width="fit">
            </el-table-column>
            <el-table-column
                    prop="phoneNumber"
                    label="Phone Number"
                    width="fit">
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
                    width="fit">
            </el-table-column>
            <el-table-column
                    label="Resume"
                    width="fit">
                <template scope="scope">
                    <el-button v-if="scope.row.resumeLink !== null" type="text" @row-click="getResume(scope.row)" >Resume</el-button>
                    <el-button v-else type="text" @click="editItem(scope.row)" >Needs Resume</el-button>
                </template>
            </el-table-column>
        </data-tables>
    </div>
</template>
<script>


    import Bus from '../eventBus'
    import DbModal from './DbModal.vue'
    import { API_URL } from '../main'
    import DbFilterinput from "./DbFilterInput.vue";
    import json2csv from 'json2csv'


    export default {
        data() {
            return {
                tableData: [],
                filteredData: [],
                apiUrl: 'http://127.0.0.1:8080/api/employees',
                dialogFormVisible: false,
                columns: ['lastName', 'firstName', 'email', 'phoneNumber', 'trade', 'resumeLink'],
                columnNames: ['Last Name.', 'First Name', 'Email', 'Phone Number', 'Trade', 'Resume'],
                form: '',
                formInline: {
                    trade: '',
                    search: ''
                },
                actionsDef: {
                    colProps: {
                        span: 19
                    },
                    def: [{
                        name: 'Add new',
                        handler: () => {
                            this.$message("new clicked")
                        },
                        icon: 'plus'
                    },{
                        name: 'export all',
                        handler: () => {
                            this.CsvExport(this.tableData, this.columns, this.columnNames, 'all')
                        },
                        icon: 'document'
                    }, {
                        name: 'export filtered',
                        handler: () => {
                            this.CsvExport(this.filteredData, this.columns, this.columnNames, 'filtered')
                        },
                        icon: 'document'
                    }]
                },

                actionColDef: {
                    label: 'Actions',
                    def: [{
                        icon: 'edit',
                        handler: row => {
                            const itemHref = row._links.self.href;
                            this.$axios.get(itemHref).then((response) => {
                                this.form = response.data;
                            }).catch(function (response) {
                                console.log(response)
                            });
                            this.dialogFormVisible = true;
                        },

                    }, {
                        icon: 'delete',
                        type: 'text',
                        handler: row => {
                            this.deleteRow(row, this.tableData)
                            this.$message('RUA in row clicked ' + row.flow_no)
                        },
                    }]
                }
            }
        },

        components: {
            DbModal, DbFilterinput
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
            handleFilteredData(filteredData) {
                this.filteredData = filteredData
            },

            filterTag(value, row) {
                return row.trade === value;
            },

            editItem: function (row) {
                const itemHref = row._links.self.href;
                this.$axios.get(itemHref).then((response) => {
                    this.form = response.data;
                }).catch(function (response) {
                    console.log(response)
                });
                this.dialogFormVisible = true;
            },


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
            CsvExport (data, fields, fieldNames, fileName) {
                try {
                    var result = json2csv({
                        data: data,
                        fields: fields,
                        fieldNames: fieldNames
                    })
                    var csvContent = 'data:text/csvcharset=GBK,\uFEFF' + result
                    var encodedUri = encodeURI(csvContent)
                    var link = document.createElement('a')
                    link.setAttribute('href', encodedUri)
                    link.setAttribute('download', `${(fileName || 'file')}.csv`)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                } catch (err) {
                    console.error(err)
                }
            },
        }
    }

</script>

<style>
    .data-table {
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .pagination {
        margin-top: 10px;
        float: right;
    }

</style>