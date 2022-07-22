<template>
  <div ref="charts" class="charts" style="width:100%;height:100%" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    const linerCharts = echarts.init(this.$refs.charts)
    linerCharts.setOption({
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
            color: 'purple'
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
                offset: 0, color: 'purple' // 0% 处的颜色
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

<style>

</style>
