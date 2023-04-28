<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>

    </el-breadcrumb>



    <!-- 白板 -->
    <el-card class="box-card">


        <el-table :data="rightslist" stripe style="width: 100%" border>
            <el-table-column type="index" label="#" width="70" />
            <el-table-column prop="authName" label="权限名称" />
            <el-table-column prop="path" label="路径" />
            <el-table-column label="权限等级">


                <template v-slot="level">

                    <!-- {{ level.row.level}} -->

                    <el-tag v-if="level.row.level === '2'" type="info">三级权限</el-tag>
                    <el-tag v-if="level.row.level === '1'" type="warning">二级权限</el-tag>
                    <el-tag v-if="level.row.level === '0'" type="danger">一级权限</el-tag>


                </template>

            </el-table-column>




        </el-table>





    </el-card>
</template>

<script>

export default {

    created() {

        this.getRightsList()
    },

    data() {


        return {

            rightslist: []

        }
    },

    methods: {


        async getRightsList() {


            const { data: res } = await this.$axios.get('rights/list')
            if (res.meta.status !== 200) {
                ElMessage({ message: '获取列表失败，已强制退出！', type: 'warning', })

                window.sessionStorage.clear()
                this.$router.push("/login");
                return

            }

            // console.log(res);
            this.rightslist = res.data


        }
    }
}



</script>


<script setup >


import { ElMessage } from 'element-plus'
// import { Delete, Edit, Search, Setting } from '@element-plus/icons-vue'

</script>



<style scoped>
.box-card {

    margin-top: 20px;
}
</style>