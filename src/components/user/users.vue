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
                <el-input v-model="QueryInfo.query" clearable @clear="getUserList()" placeholder="请输入"
                    class="input-with-select">
                    <template #append>
                        <el-button :icon="Search" @click="getUserList()" />
                    </template>
                </el-input>

            </el-col>

            <!-- 添加用户 -->
            <el-col :span="4">

                <el-button type="primary" @click="dialogVisible_addUser = true">添加用户</el-button>




            </el-col>

        </el-row>


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
                        <el-button type="primary" :icon="Edit" @click="dialogVisible_changeUser =true,changeFormDataId = scope.row.id" />
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


        <!-- 分页区域 -->
        <div class="demo-pagination-block">

            <el-pagination v-model:current-page="QueryInfo.pagenum" v-model:page-size="QueryInfo.pagesize"
                :page-sizes="[1, 2, 5, 10]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>



    </el-card>


    <!-- 弹出层-添加用户 -->
    <el-dialog v-model="dialogVisible_addUser" width="30%" title="添加用户">


        <el-form ref="addFormDataRef" :model="addFormData" :rules="addFormData_loginRules" label-width="70px">
            <el-form-item prop="username" label="用户名">
                <el-input v-model="addFormData.username" />
            </el-form-item>

            <el-form-item prop="email" label="邮箱">
                <el-input v-model="addFormData.email" />
            </el-form-item>

            <el-form-item prop="mobile" label="电话">
                <el-input v-model="addFormData.mobile" />
            </el-form-item>

            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="addFormData.password" />
            </el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible_addUser = false">取消</el-button>
                <!-- 触发提交 -->
                <el-button type="primary" @click="dialogVisible_addUser = false, PutAddUserDate()">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>


    <!-- ----------------------------------------- -->


    <!-- 弹出层-修改用户
    -->
    <el-dialog v-model="dialogVisible_changeUser" width="30%" title="修改用户">


        <el-form ref="changeFormDataRef" :model="changeFormData" :rules="changeFormData_loginRules" label-width="70px">


            <el-form-item prop="email" label="邮箱">
                <el-input v-model="changeFormData.email" />
            </el-form-item>

            <el-form-item prop="mobile" label="电话">
                <el-input v-model="changeFormData.mobile" />
            </el-form-item>



        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible_changeUser = false">取消</el-button>
                <!-- 触发提交 -->
                <el-button type="primary" @click="dialogVisible_changeUser = false, changeUser()">
                    更新
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<script >
export default {
    created() {

        this.getUserList()


    },
    methods: {

        // 获取列表
        async getUserList() {

            const { data: res } = await this.$axios.get('users', { params: this.QueryInfo })
            if (res.meta.status !== 200) {
                ElMessage({ message: '获取列表失败，已强制退出！', type: 'warning', })

                window.sessionStorage.clear()
                this.$router.push("/login");
                return

            }
            // console.log(res);

            this.userlist = res.data.users
            this.total = res.data.total
            // console.log(this.userlist);
            // console.log(this.total);


        },

        // 列表修改触发
        handleSizeChange(input) {
            // console.log(input);
            this.QueryInfo.pagesize = input
            this.getUserList()


        },

        // 列表修改触发
        handleCurrentChange(input) {
            // console.log(input);
            this.QueryInfo.pagenum = input
            this.getUserList()


        },

        // 用户状态修改
        async userStateChangesd(input) {


            const { data: res } = await this.$axios.put(`users/${input.id}/state/${input.mg_state}`)

            if (res.meta.status !== 200) {
                ElMessage({ message: '修改失败', type: 'warning', })


                input.mg_state = !input.mg_state
                return

            }



        },

        // 添加用户
        async PutAddUserDate() {

            const { data: res } = await this.$axios.post('users', this.addFormData)

            if (res.meta.status !== 201) {
                ElMessage({ message: '添加用户失败！', type: 'warning', })


                return

            }
            ElMessage({ message: '添加用户成功！', type: 'success', })

            // 清空数据
            for (let index = 0; index < this.addFormData.length; index++) {
                this.addFormData[index] = ''
                // console.log();
                
            }
            
            this.getUserList()
        },


        // 删除用户模块
        async deleteUser(id) {

            const { data: res } = await this.$axios.delete(`users/${id}`)

            if (res.meta.status !== 200) {
                ElMessage({ message: '删除用户失败！', type: 'warning', })


                return

            }
            ElMessage({ message: '删除用户成功！', type: 'success', })
            this.getUserList()

        },

        // 修改用户模块

        async changeUser() {

            const { data: res } = await this.$axios.put(`users/${this.changeFormDataId}`,this.changeFormData)

            if (res.meta.status !== 200) {
                ElMessage({ message: '修改用户失败！', type: 'warning', })


                return

            }
            ElMessage({ message: '修改用户成功！', type: 'success', })
            this.getUserList()


        }


    },


    data() {


        return {


            QueryInfo: {

                query: '',
                pagenum: 1,
                pagesize: 2

            },
            userlist: [],
            total: 2,
            dialogVisible_addUser: false,
            dialogVisible_changeUser:false,
            addFormData: {
                username: '',
                password: '',
                email: '',
                mobile: ''



            },
            changeFormData:{
                email: '',
                mobile: ''


            },
            changeFormDataId:0,
            changeFormData_loginRules:{

                email: [

                    { required: false, message: '请输入邮箱', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur' },

                ],
                mobile: [

                    { required: false, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度是11位有效数字', trigger: 'blur' },

                ],


            },
            addFormData_loginRules: {
                username: [

                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur' },
                ],
                password: [

                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur' },

                ],
                email: [

                    { required: false, message: '请输入邮箱', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur' },

                ],
                mobile: [

                    { required: false, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度是11位有效数字', trigger: 'blur' },

                ],
            }




        }
    }
}

</script>

<script setup >


// import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { Delete, Edit, Search, Setting } from '@element-plus/icons-vue'

</script>



<style scoped>
.demo-pagination-block {

    margin-top: 20px;
}

.el-table {


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