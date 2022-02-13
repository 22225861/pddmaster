 import ajax from './ajax'

//基础路径
const BASE_URL='http://localhost:3000'
//请求首页轮播图
export const getHomeCasual=()=>ajax(BASE_URL+'/api/homecasual')
//请求首页导航栏
export const getHomeNav=()=>ajax(BASE_URL+'/api/homenav')
//请求首页购物列表信息
export const getHomeShopList=()=>ajax(BASE_URL+'/api/homeshoplist')
//请求推荐的商品数据
export const getRecommendShopList=(params)=>ajax(BASE_URL+'/api/recommendshoplist',params)//添加参数是为了方便请求多少页的数据 方便下拉/上拉数据显示
//请求搜索的商品数据
export const getSearchGoods=()=>ajax(BASE_URL+'/api/searchgoods')
 //请求短信验证码
 export const getPhoneCode=(phone)=>ajax(BASE_URL+'/api/send_code',{phone})
 //手机验证码登录
 export const PhoneCodeLogin=(phone,code)=>ajax(BASE_URL+'/api/login_code',{phone,code},"POST")
 //用户名和密码登录
 export const pwdLogin=(name,pwd,captcha)=>ajax(BASE_URL+'/api/login_pwd',{name,pwd,captcha},"POST")
  //用户名和密码登录
 // export const getUserInfo=()=>ajax(BASE_URL+'/api/user_info')
  //退出登录
  export const getLogOut=()=>ajax(BASE_URL+'/api/logout')
 // 修改用户信息
 export const changeUserInfo = (user_id, user_name, user_sex, user_address, user_birthday, user_sign) => ajax(BASE_URL + '/api/change_user_msg', {
  user_id,
  user_name,
  user_sex,
  user_address,
  user_birthday,
  user_sign
 }, 'POST');

 //  加入购物车
 export const addGoodsToCart = (user_id, goods_id, goods_name, thumb_url, price) => ajax(BASE_URL + '/api/add_shop_cart', {user_id, goods_id, goods_name, thumb_url, price}, 'POST');

 // 请求购物车的数据
 export const getCartsGoods = () => ajax(BASE_URL + '/api/cart_goods');

