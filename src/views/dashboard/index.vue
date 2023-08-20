<template>
  <div class="dashboard-container">
    <Card></Card>
    <Sale></Sale>
    <Bottom></Bottom>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './card'
import Sale from './sale'
import Bottom from './bottom'

export default {
  name: 'Dashboard',
  components: {
    Card,Sale,Bottom
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
