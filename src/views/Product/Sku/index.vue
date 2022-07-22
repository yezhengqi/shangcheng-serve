<template>
  <div>
    <el-table style="width: 100%" border :data="skuList.records">
      <el-table-column label="序号" width="80" type="index" align="center" />
      <el-table-column prop="skuName" label="名称" width="width" />
      <el-table-column prop="skuDesc" label="描述" width="width" />
      <el-table-column label="默认图片" width="width">
        <template slot-scope="{ row }">
          <el-image
            style="width: 50px; height: 50px"
            :src="row.skuDefaultImg"
          /></template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="width" />
      <el-table-column prop="price" label="价格(元)" width="width" />
      <el-table-column label="操作" width="300">
        <template slot-scope="{ row }">
          <el-button v-if="row.isSale===1" type="success" icon="el-icon-sort-down" size="mini" @click="skuCancel(row)" />
          <el-button v-else type="success" icon="el-icon-sort-up" size="mini" @click="skuSale(row)" />
          <el-button type="primary" icon="el-icon-edit" size="mini" />
          <el-button type="warning" icon="el-icon-info" size="mini" @click="getSkuInfo(row)" />
          <el-button type="danger" icon="el-icon-delete" size="mini" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <!-- @size-change="handleSizeChange" -->
    <el-pagination
      style="margin-top: 15px"
      align="center"
      :current-page="pageNow"
      :page-sizes="[3, 7, 10]"
      :page-size="limit"
      layout=" prev, pager, next ,jumper, ->, sizes,total"
      :total="total"
      @current-change="getSkuList"
    />

    <!-- 商品详情展示抽屉 -->
    <el-drawer
      :show-close="false"
      :visible.sync="drawer"
      size="50%"
    >
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple-dark" />名称</el-col>
        <el-col :span="16"><div class="grid-content bg-purple-dark" />{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple-dark" />描述</el-col>
        <el-col :span="16"><div class="grid-content bg-purple-dark" />{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple-dark" />价格</el-col>
        <el-col :span="16"><div class="grid-content bg-purple-dark" />{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple-dark" />平台属性</el-col>
        <el-col :span="16"><div class="grid-content bg-purple-dark" />
          <el-tag v-for="infotag in skuInfo.skuSaleAttrValueList" :key="infotag.id" type="success" style="margin-right: 8px" size="mini">{{ infotag.saleAttrValueName }}</el-tag>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple-dark" />商品图片</el-col>
        <el-col :span="16"><div class="grid-content bg-purple-dark" />
          <template>

            <el-carousel height="150px">
              <el-carousel-item v-for="infoimg in skuInfo.skuImageList" :key="infoimg.id" style="text-align:center">
                <img :src="infoimg.imgUrl" style="width: 150px;height:150px">
              </el-carousel-item>
            </el-carousel>

          </template>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNow: 1,
      limit: 10,
      total: null,
      skuList: {},
      skuInfo: {},
      drawer: false // 展示抽屉
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 获取sku列表
    async getSkuList(page = 1) {
      this.pageNow = page
      const resku = await this.$API.sku.getSkuList(page, this.limit)
      if (resku.code === 200) {
        this.skuList = resku.data
        this.total = resku.data.total
      }
    },
    // sku上下架
    async skuSale(row) {
      row.isSale = 1
      const result = await this.$API.sku.reqSale(row.id)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '上架成功' })
      }
    },
    async skuCancel(row) {
      row.isSale = 0
      const result = await this.$API.sku.reqCancel(row.id)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '下架成功' })
      }
    },

    // 获取sku详情
    async getSkuInfo(row) {
      const resInfo = await this.$API.sku.rqSkuInfo(row.id)
      if (resInfo.code === 200) {
        this.skuInfo = resInfo.data
        this.drawer = true
      }
    }
  }
}
</script>

<style>
 .el-row {
    margin-bottom: 20px;
}
.el-col:first-child{
      text-align: right;
      font-weight: 600;
}
.el-carousel__button{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: red;
}
</style>
