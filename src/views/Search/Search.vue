<template>
  <div class="search">
    <!--搜索导航-->
    <search-nav :isShowSearchPanel="isShowSearchPanel"/>
    <!--  联动列表-->
    <div class="shop">
      <!--   左边-->
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item"
              v-for="(goods, index) in searchgoods"
              :key="index"
              :class="{current: index === currentIndex}"
              @click="clickLeftItem(index)"
              ref="menulist"
          >
            <span>{{goods.name}}</span>
          </li>

        </ul>
      </div>
      <!--   右边-->
      <div class="shop-wrapper" >
        <ul ref="shopsParent">
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
    <!-- 搜索面板-->
    <SearchPanel v-if="isShow"  :isShowSearchPanel="isShowSearchPanel"></SearchPanel>

  </div>
</template>

<script>
import SearchNav from './children/SearchNav'
import {mapState} from "vuex";
import  BScroll from 'better-scroll'
import SearchPanel from "@/views/Search/children/SearchPanel";
export default {
  name: "Search",
  data(){
    return{
      scrollY:0, //右侧列表滑动的Y轴坐标
      rightLiTops:[], //所有分类的头部位置
      isShow:false   //设置搜索面板显示
    }

  },
  mounted() {
    this.$store.dispatch('reqSearchGoods')

  },
  components: {
    SearchNav,
    SearchPanel
  },
  methods:{
    _initBScroll(){
      //左边
     this.leftScroll=new BScroll('.menu-wrapper',{
        click:true
      })
      //右边
      this.rightScroll=new BScroll('.shop-wrapper',{

        probeType:3 //只有设置probeType才可以执行监听右端的滚动事件 probeType:1迟钝触发 probeType:2灵敏触发 3 更灵敏
      })
      //监听右端的滑动事件
      this.rightScroll.on('scroll',(pos)=>{
        this.scrollY=Math.abs(pos.y)
        console.log(this.scrollY)
      })
      //console.log(thileftScroll,this.rightLiTops)
    },
    //求出所有板块的头部位置
    _initRightLiTops(){
      //临时数组
      const tempArr=[]
      //定义变量记录高度
      let top=0
      tempArr.push(top)
      //遍历li标签，取出高度
      let allLis=this.$refs.shopsParent.getElementsByClassName('shop-li')
      Array.prototype.slice.call(allLis).forEach(li=>{
        top+=li.clientHeight
        tempArr.push(top)
      })

      //更新数据
      this.rightLiTops=tempArr
      console.log(this.rightLiTops)
    },

    // 1.3  点击切换
    clickLeftItem(index) {
      this.scrollY = this.rightLiTops[index];
      this.rightScroll.scrollTo(0, -this.scrollY, 300);
    },
    //左侧联动
    _leftScroll(index){
      let menuLists=this.$refs.menulist
      let el=menuLists[index]
      // console.log(el)
      this.leftScroll.scrollToElement(el,300, 0,-100)

    },
    //设置搜索面板显示
    isShowSearchPanel(flag){
      this.isShow=flag
    }
  },
  computed:{
    ...mapState(['searchgoods']),
    //用于动态决定左侧哪个选项被选中
    currentIndex(){
      //获取数据
      const {scrollY,rightLiTops }= this
      //取出索引
      return rightLiTops.findIndex((liTop,index)=>{
        this._leftScroll(index)
        return scrollY>=liTop &&scrollY< rightLiTops[index+1]
      })


    }
  },
  watch:{
    searchgoods(){
      this.$nextTick(()=>{

        //初始化
        this._initBScroll()
        //求出所有板块的头部位置
        this._initRightLiTops()
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
