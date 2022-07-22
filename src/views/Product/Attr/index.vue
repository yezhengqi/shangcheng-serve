<template>
  <div>
    <!-- 三级分类 -->
    <el-card style="margin-bottom: 10px">
      <CategorySelect :show="!showTable" @getCategoryId="getCategoryId" />
    </el-card>
    <!-- 三级分类属性数据展示 -->
    <el-card v-show="categoryIdThree">
      <div v-show="showTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
        >添加属性</el-button>
        <el-table style="width: 100%" :data="attrList" border="">
          <el-table-column
            label="序号"
            width="80"
            type="index"
            align="center"
          />
          <el-table-column prop="attrName" label="属性名称" width="150" />
          <el-table-column label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                type="success"
                style="margin: 0px 10px"
              >{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="editAttr(row)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加编辑属性 -->
      <div v-show="!showTable">
        <el-form ref="form" :inline="true" label-width="80px" :model="addAttrInfo">
          <el-form-item label="属性名">
            <el-input v-model="addAttrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button type="primary" :disabled=" addAttrInfo.attrName==='' " @click="addAttrValue">添加属性值</el-button>
        <el-button @click="showTable=true">取消</el-button>

        <el-table style="width: 100% ; margin:20px 0px" border :data="addAttrInfo.attrValueList">
          <el-table-column prop="prop" label="序号" width="80" type="index" align="center" />
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{row,$index}">
              <el-input
                v-if="row.AttrNameStyle"
                :ref="$index"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                @blur="changeInput(row)"
                @keyup.native.enter="changeInput(row)"
              />
              <span v-else style="display:block" @click="changeSpan(row,$index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template scope="{row,$index}">
              <el-popconfirm
                :title="`确定删除${row.valueName}吗`"
                @onConfirm="popDelete($index)"
              >
                <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" :disabled="addAttrInfo.attrValueList.length < 1" @click="saveUpdataAttr">保存</el-button>
        <el-button @click="showTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      categoryIdOne: '',
      categoryIdTwo: '',
      categoryIdThree: '',
      attrList: [],
      showTable: true,
      addAttrInfo: { // 添加编辑接口参数
        attrName: '',
        attrValueList: [], // 点击添加属性值时往里面新增对象
        categoryId: 0,
        categoryLevel: 3
      }
    }
  },
  methods: {
    async getCategory() {
      const result = await this.$API.attr.getAttrList(
        this.categoryIdOne,
        this.categoryIdTwo,
        this.categoryIdThree
      )
      if (result.code === 200) {
        this.attrList = result.data
      }
    },
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.categoryIdOne = categoryId
        this.categoryIdTwo = ''
        this.categoryIdThree = ''
      } else if (level === 2) {
        this.categoryIdTwo = categoryId
        this.categoryIdThree = ''
      } else if (level === 3) {
        this.categoryIdThree = categoryId
        this.getCategory()
      }
    },
    // 添加属性操作,将属性表格隐藏，清空addAttrInfo数据，获取三级分类ID
    addAttr() {
      this.showTable = false
      this.addAttrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.categoryIdThree,
        categoryLevel: 3
      }
    },
    // 添加属性值
    addAttrValue() {
      this.addAttrInfo.attrValueList.push({
        attrId: this.addAttrInfo.id,
        valueName: '',
        AttrNameStyle: true
      })
      this.$nextTick(() => {
        this.$refs[(this.addAttrInfo.attrValueList.length - 1)].focus()
      })
    },
    // 编辑属性值
    editAttr(row) {
      this.showTable = false
      this.addAttrInfo = cloneDeep(row)
      this.addAttrInfo.attrValueList.forEach(item => {
        this.$set(item, 'AttrNameStyle', false)
      })
    },
    // 删除属性值
    popDelete(index) {
      this.addAttrInfo.attrValueList.splice(index, 1)
    },
    // 保存属性值
    async saveUpdataAttr() {
      // 过滤请求数据
      this.addAttrInfo.attrValueList = this.addAttrInfo.attrValueList.filter(item => {
        if (item.attrName !== '') {
          delete item.AttrNameStyle
          return true
        }
      })
      try {
        await this.$API.attr.addOrEditAttr(this.addAttrInfo)
        this.getCategory()
        this.$message({ type: 'success', message: '保存成功' })
        this.showTable = true
      } catch (error) {
        console.log(error)
      }
    },
    // input与span转换
    changeInput(row) {
      // 输入内容不能为空不能重复
      if (row.valueName.trim() === '') {
        this.$message(
          {
            type: 'warning',
            message: '属性名不能为空'
          }
        )
        return
      }
      const repeat = this.addAttrInfo.attrValueList.some(item => {
        if (item !== row) {
          return item.valueName === row.valueName
        }
      })
      if (repeat) {
        this.$message(
          {
            type: 'warning',
            message: '属性名不能相同'
          }
        )
        return
      }
      row.AttrNameStyle = false
    },
    changeSpan(row, index) {
      row.AttrNameStyle = true
      // 自动聚焦
      this.$nextTick(() => {
        this.$refs[index].focus()
      }
      )
    }
  }
}
</script>

<style>
</style>
