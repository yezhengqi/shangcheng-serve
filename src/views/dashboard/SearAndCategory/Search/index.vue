<template>
  <div>
    <el-card>
      <div slot="header" class="title">
        <span style="font-weight: 600">线上热门搜索</span>

        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="el-icon-more" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-row :gutter="10">
        <el-col :span="12"> <LinearCharts /></el-col>
        <el-col :span="12"> <LinearCharts /></el-col>
      </el-row>

      <!-- 排序表格 -->
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
        >
          <el-table-column prop="address" label="排名" type="index" width="50" />
          <el-table-column prop="address" label="搜索关键字" />
          <el-table-column prop="date" label="用户数" sortable width="180" />
          <el-table-column prop="name" label="周涨幅" sortable width="180" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import LinearCharts from './LinearCharts'
export default {
  components: {
    LinearCharts
  },
  data() {
    return {
      tableData: ['123']
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.table{
  margin-top: 15px;
}
</style>
