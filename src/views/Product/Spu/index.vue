<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <CategorySelect
        :show="changePage != 0 ? true : false"
        @getCategoryId="getCategoryId"
      />
    </el-card>
    <el-card>
      <div v-show="changePage == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!categoryIdThree"
          @click="addSpu(categoryIdThree)"
        >添加SPU</el-button>
        <el-table style="width: 100%" border :data="spuList">
          <el-table-column
            prop="prop"
            label="序号"
            width="80"
            align="center"
            type="index"
          />
          <el-table-column prop="spuName" label="SPU名称" width="width" />
          <el-table-column prop="description" label="SPU描述" width="width" />
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hin-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              />
              <hin-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="UpdataSpu(row)"
              />
              <hin-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看sku"
                @click="lookSku(row)"
              />
              <el-popconfirm
                confirm-button-text="删除"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @onConfirm="handelDelete(row)"
              >
                <hin-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          style="margin-top: 20px"
          align="center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="getCategory"
          @size-change="pageSizeChange"
        />
      </div>
      <SpuForm v-show="changePage == 1" ref="spu" @changeSkuPage="skuParamer" />
      <SkuForm v-show="changePage == 2" ref="sku" @changeSkuPage="skuParamer" />
    </el-card>
    <!-- sku表格展示 -->
    <el-dialog :title="skurow.spuName" :visible.sync="dialogTableVisible" :before-close="closeDialog">
      <el-table v-loading="loading" :data="skuList">
        <el-table-column prop="skuName" label="名称" />
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="weight" label="重量" />
        <el-table-column prop="prop" label="默认图片">
          <template slot-scope="{ row }">
            <el-image
              style="width: 50px; height: 50px"
              :src="row.skuDefaultImg"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from './SkuForm'
import SpuForm from './SpuForm'
export default {
  components: {
    SkuForm,
    SpuForm
  },
  data() {
    return {
      categoryIdOne: '',
      categoryIdTwo: '',
      categoryIdThree: '',
      spuList: [],
      page: 1,
      limit: 3,
      total: null,
      changePage: 0,
      skurow: [],
      skuList: [],
      dialogTableVisible: false,
      loading: true
    }
  },
  methods: {
    async getCategory(pages = 1) {
      this.page = pages
      const result = await this.$API.spu.getSpuList(
        this.page,
        this.limit,
        this.categoryIdThree
      )

      if (result.code === 200) {
        this.spuList = result.data.records
        this.total = result.data.total
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
    // 分页器limit变化触发
    pageSizeChange(limit) {
      this.limit = limit
      this.getCategory()
    },
    // 添加sku
    addSku(row) {
      this.changePage = 2
      this.$refs.sku.getSkuData(this.categoryIdOne, this.categoryIdTwo, row)
    },
    // 查看sku
    async lookSku(row) {
      this.dialogTableVisible = true
      this.skurow = row
      const resku = await this.$API.spu.reqLookSku(row.id)
      if (resku.code === 200) {
        this.loading = false
        this.skuList = resku.data
      }
    },
    // 关闭dialog前的回调
    closeDialog(done) {
      // 解决loading添加效果，数据清空
      this.loading = true
      this.skuList = []
      done()
    },
    // 添加spu
    addSpu(categoryIdThree) {
      this.changePage = 1
      this.$refs.spu.addSpuForm(categoryIdThree)
    },
    // 修改spu列表
    UpdataSpu(row) {
      this.changePage = 1
      this.$refs.spu.getSpuForm(row)
    },
    // 删除spu列表
    async handelDelete(row) {
      const result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '删除成功' })
        this.getCategory(this.spuList.length <= 1 ? this.page - 1 : this.page)
      }
    },
    // 接收spu子组件参数
    skuParamer({ nowpage, flag }) {
      this.changePage = nowpage
      if (flag === '添加') {
        this.getCategory(1)
      } else {
        this.getCategory(this.page)
      }
    }
  }
}
</script>

<style>
</style>
