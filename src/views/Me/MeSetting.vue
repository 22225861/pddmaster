<template>
<div class="me-setting">
  <div>
    <me-common-cell left-icon="itlike-3" left-title="免密支付设置"></me-common-cell>
    <me-common-cell left-icon="itlike-2" left-title="免拼卡设置" :click-cell="dealClickCell"></me-common-cell>
    <me-common-cell left-icon="itlike-1" left-title="消息接收设置" right-title="接收" right-title-color="red"></me-common-cell>

  </div>
  <div style="margin-top: 10px">
    <me-common-cell left-icon="itlike-3" left-title="免密支付设置" :click-cell="dealClickCell"></me-common-cell>
    <me-common-cell left-icon="itlike-3" left-title="免密支付设置"></me-common-cell>
    <me-common-cell left-icon="itlike-3" left-title="免密支付设置"></me-common-cell>
  </div>
  <div class="logout" @click="dealLogout">
    退出登录
  </div>
</div>
</template>

<script>
import MeCommonCell from "@/views/Me/MeCommonCell";
import {Toast,MessageBox} from 'mint-ui'
import {mapActions} from "vuex";

export default {
  name: "MeSetting",
  components :{
    MeCommonCell
  },
  methods :{
    dealClickCell(props){
      Toast('点击了'+props)
    },
    ...mapActions(['logout']),
    dealLogout(){
      MessageBox.confirm('您确定退出吗？').then(action=>{
        console.log(action)
        if ('confirm'===action){
            this.logout({})
          //回到主页面
          this.$router.replace('/home')
        }
      })
    }
  }

}
</script>

<style lang="stylus" scoped>

.logout
  width 100%
  height 44px
  margin-top 10px
  background-color #fff
  display flex
  justify-content center
  align-items center
  text-align center
</style>
