<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类参数</el-breadcrumb-item>

    </el-breadcrumb>


    <!-- 白板 -->
    <el-card class="box-card">

        <el-alert title="提示：只允许为第三级分类设置参数！" type="warning" show-icon />


        <div class="mar">

            <span>选择商品分类：</span>

            <el-cascader v-model="value" :options="categoriesServerDate" :props="props" @change="handleChange" />
        </div>



        <!-- 选项卡 -->
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">

            <!-- 动态属性 -->
            <el-tab-pane label="动态属性" name="many" :disabled="isdisabled">

                <el-button class="addroles" @click="dialogVisible_AddClassification = true" type="primary"
                    :disabled="isdisabled">添加动态属性</el-button>
                <el-table :data="getCategoriesListDate" stripe style="width: 100%" row-key="cat_id" border>

                    <el-table-column prop="attr_id" label="#" width="120" />
                    <el-table-column prop="attr_name" label="参数名称" />


                    <el-table-column label="操作">

                        <template v-slot="scope">
                            <!-- {{scope.row.cat_id }} -->

                            <el-button type="primary" :icon="Edit"
                                @click="dialogVisible_changeClassification = true, changecat_id = scope.row.cat_id"
                                :disabled="isdisabled">编辑</el-button>

                            <!-- 删除 -->
                            <el-button type="danger" :icon="Delete" @click="deleteClassificationDate(scope.row.cat_id)"
                                :disabled="isdisabled">删除</el-button>







                        </template>


                    </el-table-column>




                </el-table>

            </el-tab-pane>


            <!-- 静态属性 -->
            <el-tab-pane label="静态属性" name="only" :disabled="isdisabled">

                <el-button class="addroles" @click="dialogVisible_AddClassification = true" type="primary"
                    :disabled="isdisabled">添加静态属性</el-button>

                <el-table :data="getCategoriesListDate" stripe style="width: 100%" row-key="cat_id" border>

                    <el-table-column prop="attr_id" label="#" width="120" />
                    <el-table-column prop="attr_name" label="参数名称" />


                    <el-table-column label="操作">

                        <template v-slot="scope">
                            <!-- {{scope.row.cat_id }} -->

                            <el-button type="primary" :icon="Edit"
                                @click="dialogVisible_changeClassification = true, changecat_id = scope.row.cat_id"
                                :disabled="isdisabled">编辑</el-button>

                            <!-- 删除 -->
                            <el-button type="danger" :icon="Delete" @click="deleteClassificationDate(scope.row.cat_id)"
                                :disabled="isdisabled">删除</el-button>







                        </template>


                    </el-table-column>




                </el-table>

            </el-tab-pane>

        </el-tabs>










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





    <!-- 弹出层-编辑分类-->
    <el-dialog v-model="dialogVisible_changeClassification" width="30%" title="编辑分类">


        <el-form ref="changeClassificationDateRef" :model="changeClassificationDate" label-width="70px">
            <el-form-item prop="roleName" label="新名称">
                <el-input v-model="changeClassificationDate.Name" />
            </el-form-item>



        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible_changeClassification = false">取消</el-button>
                <!-- 触发提交 -->
                <el-button type="primary" @click="changeClassificationDatePreChaeck()">
                    变更
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




            categoriesServerDate: [],
            value: [],
            props: {
                // expandTrigger: 'hover',
                value: 'cat_id',
                label: 'cat_name',
                children: 'children',
            },
            dialogVisible_AddClassification: false,
            dialogVisible_changeClassification: false,
            AddClassificationDate: {

                cat_pid: '',
                cat_name: '',
                cat_level: '',

            },
            changeClassificationDate: {

                Name: ''
            },
            changecat_id: '',
            activeName: 'many',

            // 禁用选项卡
            isdisabled: true,

            getCategoriesListDate: [],

        }


    },
    methods: {


        async categories() {

            const { data: res } = await this.$axios.get('categories')
            if (res.meta.status !== 200) {
                ElMessage({ message: '商品分类数据列表获取失败', type: 'warning', })

                return

            }

            this.categoriesServerDate = res.data
            // this.total = res.data.total
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

        },
        async changeClassificationDatePreChaeck() {

            this.dialogVisible_changeClassification = false

            const { data: res } = await this.$axios.put(`categories/${this.changecat_id}`, { cat_name: this.changeClassificationDate.Name })
            if (res.meta.status !== 200) {
                ElMessage({ message: '变更分类失败', type: 'warning', })
                // console.log(res);
                return

            }



            this.categories()



        },
        handleChange(value) {

            if (this.value.length !== 3) {
                this.value = []

                return
            }
            // console.log(value);
            this.getCategoriesList()
            this.isdisabled = false
        },


        async getCategoriesList() {


            const { data: res } = await this.$axios.get(`categories/${this.value[2]}/attributes`, { params: { sel: this.activeName } })
            if (res.meta.status !== 200) {
                ElMessage({ message: '参数列表获取失败', type: 'warning', })
                return

            }



            this.getCategoriesListDate = res.data

            // console.log(res.data);

        },

        // 选项卡的变动后发起新的请求
        handleClick(){

            // 修复了选项卡的反向错误
            if(this.activeName ==='many'){
                console.log(123);

                this.activeName ='only'
            }else{

                this.activeName ='many'

            }
            
            // console.log(this.activeName);
            this.getCategoriesList()


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

.el-alert {

    margin-bottom: 20px;




}

.mar {

    margin: 40px;
}
</style>