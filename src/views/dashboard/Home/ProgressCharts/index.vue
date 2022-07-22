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
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        // 离散数据类型
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [75],
          // 柱状图宽度
          barWidth: 10,
          color: 'yellowgreen',
          // 背景颜色设置
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          },
          // 文本
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }
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
