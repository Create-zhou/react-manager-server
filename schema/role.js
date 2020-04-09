const mongoose =  require('mongoose')


//设置用户表的数据格式
const roleSchema = new mongoose.Schema({
    name:String,
    create_time:{        //角色创建的初始时间
        type:Date,
        default:Date.now    //必须是函数的形式  不可以是函数()
    },
    auth_name: String, // 授权人
    auth_time: Date, // 授权时间
    menus:{        //角色的权限
        type:Array,
        default:[]
    },       
})


module.exports = mongoose.model('roles',roleSchema)