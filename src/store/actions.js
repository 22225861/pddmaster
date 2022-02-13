import {
    getHomeCasual,
    getHomeNav,
    getHomeShopList, getLogOut,
    getRecommendShopList,
    getSearchGoods,
    //getUserInfo,
    getCartsGoods
} from './../api/index';
import {
    HOME_CASUAL,
    HOME_NAV,
    HOME_Shop_List,
    Recommend_Shop_List, Reset_User_Info,
    Search_Goods,
    User_Info,
    Cart_Goods_List
} from "@/store/mutation-types";

export default {
    //获取首页轮播图
    async reqHomeCasual({commit}) {
        const result = await getHomeCasual()
        commit(HOME_CASUAL, {homecasual: result.message})
    },
    //获取首页导航图
    async reqHomeNav({commit}) {
        const result = await getHomeNav()
        commit(HOME_NAV, {homenav: result.message.data})
    },
    //获取首页商品列表信息
    async reqHomeShopList({commit}) {
        const result = await getHomeShopList()
        commit(HOME_Shop_List, {homeshoplist: result.message.goods_list})
    },
    //获取推荐商品列表信息
    async reqrecommendShopList({commit}, params) {

        const result = await getRecommendShopList(params)
        commit(Recommend_Shop_List, {recommendshoplist: result.message})
         params.callback && params.callback()
    },
    //获取推荐商品列表信息
    async reqSearchGoods({commit}) {
        const result = await getSearchGoods()
        commit(Search_Goods, {searchgoods: result.message.data})

    },
    //同步用户信息
    syncUserInfo({commit},userInfo){
        commit(User_Info, {userInfo})

    },
    //异步获取用户信息
    //   async getUserInfo({commit}){
    //     const  result=await getUserInfo()
    //     console.log(result)
    //         if(result.success_code===200){
    //             commit(User_Info,{userInfo:result.message})
    //         }
    //  },
    //退出登录
     async logout({commit}){
        const  result=await getLogOut()
        console.log(result)
         if(result.success_code===200){
             commit(Reset_User_Info)
                  }
    },
    //请求购物车数据
    async reqCartsGoods({commit}) {
        const result = await getCartsGoods();
        if(result.success_code === 200){
            commit(Cart_Goods_List, {cartgoods: result.message})
        }
        else{
            console.log(result.success_code)
        }
    },

}
