import {
    getHomeCasual,
    getHomeNav,
    getHomeShopList,
    getRecommendShopList,
    getSearchGoods,
    //getUserInfo
} from './../api/index';
import {
    HOME_CASUAL,
    HOME_NAV,
    HOME_Shop_List,
    Recommend_Shop_List,
    Search_Goods,
    User_Info
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
    //  async getUserInfo(){
    //     const  result=await getUserInfo()
    //     console.log(result)
    // }
}
