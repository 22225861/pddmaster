 import ajax from './ajax'

//基础路径
const BASE_URL='http://127.0.0.1:3000'
//请求首页轮播图
export const getHomeCasual=()=>ajax(BASE_URL+'/api/homecasual')
//请求首页导航栏
export const getHomeNav=()=>ajax(BASE_URL+'/api/homenav')
//请求首页购物列表信息
export const getHomeShopList=()=>ajax(BASE_URL+'/api/homeshoplist')
//请求推荐的商品数据
export const getRecommendShopList=(params)=>ajax(BASE_URL+'/api/recommendshoplist',params)//添加参数是为了方便请求多少页的数据 方便下拉/上拉数据显示
//请求推荐的商品数据
export const getSearchGoods=()=>ajax(BASE_URL+'/api/searchgoods')
