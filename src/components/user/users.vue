<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>

    </el-breadcrumb>


    <el-card class="box-card">

        <div class="mt-4">
            <el-input v-model="searchDate" placeholder="请输入" class="input-with-select">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
        
    </el-card>
</template>


<script >
export default {



    data() {

        return {

            searchDate:''



        }
    }
}

</script>

<script setup >


import { Search } from '@element-plus/icons-vue'


</script>



<style scoped>

.mt-4{

    width: 300px;
}


.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}


.el-breadcrumb {

    margin-bottom: 15px;
}

.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}
</style>