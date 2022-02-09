<template>
  <div class="search">
    <!--搜索导航-->
    <search-nav/>

    <div class="shop">
      <!--   左边-->
      <div class="menu-wrapper">
        <ul>
          <li class="current menu-item">
            <span>女装</span>
          </li>
          <li class="menu-item">
            <span>鞋包</span>
          </li>
        </ul>
      </div>
        <!--   右边-->
      <div class="shop-wrapper">
        <ul>
          <li class="shop-li">
            <div class="shops-title">
              <h4>
                女装
              </h4>
              <a href="">查看更多</a>

            </div>
            <ul class="shop-items">
              <li>
                <img src="./images/s1.png" alt="">
                <span>女装</span>
              </li>
              <li>
                <img src="./images/s1.png" alt="">
                <span>女装</span>
              </li>  <li>
              <img src="./images/s1.png" alt="">
              <span>女装</span>
            </li>  <li>
              <img src="./images/s1.png" alt="">
              <span>女装</span>
            </li>  <li>
              <img src="./images/s1.png" alt="">
              <span>女装</span>
            </li>  <li>
              <img src="./images/s1.png" alt="">
              <span>女装</span>
            </li>  <li>
              <img src="./images/s1.png" alt="">
              <span>女装</span>
            </li>  <li>
              <img src="./images/s1.png" alt="">
              <span>女装</span>
            </li>  <li>
              <img src="./images/s1.png" alt="">
              <span>女装</span>
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
export default {
  name: "Search",
  components: {
    SearchNav
  },
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
