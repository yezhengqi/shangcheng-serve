<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cateForm">
      <el-form-item label="一级分类">
        <el-select v-model="cateForm.categoryIdOne" placeholder="请选择" :disabled="show" @change="handleOne">
          <el-option v-for="item in listOne" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cateForm.categoryIdTwo" placeholder="请选择" :disabled="show" @change="handleTwo">
          <el-option v-for="item2 in listTwo" :key="item2.id" :label="item2.name" :value="item2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cateForm.categoryIdThree" placeholder="请选择" :disabled="show" @change="handleThree">
          <el-option v-for="item3 in listThree" :key="item3.id" :label="item3.name" :value="item3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['show'],
  data() {
    return {
      listOne: [],
      listTwo: [],
      listThree: [],
      cateForm: {
        categoryIdOne: null,
        categoryIdTwo: null,
        categoryIdThree: null
      }
    }
  },
  mounted() {
    this.getCategoryOne()
  },
  methods: {
    async getCategoryOne() {
      const result = await this.$API.attr.getCategory1()
      if (result.code === 200) { this.listOne = result.data }
    },
    // 分类一二点击触发
    async handleOne() {
      this.listTwo = []
      this.listThree = []
      this.cateForm.categoryIdTwo = null
      this.cateForm.categoryIdThree = null
      // 传递参数给父组件发送请求
      this.$emit('getCategoryId', { categoryId: this.cateForm.categoryIdOne, level: 1 })
      const { categoryIdOne } = this.cateForm
      const result = await this.$API.attr.getCategory2(categoryIdOne)
      if (result.code === 200) {
        this.listTwo = result.data
      }
    },
    async handleTwo() {
      this.listThree = []
      this.cateForm.categoryIdThree = null
      this.$emit('getCategoryId', { categoryId: this.cateForm.categoryIdTwo, level: 2 })
      const result = await this.$API.attr.getCategory3(this.cateForm.categoryIdTwo)
      if (result.code === 200) {
        this.listThree = result.data
      }
    },
    handleThree() {
      this.$emit('getCategoryId', { categoryId: this.cateForm.categoryIdThree, level: 3 })
    }
  }
}
</script>

<style>

</style>
