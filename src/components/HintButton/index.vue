<template>
  <a style="margin:0 10px" :title="title">
    <el-button v-bind="$attrs" v-on="$listeners" />
  </a>
</template>

<script>
export default {
  name: 'HinButton',
  props: ['title']
}
</script>

<style>

</style>
