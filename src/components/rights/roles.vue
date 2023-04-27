<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>

    </el-breadcrumb>



    <!-- 白板 -->
    <el-card class="box-card">

        <el-button class="addroles" @click="dialogVisible_addRoles = true" type="primary">添加角色</el-button>


        <el-table :data="rightslist" stripe style="width: 100%" border>
            <el-table-column label="" width="70" />
            <el-table-column type="index" label="#" width="70" />
            <el-table-column prop="roleName" label="角色名称" />
            <el-table-column prop="roleDesc" label="角色描述" />
            <el-table-column label="操作">

                <template v-slot="scope">
                    <!-- {{scope.row.id }} -->

                    <el-button type="primary" :icon="Edit"
                        @click="dialogVisible_changeUser = true, changeFormDataId = scope.row.id">编辑</el-button>

                    <!-- 删除 -->
                    <el-button type="danger" :icon="Delete" @click="deleteRoles(scope.row.id)">删除</el-button>

                    <!-- 分配角色 -->

                    <el-button type="warning" :icon="Setting">分配权限</el-button>



                </template>


            </el-table-column>




        </el-table>





    </el-card>



    <!-- --------------------------------- -->



    <!-- 弹出层-添加用户 （未设计）-->
    <el-dialog v-model="dialogVisible_addRoles" width="30%" title="添加角色" @close="clearDialofForm_addRoles()">


        <el-form ref="addRolesDateRef" :model="addRolesDate" :rules="addFormData_addRolesDate" label-width="70px">
            <el-form-item prop="roleName" label="名称">
                <el-input v-model="addRolesDate.roleName" />
            </el-form-item>

            <el-form-item prop="roleDesc" label="描述">
                <el-input v-model="addRolesDate.roleDesc" />
            </el-form-item>


        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible_addRoles = false">取消</el-button>
                <!-- 触发提交 -->
                <el-button type="primary" @click="addRolesDatePreChaeck()">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>

export default {

    created() {

        this.getRightsList()
    },

    data() {


        return {

            rightslist: [],

            addRolesDate: {

                roleName: '',
                roleDesc: ''
            },
            dialogVisible_addRoles: false,
            addFormData_addRolesDate: {


                roleName: [

                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur' },
                ],
                roleDesc: [

                    { required: true, message: '请输入角色描述', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在3到20之间', trigger: 'blur' },

                ],
            }

        }
    },

    methods: {


        async getRightsList() {


            const { data: res } = await this.$axios.get('roles')
            if (res.meta.status !== 200) {
                ElMessage({ message: '获取列表失败，已强制退出！', type: 'warning', })

                window.sessionStorage.clear()
                this.$router.push("/login");
                return

            }

            // console.log(res);
            this.rightslist = res.data


        },

        // 添加角色
        async addRightsList() {


            const { data: res } = await this.$axios.post('roles', this.addRolesDate)
            if (res.meta.status !== 201) {
                ElMessage({ message: '添加角色失败', type: 'warning', })

                return

            }

            // console.log(res);
            this.getRightsList()


        },
        clearDialofForm_addRoles() {

            this.$refs.addRolesDateRef.resetFields()

        },
        addRolesDatePreChaeck() {

            this.$refs.addRolesDateRef.validate(valid => {


                // console.log(valid);
                if (valid) {


                    this.dialogVisible_addRoles = false

                    // 发起请求
                    this.addRightsList()

                }

            })
        },

        async deleteRoles(id) {


            const { data: res } = await this.$axios.delete(`roles/${id}`)
            if (res.meta.status !== 200) {
                ElMessage({ message: '删除角色失败', type: 'warning', })

                return

            }

            // console.log(res);
            this.getRightsList()


        },
    }
}



</script>


<script setup >


import { ElMessage } from 'element-plus'
import { Delete, Edit, Search, Setting } from '@element-plus/icons-vue'

</script>



<style scoped>
.box-card {

    margin-top: 20px;
}

.addroles {

    margin-bottom: 20px;
}
</style>