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
          type: 'bar',
          data: [5, 20, 36, 10, 25, 69, 10, 100, 20, 50],
          color: 'rgb(64, 115, 202)'
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
