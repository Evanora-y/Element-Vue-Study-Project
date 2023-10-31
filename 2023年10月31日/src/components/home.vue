<template>
    <div class="common-layout">
        <el-container>
            <el-header>

                <!-- 导航栏 -->
                <el-menu class="elmu"  :default-active="defaultActive"   mode="horizontal" :unique-opened="true"  background-color="#545c64"
                 text-color="#fff" active-text-color="#ffd04b" router >
                    
                    <!-- 一级标题 -->
                    <el-sub-menu v-for="item in listDate" :index="item.order" >
                        <template #title>{{ item.authName}}</template>


                        <!-- 二级标题 -->
                        <el-menu-item v-for="iitem in item.children" :index="'/' +iitem.path"
                         @click="setdefaultActive(iitem.id)"  >{{ iitem.authName}}</el-menu-item>
                        
                    </el-sub-menu>
                    

                    <el-menu-item @click="logout()">退出登录</el-menu-item>
                    
                </el-menu>



               





            </el-header>
            <el-main>
                

                <RouterView></RouterView>
            </el-main>
        </el-container>
    </div>
</template>

<script>

import axios from 'axios';
import { ElMessage } from 'element-plus'
import router from '../router';

export default {



    created(){

        //初始化数据
        this.getMenus();


    },
    data(){

        return{


            listDate:"",
            defaultActive:"/home"
        }
    },

    methods:{


       async getMenus(){

            const {data:res} = await axios.get('menus');

            if(res.meta.status != 200){

                ElMessage({ message: '后台列表获取失败',type: 'warning'})

            }

            console.log(res);
            this.listDate = res.data


        },
        setdefaultActive(index){

        
            window.sessionStorage.setItem('defaultIndex',index)
            this.defaultActive = index

        },
        logout(){

            window.sessionStorage.clear();
            ElMessage({ message: '退出成功！',type: 'success'})
            router.push('/')
        }

    }

}

</script>


<style scoped>
.el-header {

    padding: 0;
    margin: 0;
    /* display:inline-flex;
    background-color:#545c64; */
}



.el-container,.common-layout {

    height: 100%;
}
.el-menu{

    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    /* height: 60px; */
}


</style>