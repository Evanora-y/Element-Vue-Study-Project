<template>
    <el-button :plain="true" @click="logout">退出登录</el-button>
</template>

<script setup>
import { ElMessage } from 'element-plus'

</script>




<script>

export default {

    methods: {

        logout() {

            window.sessionStorage.clear()
            this.$router.push('/login')
            ElMessage({message: '退出成功',type: 'success',})
        }
    }


}



</script>




<script scoped>



</script>