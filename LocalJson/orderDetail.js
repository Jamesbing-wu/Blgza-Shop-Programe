let orderDetail = {

	"fee": 199,
	"orderSn": "lr0yseosEPzkeTTH",
	"status": 0,
	"address": {
		"name": "后端狗贼",
		"phone": 10010,
		"place": "福建省福州市",
		"setting": "后端镇后端窝点"
	},
	"express": {
		"eid": "9136257866",
		"company": "京东豪华快送",
		"expReach": "5月1日",
		"extends": [{
				"status": "已签收",
				"detail": "您的快递已由本人签收。感谢您在商场购物，欢迎再次光临",
				"time": "2019-05-01 18:48:26"
			}, {
				"status": "派送中",
				"detail": "您的订单正在配送途中（快递员：echo.，电话：13822448855，请您耐心等待。",
				"time": "2019-05-01 16:29:07"
			}, {
				"status": "运输中",
				"detail": [{
						"subDetail": "您的订单已到达XX【北京XX营业部】",
						"subtime": "2019-05-01 16:17:32"
					},
					{
						"subDetail": "您的订单已在XX【北京XX营业部】收货完成",
						"subtime": "2019-05-01 08:40:32"
					},
					{
						"subDetail": "您的订单由XXXX送往XX【北京XX营业部】",
						"subtime": "2019-05-01 08:17:32"
					}
				]
			}, {
				"status": "仓库处理中",
				"detail": "打包完成",
				"time": "2019-05-01 08:09:16"
			},
			{
				"status": "已下单",
				"detail": "您的订单将下传XXX仓库，准备出库",
				"time": "2019-05-01 02:09:16"
			},
			{
				"status": "温馨提示",
				"detail": "您的订单正在配送途中（快递员：echo.，电话：13822448855，请您耐心等待。",
				"time": "2019-05-01 16:29:07"
			}
		]
	},
	"extend": [{
			"tid": 1,
			"good": {
				"fname": "商品1",
				"name": "规格1",
				"fee": 168,
				"icon": "https://jsp.sidcloud.cn/source/images/mall/product/6.jpg",
				"fid": 1,
				"id": 1,
				"num": 3
			}
		},
		{
			"tid": 2,
			"good": {
				"fname": "商品2",
				"name": "规格1",
				"fee": 168,
				"icon": "https://jsp.sidcloud.cn/source/images/mall/product/6.jpg",
				"fid": 2,
				"id": 2,
				"num": 3
			}
		}
	],
	// 新字段
	"totalPrice": 2333,
	"discount": 233,
	"expFee": 23,
	"finalFee": 2000,
	"realPay": 1998.9,
	"create": "2020-2-2 15:33",
	"payTime": "2020-2-2 15:44",
	"delieve": "2020-2-2 16:33",
	"way": "包邮",
	"detail": "尽快发货啊啊啊啊啊啊啊cnm"
}
module.exports = {
  orderDetail: orderDetail
}
