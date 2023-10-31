<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>



    <el-card class="box-card">




        <el-button style="margin-top: 25px;" type="primary" @click="addrolefun()">添加角色</el-button>



        <el-table :data="rolevalue" :border="parentBorder" style="width: 100%">
            <el-table-column type="expand">
                <template v-slot="scope">



                    <div v-if="scope.row.children.length === 0">

                        <el-tag>没有任何权限！</el-tag>
                    </div>


                    <el-row :class="['row_buttom']" v-for="(item1, il) in scope.row.children" :key="item1.id">

                        <!-- 第一级 -->
                        <el-col :span="3">

                            <el-tag closable @close="deleteRightsForRoles(scope.row.id, item1.id, scope.row)">{{
                                item1.authName
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

                                    <el-tag closable type="success"
                                        @close="deleteRightsForRoles(scope.row.id, item2.id, scope.row)">{{
                                            item2.authName }}</el-tag>
                                    <el-icon>
                                        <CaretRight />
                                    </el-icon>




                                </el-col>

                                <!-- 第二级子二级 -->
                                <el-col :span="30" v-for="(item3, i3) in item2.children" :key="item3.id">

                                    <!-- {{ scope.row.id}}
                                    {{ item3.id}} -->
                                    <el-tag closable type="warning"
                                        @close="deleteRightsForRoles(scope.row.id, item3.id, scope.row)">{{
                                            item3.authName }}</el-tag>



                                </el-col>
                                <el-divider />
                            </el-row>


                        </el-col>

                    </el-row>




                </template>
            </el-table-column>
            <el-table-column label="#" type="index" />
            <el-table-column label="角色名称" prop="roleName" />
            <el-table-column label="角色描述" prop="roleDesc" />
            <el-table-column label="可用操作" prop="name">

                <template v-slot="scope">



                    <!-- 修改按钮 -->
                    <el-button type="primary" @click="changerolefun(scope.row.id)">修改</el-button>



                    <!-- role按钮 -->
                    <el-button type="info">分配权限</el-button>


                    <!-- 删除按钮 -->
                    <el-popconfirm width="200px" confirm-button-text="是" cancel-button-text="不" title="确定执行此操作？"
                        @confirm="delrole(scope.row.id)">
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>


            </el-table-column>
        </el-table>



    </el-card>




    <el-dialog v-model="dialogVisible" :title="dialogtitle" width="30%" :before-close="handleClose">


        <el-form :model="roledataentity" label-width="120px">

            <el-form-item label="角色名称">
                <el-input v-model="roledataentity.roleName" />
            </el-form-item>

            <el-form-item label="角色描述">
                <el-input v-model="roledataentity.roleDesc" />
            </el-form-item>



        </el-form>


        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="sentRoleDate()">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<script>


import { ElMessage } from 'element-plus'
import axios from 'axios'



export default {

    created() {


        this.getrolelist()

    },


    data() {

        return {



            rolevalue: [],
            dialogVisible: false,
            dialogVisibletitle: '',
            roledataentity: {

                roleName: "",
                roleDesc: '',
                //角色的id
                id: '',
                rolePermissionDesc: []
            },
            dialogtitle: ''


        }
    },
    methods: {




        //请求列表
        async getrolelist() {


            const { data: res } = await axios.get(`roles`)


            if (res.meta.status != 200) {

                return ElMessage({

                    type: 'warning',
                    message: res.meta.msg
                })

            }

            this.rolevalue = res.data


            console.log(res);



        },

        //删除角色
        async delrole(id) {

            const { data: res } = await axios.delete(`roles/${id}`)

            if (res.meta.status != 200) {


                return ElMessage({

                    type: 'warning',
                    message: res.meta.msg
                })


            }

            ElMessage({

                type: 'success',
                message: res.meta.msg
            })
            this.getrolelist()

        },

        // 添加角色弹出框标题设置
        addrolefun() {

            //清除之前的数据

            this.roledataentity.id = ''
            this.roledataentity.roleDesc = ''
            this.roledataentity.roleName = ''
            this.roledataentity.rolePermissionDesc = ''

            this.dialogtitle = '添加角色'

            this.dialogVisible = true
        },

        //发送提交数据
        async sentRoleDate() {

            if (this.dialogtitle === '添加角色') {

                const { data: res } = await axios.post(`roles`, this.roledataentity)

                if (res.meta.status != 201) {


                    return ElMessage({

                        type: 'warning',
                        message: res.meta.msg
                    })


                }

                ElMessage({

                    type: 'success',
                    message: res.meta.msg
                })
                this.getrolelist()
                this.dialogVisible = false

            }
            else {


                const { data: res } = await axios.put(`roles/${this.roledataentity.id}`, this.roledataentity)

                if (res.meta.status != 200) {


                    return ElMessage({

                        type: 'warning',
                        message: res.meta.msg
                    })


                }

                ElMessage({

                    type: 'success',
                    message: res.meta.msg
                })
                this.getrolelist()
                this.dialogVisible = false


            }


        },

        // 修改角色弹出框标题设置
        async changerolefun(id) {


            //清除之前的数据

            this.roledataentity.id = ''
            this.roledataentity.roleDesc = ''
            this.roledataentity.roleName = ''
            this.roledataentity.rolePermissionDesc = ''

            //开始数据回写

            const { data: res } = await axios.get(`roles/${id}`)

            if (res.meta.status != 200) {


                return ElMessage({

                    type: 'warning',
                    message: res.meta.msg
                })


            }


            console.log(res);

            this.roledataentity.roleName = res.data.roleName
            this.roledataentity.roleDesc = res.data.roleDesc
            this.roledataentity.id = res.data.roleId
            this.roledataentity.rolePermissionDesc = res.data.rolePermissionDesc






            this.dialogtitle = '修改角色'
            this.dialogVisible = true

        },

        // 删除角色指定权限
        async deleteRightsForRoles(roleId, rightId, resf) {

            const { data: res } = await axios.delete(`roles/${roleId}/rights/${rightId}`)
            if (res.meta.status !== 200) {
                ElMessage({ message: '取消权限失败', type: 'warning', })

                return

            }
            // this.getRightsList()
            resf.children = res.data

        },





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