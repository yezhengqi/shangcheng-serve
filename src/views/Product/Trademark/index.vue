<template>
  <div>
    <el-button type="primary" style="margin: 10px 0px" @click="addTrade">添加</el-button>

    <!-- 表格数据 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column prop="prop" label="序号" width="80px" align="center" type="index" />
      <el-table-column label="品牌名称" width="width" prop="tmName" />
      <el-table-column prop="logoUrl" label="品牌Logo" width="width">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="" style="width:50px;height:50px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="revise(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      style="textAlign:center;margin-top:20px"
      layout="prev, pager, next,jumper,->,sizes,total"
      :total="total"
      :page-size="limit"
      :page-count="7"
      :current-page="page"
      :page-sizes="[3,5,10]"
      @current-change="getListAPI"
      @size-change="handleSizeChange"
    />

    <!-- 添加Dialog -->
    <el-dialog :title="tmForm.id?'修改商品':'添加商品'" :visible.sync="dialogFormVisible">
      <el-form ref="submitForm" style="width:80%" :model="tmForm" :rules="rules">
        <el-form-item label="商品名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <!-- 图片文件上传 -->
        <el-form-item label="文件上传" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTradeSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      page: 1,
      limit: 3,
      total: null,
      dialogFormVisible: false, // dialog显示
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      // 表单校验规则
      rules: {
        tmName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 8 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择图片' }
        ]
      }
    }
  },
  mounted() {
    this.getListAPI()
  },
  methods: {
    async getListAPI(pager = 1) {
      this.page = pager
      const { page, limit } = this
      const result = await this.$API.trademark.getList(page, limit)
      if (result.code === 200) {
        this.list = result.data.records
        this.total = result.data.total
      }
    },
    // 修改例表显示个数时触发
    handleSizeChange(sizes) {
      this.limit = sizes
      this.getListAPI()
    },
    // Dialog图片上传
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      if (res.code === 200) {
        this.tmForm.logoUrl = res.data
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加商品
    addTrade() {
      this.tmForm.tmName = ''
      this.tmForm.logoUrl = ''
      delete this.tmForm.id
      this.dialogFormVisible = true
    },
    // 确定添加商品
    addTradeSure() {
      this.$refs['submitForm'].validate(async(valid) => {
        if (valid) {
          // 表单通过验证后添加
          this.dialogFormVisible = false
          const result = await this.$API.trademark.reqAddOrUpdateTrademark(this.tmForm)
          if (result.code === 200) {
            this.$message(
              {
                type: 'success',
                message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功'
              }
            )
            this.getListAPI(this.tmForm.id ? this.page : 1)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改商品
    revise(row) {
      this.dialogFormVisible = true
      // 使用浅拷贝，不然直接赋值将会直接修改表单元素
      this.tmForm = { ...row }
    },
    // 删除商品
    remove(row) {
      this.$confirm(`此操作将永久删除${row.tmName}`, '是否继续?', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const result = await this.$API.trademark.deleTrademark(row.id)
        if (result.code === 200) {
          this.getListAPI(this.list.length > 0 ? this.page : this.page - 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
