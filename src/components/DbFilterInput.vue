<template>
    <el-form :inline="true" :model="formInline">

        <el-form-item label="Sex">
            <el-select v-model="formInline.trade" clearable placeholder="Select trade"
                       v-on:visible-change="selectDemo">
                <el-option
                        v-for="item in type_options"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item v-if='formInline.sex' label="Description">
            <el-input v-model="formInline.email" placeholder="Please input suffix of email"></el-input>
        </el-form-item>

        <el-form-item v-else='formInline.sex' label="Description">
            <el-input v-model="formInline.email" disabled placeholder="Please input suffix of email"></el-input>
        </el-form-item>

    </el-form>
</template>

<script>
    import lodash from 'lodash'
    import Bus from '../eventBus'
    import { API_URL } from '../main'


    export default {
        name: 'db-filterinput',
        data() {
            return {
                type_options: [],
                formInline: {
                    trade: '',
                    email: ''
                },
                formLabelWidth: '120px'
            }
        },

        watch: {
            'formInline.trade': 'filterResultData',
            'formInline.lastName': 'filterResultData'
        },

        methods: {
            selectDemo: function (params) {
                if (params) {
                    this.$axios.get(API_URL + "employees/trade")
                        .then((response) => {
                            this.type_options = response.data;
                            console.log(response.data);
                        }).catch(function (response) {
                        console.log(response)
                    });
                }

            },
            filterResultData: _.debounce(
                function () {
                    this.$axios.get(API_URL + "employees", {
                        params: {
                            trade: this.formInline.trade,
                            email: this.formInline.lastName,
                        }
                    }).then((response) => {
                        response.data['trade'] = this.formInline.trade;
                        response.data['lastName'] = this.formInline.lastName;
                        Bus.$emit('filterResultData', response.data);
                        console.log(response.data);
                    }).catch(function (response) {
                        console.log(response)
                    });

                },
                500
            ),
        }
    }


</script>