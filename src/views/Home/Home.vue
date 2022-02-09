<template>
<div class="home">
 <ly-tab
    v-model="selected"
    :items="items"
    :options="options"
    @change="handleChange"
    class="fix"
 >


 </ly-tab>

  <router-view></router-view>
</div>
</template>

<script>

window.addEventListener('resize',function () {
  location.reload()
})
export default {
  name: "Home",
  data(){
    return {
      selected:0,//选中的id
      items:[
        {
          label:'热门',
        },
        {
          label:'服饰',
        },
        {
          label:'鞋包',
        },
        {
          label:'母婴',
        },{
          label:'百货',
        },{
          label:'食品',
        },
        {
          label:'内衣',
        },
        {
          label:'男装',
        },
        {
          label:'电器',
        }

      ],
      options:{
        activeColor: '#e9232c'//设置选中的颜色
      },
      subRouteUrl:[
        '/home/hot',
        '/home/dress',
        '/home/box',
        '/home/mbaby',
        '/home/general',
        '/home/food',
        '/home/shirt',
        '/home/man',
        '/home/ele',



      ]
    }
  },
  methods:{
    handleChange(item,index){
      //console.log(item,index)
      this.$router.replace(this.subRouteUrl[index])
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  background #f5f5f5
  width 100%
  height 100%
  .fix
    position fixed
    left 0
    top 0
    z-index 997
</style>
