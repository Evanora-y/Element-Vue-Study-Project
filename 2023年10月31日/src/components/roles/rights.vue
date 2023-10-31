<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>



    <el-card class="box-card">



        <el-table :data="thegetlist" style="width: 100%">
            <el-table-column label="#" prop="id" />
            <el-table-column prop="authName" label="商品名称" />
            <el-table-column prop="path" label="路径" />
            <el-table-column prop="level" label="权限等级">

                <template v-slot="scope">

                    <el-tag v-if="scope.row.level === '0'" type="danger">一级权限</el-tag>
                    <el-tag v-if="scope.row.level === '1'" type="warning">二级级权限</el-tag>
                    <el-tag v-if="scope.row.level === '2'" type="info">三级级权限</el-tag>

                </template>


            </el-table-column>
        </el-table>




    </el-card>
</template>


<script>


import { ElMessage } from 'element-plus'
import axios from 'axios'



export default {


    created() {

        this.getlist()



    },


    data() {

        return {


            thegetlist: []


        }
    },
    methods: {



        async getlist() {

            const { data: res } = await axios.get(`rights/list`)
            console.log(res);
            if (res.meta.status != 200) {

                ElMessage({

                    type: 'warning',
                    message: res.meta.msg
                })
            }

            this.thegetlist = res.data

        }


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