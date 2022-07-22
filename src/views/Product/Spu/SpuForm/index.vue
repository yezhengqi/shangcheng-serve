<template>
  <div>
    <el-form label-width="80px" :model="spuList">
      <el-form-item label="SPU名称">
        <el-input v-model="spuList.spuName" placeholder="SPU名称" />
      </el-form-item>

      <el-form-item label="品牌">
        <el-select v-model="spuList.tmId" placeholder="请选择品牌">
          <el-option
            v-for="item in tradeMark"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input
          v-model="spuList.description"
          type="textarea"
          rows="4"
          placeholder="描述"
        />
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAdd"
          :file-list="imgList"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndName" :placeholder="`还有${attrNoSelectNum.length}未选择`">
          <el-option v-for="item in attrNoSelectNum" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`" />
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 0 10px"
          :disabled="!attrIdAndName"
          @click="addSaleAttr"
        >添加销售属性</el-button>
        <el-table
          border=""
          style="margin: 10px 0"
          :data="spuList.spuSaleAttrList"
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          />
          <el-table-column label="属性名" width="width" prop="saleAttrName" />
          <el-table-column label="属性值" width="width">
            <template slot-scope="{row,$index}">
              <el-tag
                v-for="(item,index) in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
                @blur="tagBlur(row)"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="tagButton(row)"
              >添加</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spuList.spuSaleAttrList.splice($index,1)" />
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveSpuInfo">保存</el-button>
        <el-button @click="$emit('changeSkuPage', {nowpage:0})">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spuList: {
        category3Id: 0,
        description: '',
        spuName: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: []
      },
      tradeMark: [],
      imgList: [],
      attrList: [],
      attrIdAndName: ''
    }
  },
  computed: {
    // 未选择的销售属性
    attrNoSelectNum() {
      const result = this.attrList.filter(item => {
        return this.spuList.spuSaleAttrList.every(item2 => {
          if (item.name !== item2.saleAttrName) {
            return true
          }
        })
      })
      return result
    }
  },
  methods: {
    handleAdd(response, file, fileList) {
      this.imgList = fileList
    },
    handleRemove(file, fileList) {
      this.imgList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 获取品牌与属性接口参数
    async getTradeAndAttr() {
      const rsAttrList = await this.$API.spu.reqBaseSaleAttrList()
      if (rsAttrList.code === 200) {
        this.attrList = rsAttrList.data
      }
      const rsTradeMarkList = await this.$API.spu.reqTradeMarkList()
      if (rsTradeMarkList.code === 200) {
        this.tradeMark = rsTradeMarkList.data
      }
    },
    // 添加spu
    addSpuForm(categoryIdThree) {
      // const { spuList } = this
      // spuList.spuName = ''
      // spuList.tmId = ''
      // spuList.description = ''
      // this.imgList = []
      // spuList.spuSaleAttrList = []
      // 合并重置参数
      Object.assign(this._data, this.$options.data())
      console.log(categoryIdThree)
      this.spuList.category3Id = categoryIdThree
      delete this.spuList.id

      this.getTradeAndAttr()
    },
    // 获取Spu表单数据
    async getSpuForm(row) {
      this.getTradeAndAttr()
      const rsspuList = await this.$API.spu.reqSqu(row.id)
      if (rsspuList.code === 200) {
        this.spuList = rsspuList.data
      }
      const rsImgList = await this.$API.spu.reqSquImageList(row.id)
      if (rsImgList.code === 200) {
        // 重构图片展示例表数据
        const list = rsImgList.data
        list.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.imgList = list
      }
    },
    // 添加销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
      const attrObject = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spuList.spuSaleAttrList.push(attrObject)
      this.attrIdAndName = ''
    },
    // tag事件触发
    tagButton(row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    tagBlur(row) {
      const { baseSaleAttrId, inputValue } = row
      const newTag = { baseSaleAttrId, saleAttrValueName: inputValue }
      // 添加tag不能为空，不能重复
      if (inputValue.trim() === '') return
      const sameResult = row.spuSaleAttrValueList.some(item => item.saleAttrValueName === inputValue)
      if (sameResult) return
      row.spuSaleAttrValueList.push(newTag)
      row.inputVisible = false
    },
    // 保存
    async saveSpuInfo() {
      // 整理图片墙数据到spuList
      this.spuList.spuImageList = this.imgList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      // 接口请求保存
      const saveRes = await this.$API.spu.reqSaveSpu(this.spuList)
      console.log(saveRes)
      if (saveRes.code === 200) {
        this.$message({ type: 'success', message: '保存成功' })
        this.$emit('changeSkuPage', { nowpage: 0, flag: this.spuList.id ? '修改' : '添加' })
      }
    }

  }
}
</script>

<style>
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
