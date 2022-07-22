<template>
  <div>
    <div class="title">
      <span style="margin-right:8px;color:gray">搜索用户数</span>
      <span class="el-icon-info" />
    </div>
    <div class="target">
      <span style="font-weight:600;margin-right:30px">12321</span>
      <span style="color:gray;font-size:12px">17.1</span>
      <span class="el-icon-caret-top" style="color:red" />
    </div>
    <div ref="charts" class="charts" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    const charts = echarts.init(this.$refs.charts)
    charts.setOption({
      xAxis: {
        show: false,
        // 离散数据类型
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          data: [5, 20, 36, 10, 25, 69],
          // 不显示拐点样式
          itemStyle: {
            opacity: 0
          },
          // 线条的颜色
          lineStyle: {
            color: 'blue'
          },
          // 填充渐变颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'blue' // 0% 处的颜色
              }, {
                offset: 1, color: 'white' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          // 平滑效果
          smooth: true
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 5
      }
    })
  }
}
</script>

<style scoped>
  .target{
    margin-top: 10px;
  }
  .charts{
    width: 100%;
    height: 60px;
  }
</style>
