<template>
    <el-container class="homr_container">
        <el-header>

            <img src="../assets/images/mmexport1657192733902.png" class="img_login_avatar" alt="">
            <span>电商管理后台</span>
            <el-button :plain="true" @click="logout">退出登录</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!-- 侧边栏 -->


                <el-menu background-color="#333744" text-color="#fff">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>菜单一</span>
                        </template>

                        <el-menu-item index="1-1">
                            <el-icon><icon-menu /></el-icon>
                            <span>子菜单</span>
                        </el-menu-item>



                    </el-sub-menu>


                    <el-menu-item index="2">
                        <el-icon><icon-menu /></el-icon>
                        <span>Navigator Two</span>
                    </el-menu-item>


                    <el-menu-item index="3" disabled>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>Navigator Three</span>
                    </el-menu-item>


                    <el-menu-item index="4">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>Navigator Four</span>
                    </el-menu-item>


                </el-menu>

                <!-- 侧边栏结束 -->


            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>


<!-- 引入模块 -->
<script setup>
import { ElMessage } from 'element-plus'

</script>





<script>

export default {
    created(){

        this.getmenuList();

    },

    methods: {

        logout() {

            window.sessionStorage.clear()
            this.$router.push('/login')
            ElMessage({ message: '退出成功', type: 'success', })
        },
       async getmenuList(){

            // 获取左侧菜单
           const {data:res} =  await this.$axios.get('menus')
           if(res.meta.status !== 200) return 
           console.log(res);

           

        }
        
    },
    data(){

        return{
            
            menuList:[]

        }
    }


}



</script>




<style scoped>
.el-header {


    background-color: #373d41;
    display: flex;
    color: #eaedf1;
    font-size: 25px;
    align-items: center;
    justify-content: space-between;
}

.el-aside {


    background-color: #333744;
}

.el-main {


    background-color: #eaedf1;
}


.homr_container {


    height: 100%;
}


.img_login_avatar {

    height: 50px;
    border-radius: 50px;
}
</style>