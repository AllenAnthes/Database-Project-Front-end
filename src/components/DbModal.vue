<template>
    <el-dialog title="Edit" :close-on-click-modal="false" :show-close="false"
               :visible.sync="dialogFormVisible">
        <el-form :model=form>

            <el-form-item label="First Name" :label-width="formLabelWidth">
                <el-input v-model="form.firstName" autoComplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Last Name" :label-width="formLabelWidth">
                <el-input v-model="form.lastName" autoComplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Email" :label-width="formLabelWidth">
                <el-input v-model="form.email" autoComplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Phone" :label-width="formLabelWidth">
                <el-input v-model="form.phoneNumber" autoComplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Trade" :label-width="formLabelWidth">
                <el-select v-model="form.trade" placeholder="please select trade">
                    <el-option label="Carpenter" value="Carpenter"></el-option>
                    <el-option label="Electrician" value="Electrician"></el-option>
                    <el-option label="Welder" value="Welder"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Resume Link" :labelWidth="formLabelWidth">
                <el-upload
                        class="upload-button"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                </el-upload>
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
        components: {ElFormItem},
        data(){
            return {
                formLabelWidth: '120px',
                returnedData: [],
            }
        },
        props: ['dialogFormVisible', 'form'],

        methods: {
            updateForm: function (entity) {
                let url = entity._links.self.href;
                let firstName = entity.firstName;
                let lastName = entity.lastName;
                let email = entity.email;
                let phoneNumber = entity.phoneNumber;
                let trade = entity.trade;
                this.$axios.put(url, {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    trade: trade
                }).then(function (response) {
                        console.log(response);
                        Bus.$emit("update",response.data);
                    }).catch(function (error) {
                        console.log(error);
                    });
            },


            closeModal: function () {
                this.$emit('closeModal');
            }
        },
    }

</script>