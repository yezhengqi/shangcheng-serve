<template>
  <div>
    <el-card style="height:170px">
      <div>
        <div class="title">
          <span>{{ sale }}</span>
          <span class="el-icon-info" />
        </div>
        <span class="count">{{ count }}</span>
        <div class="container">
          <slot name="charts" />
        </div>
        <div class="footer">
          <slot name="footer" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['sale', 'count']
}
</script>

<style scoped>
.title{
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #ccc;
}
.count{
  display: block;
  margin:8px 0;
  font-size: 20px;
  font-weight: 600;
}
.container{
  height: 60px;
  font-size: 12px;
}
.footer{
  box-sizing: border-box;
  border-top: 1px solid rgb(231, 229, 229);
  padding-top: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(151, 151, 151);
}
</style>
