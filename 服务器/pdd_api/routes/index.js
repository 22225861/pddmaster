const express = require('express');
const router = express.Router();

const  conn=require('./../db/db')
const data = require("../data/recommend_users.json");
const svgCaptcha=require('svg-captcha')
const sms_util=require('./../util/sms_util')

const md5 = require('blueimp-md5');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let users = {}; // 用户信息

/**
 * 获取首页轮播图
 */
router.get('/api/homecasual', (req, res)=>{
   let sqlStr = 'select * from pdd_homecasual';
    conn.query(sqlStr,(error,results,fields)=>{
        if(error) {
            res.json({
                err_code:0,
                message:'请求数据失败'
            })
        }else {
            res.json({success_code:200,message:results})
        }

    })
   // conn.query(sqlStr, (err, results) => {
   //     if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
   //     res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
   // })
  // const data = require('../data/homecasual.json');
  // res.json({success_code: 200, message: data})
});

/**
 * 获取首页导航
 */
router.get('/api/homenav', (req, res)=>{
  /*
  let sqlStr = 'select * from homenav';
   conn.query(sqlStr, (err, results) => {
       if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
       res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
   })
   */
  const data = require('../data/homenav');
  res.json({success_code: 200, message: data});
});

/**
 * 获取首页商品列表
 */
router.get('/api/homeshoplist', (req, res)=>{
  /*
 let sqlStr = 'select * from homeshoplist';
  conn.query(sqlStr, (err, results) => {
      if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
      res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
  })
  */
  setTimeout(function () {
    const data = require('../data/shopList');
    res.json({success_code: 200, message: data})
  }, 300);
});

/**
 * 获取推荐商品列表
 */
const recommendArr=require('./../data/recommend.json').data
router.get('/rercommend/api', (req, res,next)=>{
  // setTimeout(function () {
  //   const data = require('../data/recommend');
  //   res.json({success_code: 200, message: data})
  // }, 10);
 let  temp_arr_all=[];
 for (let i=0;i<recommendArr.length;i++){
     //取出单个数据对象
     let oldItem=recommendArr[i]
     // console.log(oldItem)
     //取出数据表中对应的字段
     let temp_arr=[]
     temp_arr.push(oldItem.goods_id)
     temp_arr.push(oldItem.goods_name)
     temp_arr.push(oldItem.short_name)
     temp_arr.push(oldItem.thumb_url)
     temp_arr.push(oldItem.hd_thumb_url)
     temp_arr.push(oldItem.image_url)
     temp_arr.push(oldItem.price)
     temp_arr.push(oldItem.normal_price)
     temp_arr.push(oldItem.market_price)
     temp_arr.push(oldItem.sales_tip)
     temp_arr.push(oldItem.hd_url)
     temp_arr_all.push(temp_arr)

 }
 // console.log(temp_arr_all)
    //批量插入数据库
    //数据库查询语句
    let sqlStr ="insert into  pdd_recommend (`goods_id`,`goods_name`,`short_name`,`thumb_url`,`hd_thumb_url`,`image_url`,`price`,`normal_price`,`market_price`,`sales_tip`,`hd_url`)values ?";
    conn.query(sqlStr,[temp_arr_all],(error,results,fields)=>{
        if(error) {
            console.log('插入失败')
        }else {
            console.log('插入成功')
        }

    })
});

/**
 * 获取推荐商品列表拼单用户
 */
router.get('/api/recommenduser', (req, res)=>{
  setTimeout(function () {
    const data = require('../data/recommend_users');
    res.json({success_code: 200, message: data})
  }, 10);
});

router.get('/api/shopList', (req, res)=>{
  setTimeout(function () {
    const data = require('../data/shopList.json');
    res.json({success_code: 200, message: data})
  }, 10);
});
router.get('/api/searchgoods', (req, res) => {
    setTimeout(function () {
        const data = require('../data/search');
        res.json({success_code: 200, message: data})
    }, 10);
});
router.get('/api/recommendshoplist',(req,res)=>{
    let  pageNo=req.query.page || 1;
    let  pageSize=req.query.count || 20;
    console.log(pageNo,pageSize)

    let  sqlStr='select * from pdd_recommend LIMIT '+(pageNo-1)*pageSize+','+ pageSize
    // console.log(sqlStr)
    //执行语句
    conn.query(sqlStr,(error,results,field)=>{
        setTimeout(()=>{
            if (error){
                res.json({err_code:0,message:'请求数据失败'})
            }else{
                res.json ({success_code:200,message:results})
            }
        },1000)
        })

})

//一次性图形验证码
router.get('/api/captcha',(req,res)=>{
    //生成随机验证码
    let captcha=svgCaptcha.create({
        color:true,
        noise:2,
        ignoreChars:'0oli',
        size:4
    })
    //console.log(captcha.text)
    req.session.captcha=captcha.text.toLocaleLowerCase()
    //返回客户端
    res.type('svg')
    res.send(captcha.data)
    console.log(req.session.captcha)
})

//发送验证码短信
router.get('/api/send_code',(req,res)=>{
        //1.获取手机号码
    let phone=req.query.phone
    //2.随机产生验证码
    let code=sms_util.randomCode(6)
    // console.log(code)
    // 成功
    setTimeout(() => {
        users[phone] = code;
        res.json({success_code: 200, message: code});
    }, 2000);

    // 失败
    // setTimeout(()=>{
    //     res.json({err_code: 0, message: '验证码获取失败!'});
    // }, 2000);
    // res.json({err_code: 0, message: '验证码获取失败!'});


})

//手机验证码登录
router.post('/api/login_code',(req,res)=>{
    //获取数据
    const phone=req.body.phone
    const code=req.body.code

    //验证验证码是否正确
    if (users[phone]!==code){
        res.json({err_code:0,message:'验证码不正确！'})
        return
    }
    //查询
    delete users[phone]
    let  sqlStr="select * from pdd_user_info where user_phone='"+phone +"'limit 1"
    conn.query(sqlStr,(error,results,fields)=>{
        if(error){
            res.json({err_code:0,message:'请求数据失败'})
        }else {
            results=JSON.parse(JSON.stringify(results))
          // console.log(results[0])
            if (results[0]){//用户已经存在
                req.session.userId=results[0].id
                //返回数据给客户端
                res.json({success_code:200,
                    message:{id:results[0].id,user_name:results[0].user_name,user_phone:results[0].user_phone}})

            }else {//新用户
                const addSql="insert into pdd_user_info (user_name,user_phone) values (?,?)"
                const  addSqlParams=[phone,phone]
                conn.query(addSql,addSqlParams,(error,results,fields)=>{
                      results=JSON.parse(JSON.stringify(results))
                    // console.log(results)
                    if (!error){
                        req.session.userId=results.insertId
                        let sqlStr="select * from pdd_user_info where id= '" +results.insertId+ "' limit 1"
                        conn.query(sqlStr,(error,results,fields)=> {
                            if (error) {
                                res.json({err_code: 0, message: '请求数据失败'})
                            }
                            else {
                                results=JSON.parse(JSON.stringify(results))
                                //返回数据给客户端
                                res.json({success_code:200,
                                    message:{id:results[0].id,user_name:results[0].user_name,user_phone:results[0].user_phone}})

                            }
                        })
                    }
                })
            }

        }
    })
})


//用户和密码登录
router.post('/api/login_pwd',(req,res)=>{
    //获取数据
    const user_name=req.body.name
    const user_pwd= md5(req.body.pwd)
    const captcha=req.body.captcha
    req.session.captcha=captcha
    console.log(req.session.captcha,req.session)
    //验证 验证码是否正确
    if (captcha!==req.session.captcha){
        res.json({err_code:0,message:'图形验证码不正确！'})
        return
    }
    delete req.session.captcha
    //查询数据
    let  sqlStr="select * from pdd_user_info where user_name='"+user_name +"'limit 1"
    conn.query(sqlStr,(error,results,fields)=>{
        if(error){
            res.json({err_code:0,message:'用户名不正确'})
        }else {
            results=JSON.parse(JSON.stringify(results))
            // console.log(results[0])
            if (results[0]){//用户已经存在
               // 验证密码是否正确
                if (results[0].user_pwd!==user_pwd){
                    res.json({err_code:0,message:'密码不正确'})
                }else{
                   req.session.userId=results[0].id
                    //返回数据给客户端
                    res.json({
                        success_code:200,
                        message:{id:results[0].id,user_name:results[0].user_name,user_phone:results[0].user_phone},
                        info:'登录成功'
                    })
                }
            }else {//新用户
                const addSql="insert into pdd_user_info (user_name,user_pwd) values (?,?)"
                const  addSqlParams=[user_name,user_pwd]
                conn.query(addSql,addSqlParams,(error,results,fields)=>{
                    results=JSON.parse(JSON.stringify(results))
                    // console.log(results)
                    if (!error){
                        req.session.userId=results.insertId
                        let sqlStr="select * from pdd_user_info where id= '" +results.insertId+ "' limit 1"
                        conn.query(sqlStr,(error,results,fields)=> {
                            if (error) {
                                res.json({err_code: 0, message: '请求数据失败'})
                            }
                            else {
                                results=JSON.parse(JSON.stringify(results))
                                //返回数据给客户端
                                res.json({success_code:200,
                                    message:{id:results[0].id,user_name:results[0].user_name,user_phone:results[0].user_phone}})

                            }
                        })
                    }
                })
            }

        }
        console.log(req.session)
    })

})


//根据session中的用户id获取用户信息
// router.get('/api/user_info',(req,res)=>{
//     let  user_id=req.session.userId
//    console.log(user_id)
//
//     let  sqlStr='select * from pdd_user_info where id= "'+user_id+','+ '" limlit 1'
//     // console.log(sqlStr)
//     //执行语句
//     conn.query(sqlStr,(error,results,field)=>{
//         setTimeout(()=>{
//             if (error){
//                 delete req.session.userId
//                 res.json({err_code:0,message:'请求数据失败'})
//             }else{
//                results=JSON.parse(JSON.stringify(results))
//                 if (!results[0]){
//                     res.json ({
//                         error_code:200,
//                         message: '请先登录'
//                     })
//                 }else{
//                     res.json ({
//                         success_code:200,
//                         message:{id:results[0].id,user_name:results[0].user_name,user_phone:results[0].user_phone}
//                     })
//                 }
//             }
//         },1000)
//     })
//
// })

//退出登录
router.get('/api/logout',(req,res)=>{
    //1.清除session中的userid
    delete req.session.userId
    //返回客户端
    res.json({
        success_code:200,
        message:'退出登录成功'
    })
})

 // 修改用户信息

router.post('/api/change_user_msg', (req, res) => {
    // 1. 获取数据
    const id = req.body.user_id;
    const user_name = req.body.user_name || '';
    const user_sex = req.body.user_sex || '';
    const user_address = req.body.user_address || '';
    const user_birthday = req.body.user_birthday || '';
    const user_sign = req.body.user_sign || '';

    // 2. 验证
    if (!id) {
        res.json({err_code: 0, message: '修改用户信息失败!'});
    }

    // 3. 更新数据
    let sqlStr = "UPDATE pdd_user_info SET user_name = ? , user_sex = ?, user_address = ?, user_birthday = ?, user_sign = ? WHERE id = " + id;
    let strParams = [user_name, user_sex, user_address, user_birthday, user_sign];
    conn.query(sqlStr, strParams, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '修改用户信息失败!'});
        } else {
            res.json({success_code: 200, message: '修改用户信息成功!'});
        }
    });

});


  //添加商品到购物车

router.post('/api/add_shop_cart', (req, res) => {
    // 1. 验证用户
    let user_id = req.body.user_id;
    if(!user_id || user_id !== req.session.userId){
        res.json({err_code:0, message:'非法用户'});
        return;
    }

    // 2. 获取客户端传过来的商品信息
    let goods_id = req.body.goods_id;
    let goods_name = req.body.goods_name;
    let thumb_url = req.body.thumb_url;
    let price = req.body.price;
    let buy_count = 1;
    let is_pay = 0; // 0 未购买 1购买

    // 3. 查询数据
    let sql_str = "SELECT * FROM lk_pdd_cart WHERE goods_id = '" + goods_id + "' LIMIT 1";
    conn.query(sql_str, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '服务器内部错误!'});
        } else {
            results = JSON.parse(JSON.stringify(results));
            // console.log(results);
            if (results[0]) { // 3.1 商品已经存在
                console.log(results[0]);
                let buy_count = results[0].buy_count + 1;
                let sql_str = "UPDATE lk_pdd_cart SET buy_count = " + buy_count + " WHERE goods_id = '" + goods_id + "'";
                conn.query(sql_str, (error, results, fields) => {
                    if (error) {
                        res.json({err_code: 0, message: '加入购物车失败!'});
                    } else {
                        res.json({success_code: 200, message: '加入购物车成功!'});
                    }
                });
            } else { // 3.2 商品不存在
                let add_sql = "INSERT INTO lk_pdd_cart(goods_id, goods_name, thumb_url, price, buy_count, is_pay) VALUES (?, ?, ?, ?, ?, ?)";
                let sql_params = [goods_id, goods_name, thumb_url, price, buy_count, is_pay];
                conn.query(add_sql, sql_params, (error, results, fields) => {
                    if (error) {
                        res.json({err_code: 0, message: '加入购物车失败!'});
                    } else {
                        res.json({success_code: 200, message: '加入购物车成功!'});
                    }
                });
            }
        }
    });

});


 // 查询购物车的商品

router.get('/api/cart_goods', (req, res) => {


    //  数据库查询的语句
    let sqlStr = "SELECT * FROM lk_pdd_cart";
    conn.query(sqlStr, (error, results, fields) => {
        console.log(results)
        if (error) {
            res.json({err_code: 0, message: '请求数据失败'});
        } else {
            // 返回数据给客户端
            console.log('1111')
            res.json({success_code: 200, message: results});
        }
    });
});


module.exports = router;
