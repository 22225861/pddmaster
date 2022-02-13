<template>
<div class="cell" @click="clickCell(leftTitle)">
  <div class="cell-left" :style="{color:leftTitleColor}">
    <i :class="leftIcon"></i>
    <span v-show="leftTitle">{{ leftTitle }}</span>
  </div>
  <div class="cell-right" :style="{color:RightTitleColor}">
    <span style="font-size: 13px" v-show="RightTitle">{{ RightTitle }}</span>
    <i  class="itlike-uniE909" v-show="isSHowRightArrow"></i>
  </div>
</div>
</template>

<script>
export default {
  name: "MeCommonCell",
  props:{
    leftTitle:{
     type: String,
      default:''
    },
    leftIcon:{
      type: String,
      default:''
    },
    RightTitle:{
      type: String,
      default:''
    },
    leftTitleColor:{
      type: String,
      default:'#333'
    },
    RightTitleColor:{
      type: String,
      default:'#666'
    },
    isSHowRightArrow:{
      type:Boolean,
      default:true
    },
    clickCell:{
      type:Function,
      default:()=>{}
    }
  }
}
</script>

<style lang="stylus" scoped>
.cell
  height 44px
  background-color #fff
  display flex
  justify-content space-between
  align-items center
  padding 0 10px
  border-bottom 1px solid #ececec
  .cell-left,
  .cell-right
    display flex
    align-items center
    i
      margin-right 5px
</style>
