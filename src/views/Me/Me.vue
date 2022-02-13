<template>
<div class="me">

  <div v-if="userInfo.id">主面板</div>
  <select-login v-else></select-login >
</div>
</template>

<script>
import SelectLogin from "@/views/Login/SelectLogin";
import {mapState} from "vuex";

export default {
  name: "Me",
  computed:{
    ...mapState(['userInfo'])
  },
  components:{
    SelectLogin
  }
}
</script>

<style lang="stylus" scoped>

.me
  background #F5F5F5
  width 100%
  height 100%
</style>
