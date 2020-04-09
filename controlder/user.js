//引入用户模型
const Users = require('../schema/userSchema')

//添加用户
exports.addUser = async cxt => {
    const { username, parentId } = cxt.request.body
    const result = await Users.findOne({ username })
    console.log(result)
    if (result) { //如果找到了 就提示用户名称重复
        cxt.body = {
            status: 1,
            msg: '用户名称不可重复'
        }
    } else {      //如果没有找到该用户 就添加该分用户
        const user = await Users.create(cxt.request.body)
        cxt.body = {
            status: 0,
            data: user,
            msg: '创建用户成功',
        }
    }
}

//获取所有的用户集合
exports.getUsers = async cxt => {
    // const { parentId } = cxt.request.query
    //找到所有的用户    username 不等于admin 
    const result = await Users.find({username:{$ne:'admin'}})
    // console.log(result)
    if (result.length) {   //如果找到了用户集合  那就把集合返回给前台
        cxt.body = {
            status: 0,
            msg: '获取用户集合成功',
            data: result
        }
    }else{
        cxt.body = {
            status: 1,
            msg: '获取用户失败',
        }
    }

}


//修改用户信息
exports.updateUser = async cxt => {
    
    console.log( cxt.request.body)
    const {_id,username} = cxt.request.body
    const result = await Users.findById({_id})
    if (result.username===username) { //如果前端传递的用户名 和查询到的用户名重复 
        cxt.body = {
            status: 1,
            msg: '用户已存在，不可修改'
        }
    } else {      //如果用户没有重复  那就修改该用户
        await Users.updateOne(result,{$set:cxt.request.body})
        cxt.body = {
            status: 0,
            msg: '修改用户成功',
        }
    }
}

//删除用户信息
exports.deleteUser = async cxt => {

    const {_id} = cxt.request.body
    const result = await Users.findById({_id})
    // console.log( result)
    if(result){ //如果找到该用户 那就删除
       const user =  await Users.deleteOne({_id})
        //console.log(user)
       cxt.body = {
           status:0,
           msg:'删除用户成功'
       }
    }

}
    