const baseUrl = "https://www.blgza.com/formal"; 
// const baseUrl = "http://shop.sidcloud.cn:30080/api";
const apis = {
	// shop
	
	// recommendCatalog:baseUrl+"/shop/recommendCatalog",	//首页分类
	// goodList:baseUrl+"/shop/goodList",	//首页推荐商品
	// bannerCatalog:baseUrl+'/shop/bannerCatalog',	//分类页banner
	// hotWord:baseUrl+'/shop/hotWord', 	//热搜关键字
	// hotNewShop:baseUrl+'/shop/hotNewShop',	//新品推荐
	// catalogFind:baseUrl+'/shop/catalogFind?cid=0',	//子类页面的分类获取
	// goodFind:baseUrl+'/shop/goodFind',	//商品搜索结果
	// noGoodDetails :baseUrl+'/shop/goodDetails', //无token商品详情页
	swiperBanner:baseUrl+'/get_banner.php',  //首页头部轮播图片
	exhImage:baseUrl+'/get_exh.php',   //首页原创产品和文创产品
	brandLoso:baseUrl+'/get_brand.php',  //首页品牌产品logo
	
	
	// auth
	unCheckReg:baseUrl+"/auth/unCheckReg",	
	unCheckLogin:baseUrl+"/auth/unCheckLogin",
	
	// user
	userInfo:baseUrl+"/consumer/user/info", //用户信息获取
	getAddress:baseUrl+"/consumer/getAddress", // 获取用户地址
	tokenGoodDetails:baseUrl+'/consumer/goodDetails',  //有token地址,商品详情页
	getCart:baseUrl+'/consumer/getCart',	//获取购物车
	addCart:baseUrl+'/consumer/addCart', //添加到购物车
	killCart:baseUrl+'/consumer/killCart', //删除购物车商品
	listOrder:baseUrl+'/consumer/listOrder', //获取订单列表
	getHistory:baseUrl+'/consumer/getHistory', //获取浏览历史
	getLike:baseUrl+'/consumer/getLike', //获取收藏夹
	editAddress:baseUrl+'/consumer/editAddress', //修改地址信息
	addAddress:baseUrl+'/consumer/addAddress', //新增地址信息
	addLike:baseUrl+'/consumer/addLike', //新增商品到收藏夹
	killLike:baseUrl+'/consumer/killLike', //取消商品收藏
	listOrder:baseUrl+'/consumer/listOrder', //获取订单列表数据
	getOrder:baseUrl+'/consumer/getOrder', //获取订单详情数据
	newOrder:baseUrl+'/consumer/newOrder', //提交订单
	
	// wechat
	wechatInfo:baseUrl+"/wechat/info",
	wechatLogin:baseUrl+"/login.php"   //微信登录请求
};

export default apis