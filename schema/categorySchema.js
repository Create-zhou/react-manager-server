const mongoose = require('mongoose')


//设置用户表的数据格式
const  categorySchema = new mongoose.Schema({
     name:String,//分类的名字
     parentId:{  //如果是0，表示是一级分类 如果不是0，就是二级分类
         type:String,
         default:'0'
     }
})
//project 数据库下的categorys 使用categorySchema这个数据格式
module.exports = mongoose.model('categorys',categorySchema)