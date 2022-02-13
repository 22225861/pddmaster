
<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar v-show="$route.meta.showBottomTabBar"></tab-bar>
  </div>

</template>
<script>
import TabBar from "@/components/TabBar/TabBar";
export  default {
  name:'app',
  components:{
    TabBar
  },
  mounted(){
    // this.$store.dispatch('getUserInfo')
  }
}
</script>
<style lang="stylus" scoped>
#app
  width:100%
  height:100%


</style>

