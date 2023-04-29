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
            <el-table-column type="expand" label="" width="70">
                <template v-slot="scope">



                    <div v-if="scope.row.children.length === 0">

                        <el-tag>没有任何权限！</el-tag>
                    </div>


                    <el-row :class="['row_buttom']" v-for="(item1, il) in scope.row.children" :key="item1.id">

                        <!-- 第一级 -->
                        <el-col :span="3">

                            <el-tag closable @close="deleteRightsForRoles(scope.row.id, item1.id,scope.row)">{{ item1.authName
                            }}</el-tag>
                            <el-icon>
                                <CaretRight />
                            </el-icon>



                        </el-col>


                        <!-- 第二级 -->
                        <el-col :span="21">
                            <!-- <pre>{{ item1.children }}</pre> -->


                            <el-row :class="['row_buttom']" v-for="(item2, i2) in item1.children" :key="item2.id">


                                <!-- 第二级子一级 -->
                                <el-col :span="3">

                                    <el-tag closable type="success" @close="deleteRightsForRoles(scope.row.id, item2.id,scope.row)">{{
                                        item2.authName }}</el-tag>
                                    <el-icon>
                                        <CaretRight />
                                    </el-icon>




                                </el-col>

                                <!-- 第二级子二级 -->
                                <el-col :span="30" v-for="(item3, i3) in item2.children" :key="item3.id">

                                    <!-- {{ scope.row.id}}
                                    {{ item3.id}} -->
                                    <el-tag closable type="warning" @close="deleteRightsForRoles(scope.row.id, item3.id,scope.row)">{{
                                        item3.authName }}</el-tag>



                                </el-col>
                            </el-row>
                        </el-col>

                    </el-row>




                </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="70" />
            <el-table-column prop="roleName" label="角色名称" />
            <el-table-column prop="roleDesc" label="角色描述" />
            <el-table-column label="操作">

                <template v-slot="scope">
                    <!-- {{scope.row.id }} -->

                    <el-button type="primary" :icon="Edit"
                        @click="dialogVisible_changeRoles = true, dialogVisible_changeRoles_id = scope.row.id">编辑</el-button>

                    <!-- 删除 -->
                    <el-button type="danger" :icon="Delete" @click="deleteRoles(scope.row.id)">删除</el-button>

                    <!-- 分配角色 -->

                    <el-button type="warning" @click="dialogVisible_changeRights =true" :icon="Setting">分配权限</el-button>



                </template>


            </el-table-column>




        </el-table>





    </el-card>



    <!-- --------------------------------- -->



    <!-- 弹出层-添加角色-->
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


    <!-- --------------------------------- -->



    <!-- 弹出层-编辑角色 -->
    <el-dialog v-model="dialogVisible_changeRoles" width="30%" title="编辑角色" @close="clearDialofForm_changeRoles()">


        <el-form ref="changeRolesDateRef" :model="changeRolesDate" :rules="addFormData_addRolesDate" label-width="70px">
            <el-form-item prop="roleName" label="名称">
                <el-input v-model="changeRolesDate.roleName" />
            </el-form-item>

            <el-form-item prop="roleDesc" label="描述">
                <el-input v-model="changeRolesDate.roleDesc" />
            </el-form-item>


        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible_changeRoles = false">取消</el-button>
                <!-- 触发提交 -->
                <el-button type="primary" @click="changeRolesDatePreChaeck()">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>


        <!-- --------------------------------- -->

            <!-- 弹出层-编辑权限 -->
    <el-dialog v-model="dialogVisible_changeRights" width="30%" title="编辑权限" @close="clearDialofForm_changeRoles()">


<el-form ref="changeRightsDateRef" :model="changeRightsDate" :rules="FormData_addRightsDate" label-width="70px">
    <el-form-item prop="roleName" label="名称">
        <el-input v-model="changeRolesDate.roleName" />
    </el-form-item>

    <el-form-item prop="roleDesc" label="描述">
        <el-input v-model="changeRolesDate.roleDesc" />
    </el-form-item>


</el-form>

<template #footer>
    <span class="dialog-footer">
        <el-button @click="dialogVisible_changeRights = false">取消</el-button>
        <!-- 触发提交 -->
        <el-button type="primary" @click="changeRightesDatePreChaeck()">
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
            changeRolesDate: {

                roleName: '',
                roleDesc: ''
            },
            dialogVisible_addRoles: false,
            dialogVisible_changeRoles: false,
            dialogVisible_changeRoles_id: 0,
            dialogVisible_changeRights:false,
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
            // console.log(res.data);


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
        clearDialofForm_changeRoles() {


            this.$refs.changeRolesDateRef.resetFields()
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

        // 删除角色指定权限
        async deleteRightsForRoles(roleId, rightId,resf) {

            const { data: res } = await this.$axios.delete(`roles/${roleId}/rights/${rightId}`)
            if (res.meta.status !== 200) {
                ElMessage({ message: '取消权限失败', type: 'warning', })

                return

            }
            // this.getRightsList()
            resf.children = res.data

        },

        // 编辑角色信息
        changeRolesDatePreChaeck() {

            this.$refs.changeRolesDateRef.validate(valid => {

                if (!valid) return


                // console.log(valid);

                this.dialogVisible_changeRoles = false
                this.changeRolesDate_fun()

            })




        },

        async changeRolesDate_fun() {



            // 发起请求
            const { data: res } = await this.$axios.put(`roles/${this.dialogVisible_changeRoles_id}`, this.changeRolesDate)
            if (res.meta.status !== 200) {
                ElMessage({ message: '编辑提交角色失败', type: 'warning', })

                return

            }
            this.getRightsList()





        }





    }
}



</script>


<script setup >


import { ElMessage } from 'element-plus'
import { Delete, Edit, Search, Setting, CaretRight } from '@element-plus/icons-vue'

</script>



<style scoped>
.box-card {

    margin-top: 20px;
}

.addroles {

    margin-bottom: 20px;
}

.el-tag {

    margin: 7px;
}


.row_buttom {

    border-bottom: 1px solid #eee;
}

.row_top {

    border-bottom: 1px solid #eee;
}
</style>