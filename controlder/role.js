//引入角色模型
const Roles = require('../schema/role')

//添加角色
exports.addRole = async cxt => {
    
    const {roleName} = cxt.request.body
    const result = await Roles.findOne({ name: roleName })
    if (result) { //如果找到了 就提示角色名称重复
        cxt.body = {
            status: 1,
            msg: '该角色名称重复'
        }
    } else {      //如果没有找到该角色 就添加该角色
        const role = await Roles.create({ name: roleName})
        // console.log(role)
        cxt.body = {
            status: 0,
            data: role,
            msg: '添加角色成功',
        }
    }
}

//获取所有的角色集合
exports.getRoles = async cxt => {
    // console.log(cxt.query)
    //找到所有的角色信息
    const result = await Roles.find()
    // console.log(result)
    if (result.length) {   //如果找到了角色集合  那就把集合返回给前台
        cxt.body = {
            status: 0,
            msg: '获取角色成功',
            data: result
        }
    }else{
        cxt.body = {
            status: 1,
            msg: '获取角色列表失败',
        }
    }

}

//修改角色权限
exports.updateRole = async cxt => {
    
    const { menus ,_id} = cxt.request.body
    const result = await Roles.findById({_id})
    if (result.menus.toString()===menus.toString()) { //如果前端传递的权限信息menus 和查询到的权限信息重复 
        cxt.body = {
            status: 1,
            msg: '权限信息重复，请更改权限'
        }
    } else {      //如果权限没有重复  那就修改该角色信息  $set 只会修改指定的属性
        const role = await Roles.updateOne(result,{$set:cxt.request.body})
        cxt.body = {
            status: 0,
            msg: '修改权限成功',
            data:role
        }
    }
}

//获取单个角色的信息
exports.getRole = async cxt => {
    // console.log(cxt.query)
   
    const result = await Roles.findById({_id:cxt.query.roleId})

    console.log(result)

    if(result){ //如果找到了该角色  就返回该角色的信息
        cxt.body = {
            status:0,
            msg:'角色查找成功',
            data:result
        }
    }else{
        cxt.body = {
            status:1,
            msg:'未找到该角色',
        }
    }
}


