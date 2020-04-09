const mongoose = require('mongoose')


//设置用户表的数据格式
const  userSchema = new mongoose.Schema({
    username:String,  //用户名
    password:String,  //用户密码
    create_time:{   
      type:String, 
     default:new Date()   //用户创建时的初始时间
    }
})
//project 数据库下的users 使用userSchema这个数据格式
module.exports = mongoose.model('Users',userSchema)