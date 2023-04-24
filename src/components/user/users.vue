<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>

    </el-breadcrumb>

    <!-- 白板 -->
    <el-card class="box-card">




        <!-- 布局 -->
        <el-row :gutter="20">
            <el-col :span="7">

                <!-- 输入框 -->
                <el-input v-model="searchDate" placeholder="请输入" class="input-with-select">
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>

            </el-col>

            <!-- 添加用户 -->
            <el-col :span="4">

                <el-button type="primary">添加用户</el-button>

            </el-col>

        </el-row>


        <el-table :data="userlist" stripe style="width: 100%" border>
            <el-table-column type="index" label="#" width="50" />
            <el-table-column prop="username" label="姓名" width="180" />
            <el-table-column prop="email" label="邮箱" width="180" />
            <el-table-column prop="mobile" label="电话" width="180" />
            <el-table-column prop="role_name" label="角色" width="180" />
            <el-table-column prop="mg_state" label="状态" width="180" >
                
            </el-table-column>
            <el-table-column  label="操作" />
        </el-table>










    </el-card>
</template>


<script >
export default {
    created() {

        this.getUserList()


    },
    methods: {

        async getUserList() {

            const { data: res } = await this.$axios.get('users', { params: this.QueryInfo })
            if (res.meta.status !== 200) {
                ElMessage({ message: '获取列表失败，已强制退出！', type: 'warning', })

                window.sessionStorage.clear()
                this.$router.push("/login");
                return

            }
            console.log(res);

            this.userlist = res.data.users
            this.total = res.data.total
            console.log(this.userlist);
            console.log(this.total);


        }


    },


    data() {


        return {

            searchDate: '',
            QueryInfo: {

                query: '',
                pagenum: 1,
                pagesize: 2

            },
            userlist: [],
            total: 2




        }
    }
}

</script>

<script setup >


import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

</script>



<style scoped>

.el-table{


    margin-top: 20px;

}

/* .mt-4 {

    width: 300px;
} */


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