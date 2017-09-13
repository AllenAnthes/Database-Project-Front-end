<template>
    <el-dialog title="Edit" :close-on-click-modal="false" :show-close="true"
               :visible.sync="editformVisible">
        <el-form :model="form">
            <el-form-item label="Username" :label-width="formLabelWidth">
                <el-input v-model="form.username" autoComplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autoComplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Role" :label-width="formLabelWidth">
                <el-select v-model="form.role" placeholder="select role">
                    <el-option label="Admin" value="admin"></el-option>
                    <el-option label="Employee" value="employee"></el-option>
                </el-select>
            </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button :plain="true" type="danger" v-on:click="closeModal">Cancel</el-button>
            <el-button :plain="true" @click="updateForm(form)">Save</el-button>
        </div>
    </el-dialog>
</template>


<script>

    import Bus from '../eventBus'
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";


    export default {
        name: 'db-user-edit-modal',
        data(){
            return {
                formLabelWidth: '120px',
                returnedData: [],
            }
        },
        props: ['editformVisible', 'form'],

        methods: {
//            updateForm: function (entity) {
//                let url = entity._links.self.href;
//                let firstName = entity.firstName;
//                let lastName = entity.lastName;
//                let email = entity.email;
//                let phoneNumber = entity.phoneNumber;
//                let trade = entity.trade;
//                this.$axios.put(url, {
//                    firstName: firstName,
//                    lastName: lastName,
//                    email: email,
//                    phoneNumber: phoneNumber,
//                    trade: trade
//                }).then(function (response) {
//                        console.log(response);
//                        Bus.$emit("update",response.data);
//                    }).catch(function (error) {
//                        console.log(error);
//                    });
            },


            closeModal: function () {
                this.$emit('closeUserModal');
            }

    }

</script>