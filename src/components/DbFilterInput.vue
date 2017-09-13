<template>
    <el-form :inline="true" :model="formInline">

        <!--<el-form-item label="Trade">-->
            <!--<el-select v-model="formInline.trade" clearable placeholder="Select trade">-->
                       <!--&lt;!&ndash;v-on:visible-change="selectDemo">&ndash;&gt;-->
                <!--<el-option-->
                        <!--v-for="item in type_options"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                <!--</el-option>-->
            <!--</el-select>-->
        <!--</el-form-item>-->

        <el-form-item label="Search">
            <el-input v-model="formInline.search" icon="search" type="text" placeholder="Enter search term"></el-input>
        </el-form-item>


    </el-form>
</template>

<script>
    import lodash, {debounce} from 'lodash'
    import Bus from '../eventBus'
    import { API_URL } from '../main'


    export default {
        name: 'db-filterinput',
        data() {
            return {
                type_options: [
                    {label: 'Carpenter', value: 'Carpenter'},
                    {label: 'Electrician', value: 'Electrician'},
                    {label: 'Welder', value: 'Welder'}
                    ],
                formInline: {
                    trade: '',
                    search: ''
                },
                formLabelWidth: '120px'
            }
        },

        watch: {
            'formInline.trade': 'filterResultData',
            'formInline.search': 'filterNameData'
        },

        methods: {
//            selectDemo: function (params) {
//                if (params) {
//                    this.$axios.get(API_URL + "employees/search/findByTrade" + this.formInline.trade)
//                        .then((response) => {
//                            this.type_options = response.data;
//                            console.log(response.data);
//                        }).catch(function (response) {
//                        console.log(response)
//                    });
//                }

//            },
            filterResultData: debounce(
                function () {

                    this.$axios.get(API_URL + "employees/search/findByTrade", {
                        params: {
                            trade: this.formInline.trade,
                        }
                    }).then((response) => {
                        let data = response.data._embedded.employees;
                        Bus.$emit('filterResultData', data);
                        console.log(response.data);
                    }).catch(function (response) {
                        console.log(response)
                    });

                },
                500
            ),

            filterNameData: debounce(
                function () {
                    this.$axios.get(API_URL +
                        "employees/search/findByFirstNameContainsIgnoreCaseOrLastNameContainsIgnoreCaseOrderByLastNameAsc", {
                        params: {
                            firstName: this.formInline.search,
                            lastName: this.formInline.search,
                        }
                    }).then((response) => {
                        let data = response.data._embedded.employees;
                        Bus.$emit('filterResultData', data);
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