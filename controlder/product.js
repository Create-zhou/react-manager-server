const fs = require('fs')
const path = require('path')

//引入商品的模型
const product = require('../schema/productSchema')

//接受前台的图片
exports.imgUpload = async cxt=>{
   const {filename} = cxt.req.file
   cxt.body = {
       status:0,
       msg:'图片上传成功',
       data:{
           name:filename,
           url:`http://localhost:4000/uploads/${filename}`
       }
   }
}

//响应前台的数据删除图片
exports.deleteImg = async cxt=>{
   const {name} = cxt.request.body
   const filename = path.join(__dirname,'../public/uploads',name)
   fs.unlinkSync(filename)
   cxt.body = {
       status:0,
       msg:'图片删除成功',
   }
}


//添加商品
exports.addProduct = async cxt=>{
   const {name} = cxt.request.body
   const result = await product.findOne({name})
   if(result){   //如果找到该商品 提示已经重复
    cxt.body={
       status:1,
       msg:'该商品重复'
    }
   }else{   //如果没有找到该商品 那就添加该商品
     const Product =  await product.create(cxt.request.body)
     cxt.body={
         status:0,
         msg:'添加商品成功',
         data:Product
     }
   }
}


//获取商品
exports.getProduct = async cxt=>{
   let {page,num} = cxt.query
   page = +page    //将字符串转成数字
   num = +num
  let start =(page-1)*num
 const result = await product.find().skip(start).limit(num)
 const total = await product.find().countDocuments()
  cxt.body={
      status:0,
      msg:'获取商品信息成功',
      data:{
          result, //分页的数据
          total, //产品的总数
      }
  }
}


//查询商品
exports.SearchProduct = async cxt=>{
      let {name,desc,page,num} = cxt.query
        page = +page    //将字符串转成数字
        num = +num
       let start =(page-1)*num
       let result =null,total=0;
      if(desc){ //如果是按照描述搜索
      result= await product.find({desc:new RegExp(desc)}).skip(start).limit(num)
      total = await  product.find({desc:new RegExp(desc)}).countDocuments()
      }else{  //按照名称搜索
      result=await product.find({name:new RegExp(name)}).skip(start).limit(num)
     total = await  product.find({name:new RegExp(name)}).countDocuments()
      }
      cxt.body={
          status:0,
          msg:'查找商品成功',
          data:{
           result,total
          }
      }
}


//修改商品
exports.UptateProduct = async cxt=>{
    const {_id,name}  = cxt.request.body 
     const result = await product.findById({_id})

      if(result.name===name){  //如果前端传递的商品名称和查询到的商品名称重复
        cxt.body={
            status:1,
            msg:'该商品已存在不可修改'
        }
        }else{
          await product.updateOne(result,{$set:cxt.request.body })
            cxt.body = {   //如果分类没有重名 那就修改该分类
                status:0,
                msg:'修改成功'
            }
        }

}