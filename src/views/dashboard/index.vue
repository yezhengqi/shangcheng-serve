<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <Home />
      <Sale />
      <SearAndCategory />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Home from './Home'
import Sale from './Sale'
import SearAndCategory from './SearAndCategory'
export default {
  name: 'Dashboard',
  components: {
    Home,
    Sale,
    SearAndCategory
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>
