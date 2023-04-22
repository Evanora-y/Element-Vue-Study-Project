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


                <el-menu background-color="#333744" text-color="#fff" :unique-opened="true">
                    <el-sub-menu :index="item.id +''" v-for="item in menuList" :key="item.id">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>{{ item.authName}}</span>
                        </template>

                        <el-menu-item :index="itemchr.id +''" v-for="itemchr in item.children" :key="itemchr.id" >
                            <el-icon><icon-menu /></el-icon>
                            <span>{{  itemchr.authName}}</span>
                        </el-menu-item>

                    </el-sub-menu>

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
    created() {

        this.getmenuList();

    },

    methods: {

        logout() {

            window.sessionStorage.clear()
            this.$router.push('/login')
            ElMessage({ message: '退出成功', type: 'success', })
        },
        async getmenuList() {

            // 获取左侧菜单
            const { data: res } = await this.$axios.get('menus')
            if (res.meta.status !== 200) return ElMessage({ message: '菜单栏获取失败', type: 'warning', })
            this.menuList = res.data
            ElMessage({ message: '菜单栏获取成功', type: 'success', })
            // console.log(res);



        }

    },
    data() {

        return {

            menuList: []

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
.el-menu{

/* 解决菜单边框有实线的问题 */
border-right: none;

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