<template>
<div class="recommend">接受</div>
</template>

<script>
export default {
  name: "Recommend",
  mounted() {
    this.$store.dispatch("reqrecommendShopList")
  }
}
</script>

<style lang="stylus" scoped>
.recommend
  background aquamarine
</style>
