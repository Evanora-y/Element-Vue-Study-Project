<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card class="box-card">



        <el-input class="input_search" v-model="getuserlist.query" placeholder="请输入">
        </el-input>

        <el-button style="margin-top: 25px;" type="primary" @click="getuserlistfun()">搜索用户</el-button>

        <el-button style="margin-top: 25px;" type="primary" @click="addUser()">添加用户</el-button>


        <el-table :data="getuserlistdate" style="width: 100%">
            <el-table-column type="index"  label="#" width="80" />


            <el-table-column prop="username" label="姓名" width="180" />

            <el-table-column prop="email" label="邮箱" width="230" />

            <el-table-column prop="mobile" label="电话" width="230" />

            <el-table-column prop="role_name" label="角色" width="230" />

            <el-table-column prop="mg_state" label="状态" width="180">

                <template v-slot="scope">

                    <el-switch v-model="scope.row.mg_state"
                        @change="changeSwitchhandle(scope.row.id, scope.row.mg_state)" />
                </template>

            </el-table-column>
            <el-table-column prop="address" label="操作">

                <template v-slot="scope">



                    <!-- 修改按钮 -->
                    <el-button type="primary" @click="changeUser(scope.row.id)">修改</el-button>



                    <!-- role按钮 -->
                    <el-button type="info"
                        @click="changeroles(scope.row.id, scope.row.role_name, scope.row.username)">权限</el-button>


                    <!-- 删除按钮 -->
                    <el-popconfirm width="200px" confirm-button-text="是" cancel-button-text="不" title="确定执行此操作？"
                        @confirm="deleteuser(scope.row.id)">
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>

            </el-table-column>
        </el-table>




        <el-pagination background layout="prev, pager, next" :total="userlistrsp.total"
            v-model:current-page="getuserlist.pagenum" :page-size="getuserlist.pagesize" @click="handleCurrentChange()" />






    </el-card>


    <!-- 账号新增修改对话框 -->

    <el-dialog v-model="dialogVisible" :title="dialogVisibletitle" width="30%" :before-close="handleClose">


        <el-form :model="userdataentity" label-width="120px">

            <el-form-item label="用户名">
                <el-input :disabled="username_password_is_disable" v-model="userdataentity.username" />
            </el-form-item>

            <el-form-item label="邮箱">
                <el-input v-model="userdataentity.email" />
            </el-form-item>

            <el-form-item label="电话">
                <el-input v-model="userdataentity.mobile" />
            </el-form-item>

            <el-form-item label="密码">
                <el-input :disabled="username_password_is_disable" type="password" v-model="userdataentity.password" />
            </el-form-item>

        </el-form>


        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="sentUserDate(dialogVisibletitle)">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>




    <!-- 账号角色修改对话框 -->

    <el-dialog v-model="rolesdialogVisible" title="角色修改" width="30%" :before-close="handleClose">


        <el-form :model="userdataentity" label-width="120px">

            <el-form-item label="用户名">
                <el-input disabled="true" v-model="roleentity.name" />
            </el-form-item>


            <el-form-item label="权限名">
                <el-input disabled="true" v-model="roleentity.role_name" />
            </el-form-item>



            <el-form-item label="新权限">

                <el-select v-model="roleentity.rolevalueselect" class="m-2" placeholder="Select">
                    <el-option v-for="item in rolevalue" :key="item.id" :label="item.roleName" :value="item.id" />
                </el-select>


            </el-form-item>

        </el-form>


        <template #footer>
            <span class="dialog-footer">
                <el-button @click="rolesdialogVisible = false">取消</el-button>
                <el-button type="primary" @click="sentroleDate()">
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

        this.getuserlistfun();

    },


    data() {

        return {


            getuserlist: {

                query: '',
                pagenum: 1,
                pagesize: 6
            },

            //用户列表的数据
            getuserlistdate: [],

            //列表请求的响应参数
            userlistrsp: {

                pagenum: '',
                total: ''
            },
            // 删除的确认框的显示属性
            deleteUserListvisible: false,


            // 修改新增对话可见性
            dialogVisible: false,

            dialogVisibletitle: '',

            userdataentity: {

                username: '',
                email: '',
                mobile: '',
                password: ''
            },
            needChangeId: '',
            username_password_is_disable: false,
            rolesdialogVisible: false,

            roleentity: {

                id: '',
                role_name: '',
                name: '',
                rolevalueselect: ''

            },

            rolevalue: [],






        }
    },
    methods: {



        async getuserlistfun() {


            const { data: res } = await axios.get("users", { params: this.getuserlist })

            if (res.meta.status != 200) {

                return ElMessage({

                    message: '后台用户列表获取失败',
                    type: 'warning'
                })
            }

            this.getuserlistdate = res.data.users
            this.userlistrsp.pagenum = res.data.pagenum
            this.userlistrsp.total = res.data.total
            console.log(res);
        },

        //改变状态
        async changeSwitchhandle(id, data) {

            console.log(data);


            const { data: res } = await axios.put(`users/${id}/state/${data}`)

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



        },

        //改变页码
        handleCurrentChange() {



            this.getuserlistfun()
        },

        //删除用户
        async deleteuser(id) {

            const { data: res } = await axios.delete(`users/${id}`)


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


            // 刷新页面

            this.getuserlistfun();
        },


        // 新增用户
        addUser() {

            this.userdataentity.email = ''
            this.userdataentity.mobile = ''
            this.userdataentity.password = ''
            this.userdataentity.username = ''

            this.username_password_is_disable = false

            this.dialogVisibletitle = '新增用户'
            this.dialogVisible = true

        },

        // 修改用户
        async changeUser(id) {


            this.userdataentity.email = ''
            this.userdataentity.mobile = ''
            this.userdataentity.password = ''
            this.userdataentity.username = ''

            // 禁用填充

            this.username_password_is_disable = true


            // 修改用户需要回写数据

            // 回写数据
            const { data: res1 } = await axios.get(`users/${id}`)

            console.log(res1);

            if (res1.meta.status != 200) {

                return ElMessage({

                    type: 'warning',
                    message: res1.meta.msg
                })

            }

            this.userdataentity.email = res1.data.email
            this.userdataentity.mobile = res1.data.mobile
            this.userdataentity.username = res1.data.username
            this.needChangeId = res1.data.id



            this.dialogVisibletitle = '修改用户'
            this.dialogVisible = true
        },

        // 提交数据
        async sentUserDate(dialogVisibletitle) {


            // 新增用户
            if (dialogVisibletitle === '新增用户') {

                console.log("新增用户");

                const { data: res } = await axios.post(`users`, this.userdataentity)


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



                this.dialogVisible = false

                this.getuserlistfun()

            }
            else {

                console.log("修改用户");


                // 提交编辑
                const { data: res } = await axios.put(`users/${this.needChangeId}`, this.userdataentity)


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



                this.dialogVisible = false

                this.getuserlistfun()

            }



        },

        //修改角色预处理
        changeroles(id, role_name, name) {

            //开始获取权限列表
            this.getrolelist()

            // 下发已经得到的用户信息
            this.roleentity.id = id
            this.roleentity.role_name = role_name
            this.roleentity.name = name

            this.rolesdialogVisible = true


            
            
        },

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
        async sentroleDate() {

            // roleentity



            const { data: res } = await axios.put(`users/${this.roleentity.id}/role`,{rid:this.roleentity.rolevalueselect})


            console.log(res);

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


            this.rolesdialogVisible = false


            this.getuserlistfun()

        }




    }






}


</script>


<style scoped>
.box-card {


    margin-top: 30px;

    height: 550px;
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



/* 暂时禁用 */
/* 
.el-form-item{

    width: 350px;
} */
</style>