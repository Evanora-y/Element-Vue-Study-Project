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
                        <el-button type="primary" :icon="Edit"
                            @click="dialogVisible_changeUser = true, changeFormDataId = scope.row.id" />
                    </el-tooltip>

                    <!-- 删除 -->
                    <el-tooltip class="box-item" effect="dark" content="删除用户" placement="top" :enterable="false">
                        <el-button type="danger" :icon="Delete" @click="deleteUser(scope.row.id)" />
                    </el-tooltip>

                    <!-- 分配角色 -->

                    <el-tooltip class="box-item" effect="dark" content="分配角色" placement="top" :enterable="false">
                        <!-- {{scope.row}} -->
                        <el-button type="warning" :icon="Setting" @click="AssigningRolesPre(), AssigningRolesDatePre =
                            {
                                id: scope.row.id,
                                name: scope.row.username,
                                roles: scope.row.role_name
                            }" />
                    </el-tooltip>


                </template>
                <!-- 修改 -->


            </el-table-column>
        </el-table>


        <!-- 分页区域 -->
        <div class="demo-pagination-block">

            <el-pagination v-model:current-page="QueryInfo.pagenum" v-model:page-size="QueryInfo.pagesize"
                :page-sizes="[4, 8, 16, 32]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>



    </el-card>


    <!-- 弹出层-添加用户 -->
    <el-dialog v-model="dialogVisible_addUser" width="30%" title="添加用户" @close="clearDialofForm_add()">


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
                <el-button type="primary" @click="addUserPreChaeck()">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>


    <!-- ----------------------------------------- -->


    <!-- 弹出层-修改用户
    -->
    <el-dialog v-model="dialogVisible_changeUser" width="30%" title="修改用户" @close="clearDialofForm_change()">


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



    <!-- ----------------------------------------- -->


    <!-- 弹出层-分配角色
    -->
    <el-dialog v-model="dialogVisible_AssigningRoles" width="30%" title="分配角色" @close="clearDialofForm_AssigningRoles()">


        <el-form ref="AssigningRolesRef" :model="changeFormData" :rules="changeFormData_loginRules" label-width="70px">


            <!-- {{AssigningRolesDatePre}} -->

            当前的名称：
            {{ AssigningRolesDatePre.name }}
            <br><br>
            当前的角色：
            {{ AssigningRolesDatePre.roles }}

            <br><br>

            变更为：
            <el-select v-model="rolesis" :placeholder="AssigningRolesDatePre.roles" size="large">
                <el-option v-for="item in Select_options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>


        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible_AssigningRoles = false">取消</el-button>
                <!-- 触发提交 -->
                <el-button type="primary" @click="AssigningRoles(AssigningRolesDatePre.id)">
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

            const { data: res } = await this.$axios.put(`users/${this.changeFormDataId}`, this.changeFormData)

            if (res.meta.status !== 200) {
                ElMessage({ message: '修改用户失败！', type: 'warning', })


                return

            }
            ElMessage({ message: '修改用户成功！', type: 'success', })
            this.getUserList()


        },

        // 弹出层关闭之后清空表单
        clearDialofForm_add() {

            this.$refs.addFormDataRef.resetFields()
            // this.$refs.changeFormDataRef.resetFields()
        },
        clearDialofForm_change() {

            // this.$refs.addFormDataRef.resetFields()
            this.$refs.changeFormDataRef.resetFields()
        },

        // 添加用户预校验
        addUserPreChaeck() {

            this.$refs.addFormDataRef.validate(valid => {


                // console.log(valid);
                if (valid) {


                    this.dialogVisible_addUser = false

                    // 发起请求
                    this.PutAddUserDate()

                }

            })

        },

        // 关闭弹出层之后清空数据
        clearDialofForm_AssigningRoles() {

            this.AssigningRolesDatePre.id = '';
            this.AssigningRolesDatePre.name = '';
            this.AssigningRolesDatePre.roles = '';


            
            this.Select_options = []

            // this.AssigningRolesDatePre ={}

            // AssigningRolesDatePre
        },

        // 分配角色预处理
        async AssigningRolesPre() {

            const { data: res } = await this.$axios.get(`roles`)

            if (res.meta.status !== 200) {
                ElMessage({ message: '角色列表获取失败！', type: 'warning', })


                return

            }

            for (var i = 0; i < res.data.length; i++) {

                this.Select_options.push({
                    value: res.data[i].id,
                    label: res.data[i].roleName
                })

            }

            this.dialogVisible_AssigningRoles = true


        },

        // 分配角色
        async AssigningRoles(id) {

            const { data: res } = await this.$axios.put(`users/${id}/role`, { rid: this.rolesis })

            if (res.meta.status !== 200) {
                ElMessage({ message: '分配角色失败！', type: 'warning', })


                return

            }


            this.dialogVisible_AssigningRoles = false
            this.clearDialofForm_AssigningRoles()
            this.getUserList()


        },




    },


    data() {


        return {


            QueryInfo: {

                query: '',
                pagenum: 1,
                pagesize: 4

            },
            userlist: [],
            total: 2,
            dialogVisible_addUser: false,
            dialogVisible_changeUser: false,
            dialogVisible_AssigningRoles: false,
            AssigningRolesDatePre: {
                id: '',
                name: '',
                roles: ''
            },
            addFormData: {
                username: '',
                password: '',
                email: '',
                mobile: ''



            },
            changeFormData: {
                email: '',
                mobile: ''


            },
            changeFormDataId: 0,
            changeFormData_loginRules: {

                email: [
                    { required: false, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
                    // 自定义校验规则
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('邮箱不能为空'));
                            } else {
                                callback();
                            }
                        },
                        trigger: ['blur', 'change']
                    }
                ],
                mobile: [
                    { required: false, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
                ]


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
                    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
                    // 自定义校验规则
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('邮箱不能为空'));
                            } else {
                                callback();
                            }
                        },
                        trigger: ['blur', 'change']
                    }
                ],
                mobile: [
                    { required: false, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
                ]
            },


            // 分配角色的下拉选单的预加载数据
            Select_options: [],

            // 分配角色需要确认的id号（角色id）

            rolesis: '',




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