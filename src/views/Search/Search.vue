<template>
  <div class="search">
    <!--搜索导航-->
    <search-nav/>

    <div class="shop">
      <!--   左边-->
      <div class="menu-wrapper">
        <ul>
          <li class=" menu-item" v-for="(goods,index) in searchgoods" :key="index">
            <span>{{goods.name}}</span>
          </li>

        </ul>
      </div>
        <!--   右边-->
      <div class="shop-wrapper" >
        <ul>
          <li class="shop-li" v-for="(goods,index) in searchgoods" :key="index">
            <div class="shops-title">
              <h4>
                {{ goods.name }}
              </h4>
              <a href="">查看更多</a>
            </div>
            <ul class="phone-type" v-if="goods.tag === 'phone'">
              <li v-for="(phone, index) in goods.category" :key="index">
                <img :src="phone.icon" alt="">
              </li>
            </ul>
              <ul class="shop-items">
                <li v-for="(item,index2) in goods.items" :key="index2">
                  <img :src="item.icon" alt="">
                  <span>{{item.title}}</span>
                </li>
              </ul>
          </li>
        </ul>
      </div>



    </div>

  </div>
</template>

<script>
import SearchNav from './children/SearchNav'
import {mapState} from "vuex";
import  BScroll from 'better-scroll'

export default {
  name: "Search",
  mounted() {
    this.$store.dispatch('reqSearchGoods')
  },
  components: {
    SearchNav
  },
  methods:{
    _initBScroll(){
      //左边
     let  leftScroll=new BScroll('.menu-wrapper',{})
      //右边
      let  rightScroll=new BScroll('.shop-wrapper',{})
      console.log(leftScroll,rightScroll)
    },

  },
  computed:{
    ...mapState(['searchgoods'])
  },
  watch:{
    searchgoods(){
      this.$nextTick(()=>{
        //左边
        this._initBScroll()

      })
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.search
  background #F5F5F5
  width 100%
  height 100%
  overflow hidden
.shop
  display flex
  position absolute
  top 60px
  bottom 50px
  width 100%
  overflow hidden
  .menu-wrapper
    width 80px
    flex 0 0 80px
    .menu-item
      width 100%
      height 60px
      background-color #fafafa
      display flex
      justify-content center
      align-items center
      color #666666
      font-weight lighter
      position relative
    .current
      color #e02e24
    .current::before
      content ''
      background-color: #e02e24
      width 4px
      height 30px
      position absolute
      left 0

  .phone-type
    width 100%
    display flex
    flex-direction row
    flex-wrap wrap
    border-bottom-1px(#ccc)
    li
      width 33.3%
      display flex
      justify-content center
      align-items center
      margin 5px 0
      img
        width 70%
  .shop-wrapper
    flex 1
    background-color: #fff
    .shops-title
      display flex
      flex-direction row
      padding  0 10px
      height 44px
      align-items center
      justify-content space-between
      color #999
      a
        color #999
        text-decoration none
        font-weight lighter


    .shop-items
      display flex
      flex-wrap wrap
      li
        display flex
        flex-direction column
        justify-content center
        align-items center
        width 33.3%
        height 90px
        color #666
        font-weight lighter
        font-size 14px

        img
          width 60%
          height 60%
          margin-bottom 5px







</style>
