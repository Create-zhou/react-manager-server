const categorys = require('../schema/categorySchema')



//添加分类
exports.CategoryAdd = async cxt=>{
    const {categoryName,parentId} = cxt.request.body
   const result = await categorys.findOne({name:categoryName})
     if(result){  //如果找到了分类名称 提示重复 如果没找到 那就添加
       cxt.body={
           status:1,
           msg:'该分类添加重复'
       }
       
       }else{
      const category = await categorys.create({name:categoryName,parentId})
        cxt.body={
            status:0,
            data:category,
            msg:'该分类添加成功'
        }
       }
        
     }



//获取分类数据的集合
exports.getCategory = async cxt => {
   const {parentId} = cxt.request.query

   //找到所有的一级分类
 const result = await  categorys.find({parentId})
 if(result.length){  //如果找到分类集合 把集合返回给集合
    cxt.body={
        status:0,
        msg:'获取分类成功',
        data:result
    }
 }else{
     cxt.body={
         status:1,
         msg:'当前无数据 请添加'
     }
 }
}


//修改分类名称
exports.UpdataCategorys=async cxt=>{
    const {CategoryName,_id} = cxt.request.body
    const result = await categorys.findById({_id})
      if(result.name===CategoryName){  //如果前端传递的分类名和查询的分类名重复
        cxt.body={
            status:1,
            msg:'该分类已存在不可修改'
        }
        }else{
          await categorys.updateOne(result,{$set:{name:CategoryName}})
            cxt.body = {   //如果分类没有重名 那就修改该分类
                status:0,
                msg:'修改成功'
            }
        }
      }

  //获取单个分类的详细信息
  exports.getCategoryId = async cxt=>{
       const {categoryId} = cxt.query
      const result =  await  categorys.findById({_id:categoryId})
      if(result){   //如果找到了改分类
       cxt.body={
         status:0,
         data:result,
         msg:'查找信息成功'
       }
      }
  }    
 
 