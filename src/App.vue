
<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>

</template>
<script>
import TabBar from "@/components/TabBar/TabBar";
export  default {
  name:'app',
  components:{
    TabBar
  }
}
</script>
<style lang="stylus" scoped>
#app
  width:100%
  height:100%


</style>

