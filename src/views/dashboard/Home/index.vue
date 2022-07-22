<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <Header sale="总销售额" count="126560">
          <template slot="charts">
            <span>周同比&nbsp; 56.67%</span><span class="el-icon-caret-top" style="color:red;margin-right:8px" />
            <span>日同比&nbsp; 19.16%</span><span class="el-icon-caret-bottom" style="color:green" />
          </template>
          <template slot="footer">
            <span>日销售额￥&nbsp;12423</span>
          </template>
        </Header>
      </el-col>

      <el-col :span="6">
        <Header sale="访问量" count="88460">
          <template slot="charts">
            <Liner />
          </template>
          <template slot="footer">
            <span>日访问量&nbsp;123</span>
          </template>
        </Header>
      </el-col>

      <el-col :span="6">
        <Header sale="支付比数" count="88460">
          <template slot="charts">
            <BarCharts />
          </template>
          <template slot="footer">
            <span>转化率&nbsp;60%</span>
          </template>
        </Header>
      </el-col>

      <el-col :span="6">
        <Header sale="运营活动效果" count="70%">
          <template slot="charts">
            <ProgressCharts />
          </template>
          <template slot="footer">
            <span>周同比&nbsp; 56.67%</span><span class="el-icon-caret-top" style="color:red;margin-right:8px" />
            <span>日同比&nbsp; 19.16%</span><span class="el-icon-caret-bottom" style="color:green" />
          </template>
        </Header>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from './Header'
import Liner from './Liner'
import BarCharts from './BarCharts'
import ProgressCharts from './ProgressCharts'
export default {
  components: {
    Header,
    Liner,
    BarCharts,
    ProgressCharts
  }
}
</script>

<style scoped>
</style>
