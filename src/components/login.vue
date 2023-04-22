<template>
    <div class="login_container">

        <div class="app_box">


            <!-- 头像 -->
            <div class="login_avatar">

                <img class="img_login_avatar" src="../assets/images/mmexport1657192733902.png" alt="">

            </div>


            <!-- 表单 -->
            <el-form ref="resetLoginFormRef" :model="login_from_data" :rules="form_loginRules" label-width="70px" class="form_login">
                <el-form-item prop="username" label="账号">
                    <el-input v-model="login_from_data.username" class="input" />
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" v-model="login_from_data.password" class="input" />
                </el-form-item>
                <el-form-item>


                    <el-row class="mb-4">

                        <el-button type="primary" @click="resetLoginForm">重置</el-button>
                        <el-button type="success" @click="validateLoginForm">登录</el-button>

                    </el-row>
                </el-form-item>
            </el-form>
        </div>


    </div>
</template>




<script>

export default {


    // 解决已登录之后进入登录页面的问题
    created(){
        

        const checkout =  window.sessionStorage.getItem("token")
        if(!checkout) return
        if(checkout) this.$router.push("/home");

    },

    data() {

        return {

            login_from_data: {

                username: 'admin',
                password: '123456',
            },

            form_loginRules: {

                username:[

                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur' },
                ],
                password:[

                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur' },

                ]
            }

        }
    },
    methods:{


        // 重置函数
        resetLoginForm(){

            this.$refs.resetLoginFormRef.resetFields()
        },
        // 登录
        validateLoginForm(){

            this.$refs.resetLoginFormRef.validate(async valid =>{
                if(!valid) return;
                if(!valid) return;
                const {data:res} =await this.$axios.post("login",this.login_from_data);
                if(res.meta.status != 200){

                    return ElMessage({message: '登录失败',type: 'warning',})
                    
                }
                ElMessage({message: '登录成功',type: 'success',})
                window.sessionStorage.setItem("token",res.data.token);
                this.$router.push("/home");
                

            })
        }

    }
}





</script>


<script setup>
import { ElMessage } from 'element-plus'

</script>



<style scoped>
.login_container {

    background-image: url('../assets/images/pexels-pixabay-220182.jpg');
}

.app_box {

    height: 300px;
    width: 500px;
    background-color: rgb(255, 255, 255);
    position: absolute;
    left: 50%;
    right: 50%;
    top: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%);
}

.img_login_avatar {

    height: 100px;
    border-radius: 50px;
}

.login_avatar {

    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
}

.form_login {


    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
}

.input {

    width: 250px;
}
</style>