<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>

    </el-breadcrumb>


    <!-- 白板 -->
    <el-card class="box-card">

        <el-button class="addroles" @click="dialogVisible_AddClassification = true" type="primary">添加分类</el-button>


        <el-table :data="categoriesServerDate" stripe style="width: 100%" row-key="cat_id" border>

            <el-table-column prop="cat_id" label="编号" width="120" />
            <el-table-column prop="cat_name" label="分类名称" />
            <el-table-column label="是否有效">

                <template v-slot="cat_deleted">


                    <el-text v-if="cat_deleted.row.cat_deleted === false" type="success">有效</el-text>
                    <el-text v-if="cat_deleted.row.cat_deleted === true" type="danger">无效</el-text>
                </template>

            </el-table-column>
            <el-table-column label="排序">
                <template v-slot="level">

                    <!-- {{ level.row}} -->

                    <el-tag v-if="level.row.cat_level === 2">三级权限</el-tag>
                    <el-tag v-if="level.row.cat_level === 1" type="warning">二级权限</el-tag>
                    <el-tag v-if="level.row.cat_level === 0" type="danger">一级权限</el-tag>


                </template>
            </el-table-column>
            <el-table-column label="操作">

                <template v-slot="scope">
                    <!-- {{scope.row }} -->

                    <el-button type="primary" :icon="Edit">编辑</el-button>

                    <!-- 删除 -->
                    <el-button type="danger" :icon="Delete"
                        @click="deleteClassificationDate(scope.row.cat_id)">删除</el-button>







                </template>


            </el-table-column>




        </el-table>

        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="categoriesDate.pagenum" v-model:page-size="categoriesDate.pagesize"
                :page-sizes="[6, 12, 18, 24]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>



    </el-card>


    <!-- --------------------------------- -->



    <!-- 弹出层-添加分类-->
    <el-dialog v-model="dialogVisible_AddClassification" width="30%" title="添加分类">


        <el-form ref="AddClassificationDateRef" :model="AddClassificationDate" label-width="70px">
            <el-form-item prop="roleName" label="父编号">
                <el-input v-model="AddClassificationDate.cat_pid" />
            </el-form-item>

            <el-form-item prop="roleDesc" label="名称">
                <el-input v-model="AddClassificationDate.cat_name" />
            </el-form-item>

            <el-form-item prop="roleDesc" label="层级">
                <el-input v-model="AddClassificationDate.cat_level" />
            </el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible_AddClassification = false">取消</el-button>
                <!-- 触发提交 -->
                <el-button type="primary" @click="AddClassificationDatePreChaeck()">
                    增加
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>

export default {

    created() {



        this.categories()


    },

    data() {

        return {


            categoriesDate: {
                // 后续理解
                type: 3,
                pagenum: 1,
                pagesize: 6
            },

            categoriesServerDate: [],
            total: '',
            dialogVisible_AddClassification: false,
            AddClassificationDate: {

                cat_pid: '',
                cat_name: '',
                cat_level: '',

            }

        }


    },
    methods: {

        // 列表修改触发
        handleSizeChange(input) {
            // console.log(input);
            this.categoriesDate.pagesize = input
            this.categories()


        },

        // 列表修改触发
        handleCurrentChange(input) {
            // console.log(input);
            this.categoriesDate.pagenum = input
            this.categories()


        },

        async categories() {

            const { data: res } = await this.$axios.get('categories', { params: this.categoriesDate })
            if (res.meta.status !== 200) {
                ElMessage({ message: '商品分类数据列表获取失败', type: 'warning', })

                return

            }

            this.categoriesServerDate = res.data.result
            this.total = res.data.total
            // console.log(res.data);

        },
        async AddClassificationDatePreChaeck() {

            const { data: res } = await this.$axios.post('categories', this.AddClassificationDate)
            if (res.meta.status !== 201) {
                ElMessage({ message: '添加分类失败', type: 'warning', })

                return

            }

            // console.log(res);




            this.dialogVisible_AddClassification = false

            this.categories()

        },

        // 删除分类
        async deleteClassificationDate(id) {


            const { data: res } = await this.$axios.delete(`categories/${id}`)
            if (res.meta.status !== 200) {
                ElMessage({ message: '删除分类失败', type: 'warning', })

                return

            }

            // console.log(res);

            this.categories()

        }



    }
}




</script>


<script setup >


import { ElMessage } from 'element-plus'
// import { Delete, Edit, Search, Setting } from '@element-plus/icons-vue'

</script>

<style scoped>
.addroles {

    margin-bottom: 20px;
}


.box-card {

    margin-top: 20px;
}

.demo-pagination-block {

    margin-top: 20px;
}
</style>