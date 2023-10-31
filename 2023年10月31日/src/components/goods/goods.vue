<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>



    <el-card class="box-card">








    </el-card>
</template>


<script>


import { ElMessage } from 'element-plus'
import axios from 'axios'



export default {


    created() {

  



    },


    data() {

        return {


        


        }
    },
    methods: {





    }






}


</script>


<style scoped>
.box-card {


    margin-top: 30px;

    /* height: 550px; */
}

.input_search {


    width: 250px;
    margin-right: 30px;
    margin-top: 25px;
}


.el-table {

    margin-top: 30px;
}

.el-pagination {

    margin-top: 30px;
}

.el-divider {

    margin: 5px;
}
</style>