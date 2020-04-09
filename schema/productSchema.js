const mongoose = require('mongoose')


//设置用户表的数据格式
const productSchema = new mongoose.Schema({
     name:String,//商品的名字
     desc:String,//商品描述
     price:String,//商品的价格
     categoryId:String, //菜单下的一级分类
     pCategoryId:String,  //菜单下的二级分类      若是无二级分类 parentId为字符串'0'
     imgs:Array,  //储存图片的数组
     details:String    //储存详细描述的文本
})
//project 数据库下的categorys 使用categorySchema这个数据格式
module.exports = mongoose.model('product',productSchema)