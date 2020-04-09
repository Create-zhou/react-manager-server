const koa = require('koa');
const fs = require('fs')
const router = require('koa-router');
const static = require('koa-static');
const bodyparser = require('koa-bodyparser') 
const mongoose = require('mongoose')
const {imgUpload,deleteImg,addProduct,getProduct,SearchProduct,UptateProduct} =  require('./controlder/product')
const multer=require('koa-multer')
const path = require('path')
const {CategoryAdd,getCategory,UpdataCategorys,getCategoryId} = require('./controlder/category')
const {
    addRole,
    getRoles,
    updateRole,
    getRole
} = require('./controlder/role')

const {
    addUser,
    getUsers,
    updateUser,
    deleteUser
} = require('./controlder/user')


const app = new koa();
const Router = new router();

//引入用户模型
const Users = require('./schema/userSchema')

//文件上传
//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
      //获取图片的后缀名
      const extname = path.extname(file.originalname)
    cb(null,Date.now() + extname);
  }
})
//加载配置
var upload = multer({ storage: storage });

app.use(bodyparser())
app.use(static('./public'))
app.use(Router.routes())


//登录数据
Router.post('/Login',async cxt=>{
    //获取用户的账号和密码
    //根据用户名和密码查找  如果找到该用户 则登录成功 
    //否则 用户名或者密码不正确
    const {username,password} = cxt.request.body 
    const user =  await Users.findOne({username,password})
    cxt.body = '啦啦啦'

    if(user){
        cxt.body={
            status:0,
            data:user,
            msg:"恭喜你，登录成功"
        }
    }else{
        cxt.body = {
            status:1,
            msg:"登录失败，查无此号"
        }
    }
})


//分类数据
Router.post('/category/add',CategoryAdd)
Router.get('/category/list',getCategory)
Router.post('/category/updata',UpdataCategorys)
Router.get('/category/Info',getCategoryId)


//接受图片
Router.post('/img/uploads',upload.single('image'),imgUpload)
Router.post('/img/delete',deleteImg)
//商品的信息处理
Router.post('/product/add',addProduct)
Router.get('/product/list',getProduct)
Router.get('/product/Search',SearchProduct)
Router.post('/product/uptate',UptateProduct)

//角色的路由处理
Router.post('/role/add', addRole)
Router.get('/role/list', getRoles)
Router.post('/role/update', updateRole)
Router.get('/role/info', getRole)

//用户的路由处理
Router.post('/user/add', addUser)
Router.get('/user/list', getUsers)
Router.post('/user/update', updateUser)
Router.post('/user/delete', deleteUser)


//处理前台路由
app.use(cxt=>{
    //设置响应头
    cxt.set('Content-Type','text/html;charset=UTF-8')
    const data=fs.readFileSync(__dirname+'/public/index.html')
    cxt.body=data
})

























//链接27018下的project数据库
mongoose.connect('mongodb://localhost:27018/project',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("数据库链接成功")
    app.listen(4000,()=>{
        console.log("4000端口已启动")
      })
}).catch(()=>{
    console.log("数据库链接失败")
})



