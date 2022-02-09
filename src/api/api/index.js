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
export const getRecommendShopList=()=>ajax(BASE_URL+'/api/recommendshoplist')
