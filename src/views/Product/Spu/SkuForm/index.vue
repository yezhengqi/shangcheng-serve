<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称"> {{ spuInfo.spuName }} </el-form-item>

      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="sku名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" placeholder="价格" type="number" />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="重量" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuInfo.skuDesc" type="textarea" rows="4" />
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item
            v-for="attr in resultAttrInfo"
            :key="attr.id"
            :label="attr.attrName"
          >
            <el-select v-model="attr.attrAndValueID" placeholder="请选择">
              <el-option
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item
            v-for="sale in saleAttrList"
            :key="sale.id"
            :label="sale.saleAttrName"
          >
            <el-select v-model="sale.saleAndsaleValueId" placeholder="请选择">
              <el-option
                v-for="saleValue in sale.spuSaleAttrValueList"
                :key="saleValue.id"
                :label="saleValue.saleAttrName"
                :value="`${sale.id}:${saleValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table border style="width: 100%" :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column
            prop="prop"
            type="selection"
            width="80px"
            align="center"
          />
          <el-table-column label="图片" prop="imgUrl">
            <template slot-scope="{ row }">
              <el-image style="width: 50px; height: 50px" :src="row.imgUrl" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" />
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button v-if="row.isDefault == 0" type="primary" @click="setupIsDefault(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveSku">保存</el-button>
        <el-button @click="changePage">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      spuImageList: [],
      saleAttrList: [],
      resultAttrInfo: [],
      seleImgList: [],
      spuInfo: {},

      // 收集skuInfo数据
      skuInfo: {
        category3Id: null,
        spuId: null,
        tmId: null,
        skuName: '',
        price: null,
        weight: '',
        skuDesc: '',
        skuDefaultImg: '', // 默认展示的图片

        imageList: [], // 存放勾选的图片数据
        skuAttrValueList: [],
        skuSaleAttrValueList: []
      }
    }
  },
  methods: {
    // 获取sku form数据
    async getSkuData(categoryIdOne, categoryIdTwo, row) {
      Object.assign(this._data, this.$options.data())
      // 收集数据
      this.spuInfo = row
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId

      const resultImg = await this.$API.sku.reqSpuImageList(row.id)
      if (resultImg.code === 200) {
        // 为图片添加默认值isDefault
        const imgList = resultImg.data
        imgList.forEach(item => { item.isDefault = 0 })
        this.spuImageList = imgList
      }
      const resultSale = await this.$API.sku.reqSpuSaleAttrList(row.id)
      if (resultSale.code === 200) this.saleAttrList = resultSale.data

      const resultAttrInfo = await this.$API.sku.reqAttrInfoList(
        categoryIdOne,
        categoryIdTwo,
        row.category3Id
      )
      if (resultAttrInfo.code === 200) { this.resultAttrInfo = resultAttrInfo.data }
    },
    // 设置默认图片
    setupIsDefault(row) {
      this.skuDefaultImg = row.imgUrl
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
    },
    // 图片勾选事件
    handleSelectionChange(selection) {
      this.seleImgList = selection
    },
    // 保存Sku
    async saveSku() {
      // 收集平台属性与销售属性数据
      this.resultAttrInfo.forEach(item => {
        if (item.attrAndValueID) {
          const [attrId, valueId] = item.attrAndValueID.split(':')
          this.skuInfo.skuAttrValueList.push({ valueId, attrId })
        }
      })

      this.skuInfo.skuSaleAttrValueList = this.saleAttrList.reduce((prev, item) => {
        if (item.saleAndsaleValueId) {
          const [saleAttrId, saleAttrValueId] = item.saleAndsaleValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // 收集图片数据
      this.skuInfo.imageList = this.seleImgList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      // 数据请求
      const reSave = await this.$API.sku.reqSaveSku(this.skuInfo)
      if (reSave.code) {
        this.$message({ type: 'success', message: '保存成功' })
        this.$emit('changeSkuPage', { nowpage: 0 })
      }
    },
    changePage() {
      this.$emit('changeSkuPage', { nowpage: 0 })
    }
  }
}
</script>

<style>
</style>
