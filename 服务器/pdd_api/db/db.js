const  mysql=require('mysql')
const conn=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'admin123',
    database:'db_film'
})
    conn.connect()
module.exports=conn
