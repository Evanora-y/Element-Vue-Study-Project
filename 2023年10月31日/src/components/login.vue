<template>
    <div class="containter">



        <el-card shadow="always">

            <el-form ref="userloginfrom" :model="userdate" :rules="rules">


                <el-form-item label="账号" prop="username">
                    <el-input v-model="userdate.username" />
                </el-form-item>


                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userdate.password" />
                </el-form-item>

            </el-form>

            <el-button  @click="sendLogin()" type="primary">登录</el-button>





        </el-card>



    </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'


export default {

    data() {

        return {


            userdate: {
                username: "admin",
                password: "123456"

            }
        }
    },
    methods: {

        async sendLogin() {


            console.log("点击已经处理");

            const { data: res } = await axios.post("login", this.userdate)

            if (res.meta.status != 200) {

                return ElMessage({ message: '登录失败', type: 'warning', })

            }



            ElMessage({ message: '登录成功', type: 'success', })

            window.sessionStorage.setItem('token', res.data.token)

            this.$router.push("/welcome")


        }
    }


}

</script>

<style scoped>
.containter {

    background-image: url(../assets/images/pexels-pixabay-220182.jpg);
}


.el-card {


    width: 200px;
    height: 200px;

    position: absolute;

    top: 0;
    left: 50%;
    transform: translate(-50%, +100%);

    text-align: center;

}

.avater {


    height: 60px;

}

.el-input {

    width: 150px;
}

.el-button{

    margin-top: 20px;
}
</style>