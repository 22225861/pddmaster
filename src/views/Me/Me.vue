<template>
<div class="me">
  <select-login v-if="!userInfo.id"></select-login >
  <div v-else>
    <me-top></me-top>
  </div>
</div>
</template>

<script>
import SelectLogin from "@/views/Login/SelectLogin";
import {mapState} from "vuex";
import meTop from "@/views/Me/MeTop";
export default {
  name: "Me",
  computed:{
    ...mapState(['userInfo'])
  },
  components:{
    SelectLogin,
    meTop
  }
}
</script>

<style lang="stylus" scoped>

.me
  background #F5F5F5
  width 100%
  height 100%
</style>
