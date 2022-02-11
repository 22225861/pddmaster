<template>
  <div class="recommend-container" v-if="recommendshoplist.length > 0">
    <ul class="recommend">
              <ShopList
                tag="li"
                v-for="(item, index) in recommendshoplist"
                :item = item
                :key="index"
              />
    </ul>
  </div>
</template>

<script>
import ShopList from "@/components/ShopList/ShopList";
import BScroll from "better-scroll";
import {mapState} from 'vuex'
export default {
  name: "Recommend",
  components:{
    ShopList
  },
  data(){
    return{
      page:1,
      count:20,
    }
  },
  mounted() {
    this.$store.dispatch("reqrecommendShopList",{page:this.page,count:this.count})
  },

  computed:{
    ...mapState(['recommendshoplist'])
  },
  watch:{
    recommendshoplist(){
      this.$nextTick(()=>{
        //让当前页码加一
        this.page+=1
        this._initBScroll()
      })
    }
  },
  methods:{
    _initBScroll() {
      //初始化
      this.listenScroll=new BScroll('.recommend-container',{
        probeType:3,
        scrollY:true

      })
      //监听列表滚动
      this.listenScroll.on('touchEnd',(pos)=>{
        // console.log(pos.y)
        // console.log(this.listenScroll.maxScrollY)
        //监听上拉
        if(pos.y>=50){
          console.log('下拉刷新')
        }
        //监听下拉
        if (this.listenScroll.maxScrollY>pos.y+20){
          console.log(this.page)
          console.log('下拉刷新')
          this.$store.dispatch("reqrecommendShopList",{page:this.page,count:this.count})
        }
      })

    }
  }

}
</script>

<style lang="stylus" scoped>
.recommend-container
  background #F5F5F5
  width 100%
  height 100%
  overflow hidden
  .recommend
    display flex
    flex-direction row
    flex-wrap wrap
    background #F5F5F5
    padding-bottom 50px
</style>
