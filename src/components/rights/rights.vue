<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>

    </el-breadcrumb>



    <!-- 白板 -->
    <el-card class="box-card">


        <el-table :data="userlist" stripe style="width: 100%" border>
            <el-table-column type="index" label="#" width="70" />
            <el-table-column prop="username" label="姓名" width="180" />
            <el-table-column prop="email" label="邮箱" width="200" />
            <el-table-column prop="mobile" label="电话" width="200" />
            <el-table-column prop="role_name" label="角色" width="180" />
            <el-table-column label="状态" width="150">
                <template v-slot="scope">
                    <el-switch v-model="scope.row.mg_state" @change="userStateChangesd(scope.row)" />
                    <!-- {{scope.row}} -->

                </template>
            </el-table-column>
            <el-table-column label="操作">

                <template v-slot="scope">

                    <el-tooltip class="box-item" effect="dark" content="修改用户" placement="top" :enterable="false">
                        <el-button type="primary" :icon="Edit"
                            @click="dialogVisible_changeUser = true, changeFormDataId = scope.row.id" />
                    </el-tooltip>

                    <!-- 删除 -->
                    <el-tooltip class="box-item" effect="dark" content="删除用户" placement="top" :enterable="false">
                        <el-button type="danger" :icon="Delete" @click="deleteUser(scope.row.id)" />
                    </el-tooltip>

                    <!-- 分配角色 -->

                    <el-tooltip class="box-item" effect="dark" content="分配角色" placement="top" :enterable="false">
                        <el-button type="warning" :icon="Setting" />
                    </el-tooltip>


                </template>
                <!-- 修改 -->


            </el-table-column>
        </el-table>





    </el-card>
</template>


<script setup >


import { ElMessage } from 'element-plus'
import { Delete, Edit, Search, Setting } from '@element-plus/icons-vue'

</script>



<style scoped>
.box-card {

    margin-top: 20px;
}
</style>