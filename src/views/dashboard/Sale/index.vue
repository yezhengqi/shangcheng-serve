<template>
  <div>
    <el-card class="box">
      <div class="sale">
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="销售额" name="sale" />
          <el-tab-pane label="访问量" name="visite" />
        </el-tabs>
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMoon">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width:250px"
          />
        </div>
      </div>

      <div class="echartsRank">
        <el-row :gutter="10">
          <el-col :span="16">
            <div ref="echarts" style="width:100%;height:300px" />
          </el-col>
          <el-col :span="8">
            <h4 style="margin:0 0 15px 0">门店{{ title }}排名</h4>
            <ul style="margin:0;height:300px" class="rank">
              <li>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <span class="rankmark">1</span>
                  </el-col>
                  <el-col :span="12">肯德基</el-col>
                  <el-col :span="6">123456</el-col>
                </el-row>
              </li>
              <li>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <span class="rankmark">2</span>
                  </el-col>
                  <el-col :span="12">肯德基</el-col>
                  <el-col :span="6">123456</el-col>
                </el-row>
              </li>
              <li>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <span class="rankmark">3</span>
                  </el-col>
                  <el-col :span="12">肯德基</el-col>
                  <el-col :span="6">123456</el-col>
                </el-row>
              </li>
              <li>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <span>4</span>
                  </el-col>
                  <el-col :span="12">肯德基</el-col>
                  <el-col :span="6">123456</el-col>
                </el-row>
              </li>
              <li>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <span>5</span>
                  </el-col>
                  <el-col :span="12">肯德基</el-col>
                  <el-col :span="6">123456</el-col>
                </el-row>
              </li>
              <li>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <span>6</span>
                  </el-col>
                  <el-col :span="12">肯德基</el-col>
                  <el-col :span="6">123456</el-col>
                </el-row>
              </li>
              <li>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <span>7</span>
                  </el-col>
                  <el-col :span="12">肯德基</el-col>
                  <el-col :span="6">123456</el-col>
                </el-row>
              </li>

            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echats from 'echarts'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      activeName: 'sale',
      date: [],
      echarts: ''
    }
  },
  computed: {
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    }
  },
  watch: {
    title() {
      this.echarts.setOption({
        title: {
          text: this.title + '趋势'
        }
      })
    }
  },
  mounted() {
    this.echarts = echats.init(this.$refs.echarts)
    this.echarts.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220, 101, 600, 340, 55, 450],
          color: 'rgb(139, 193, 55)'
        }
      ]
    })
  },
  methods: {
    // 获取日周月年时间
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(0).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setMoon() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    }
  }
}
</script>

<style scoped>
  .box{
     margin-top: 15px;
  }
  .sale{
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .tab{
    width: 100%;
  }
  .right{
    position: absolute;
    line-height: 40px;
    right: 0;
  }
  .right span{
    margin: 0 8px;
    font-size: 14px;
    font-weight: 600;
  }
  .rank{
    list-style: none;
    padding: 0;
    padding-left: 10px;
  }
  .rank li{
    width: 100%;
    height: 14%;
  }
  .rank .rankmark{
    display: inline-block;
    background: black;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 14px;
    color: white;
    text-align: center;
    line-height: 18px;
  }
</style>
