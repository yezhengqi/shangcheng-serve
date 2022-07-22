<template>
  <div>
    <el-card>
      <div slot="header" class="title">
        <span style="font-weight: 600">销售额类别占比</span>
        <el-radio-group v-model="radio" size="mini">
          <el-radio-button label="全部渠道" />
          <el-radio-button label="线上" />
          <el-radio-button label="门店" />
        </el-radio-group>
      </div>

      <div ref="charts" class="charts" />
    </el-card>
  </div>
</template>

<script>
import echatrs from 'echarts'
export default {
  data() {
    return {
      radio: '全部渠道'
    }
  },
  mounted() {
    const charts = echatrs.init(this.$refs.charts)
    charts.setOption({
      title: {
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outsize'
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: '视频广告' },
            { value: 735, name: '搜索引擎' },
            { value: 580, name: '直接访问' },
            { value: 484, name: '邮件营销' },
            { value: 300, name: '联盟广告' }
          ]
        }
      ]
    })
    charts.on('mouseover', (params) => {
      const { name, value } = params.data
      charts.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }

}
</script>

<style scoped>
  /deep/.el-card__header{
    height: 55px;
  }
  .title{
    display: flex;
    justify-content:space-between;
  }
  .charts{
    width: 100%;
    height: 231px;
  }
</style>
