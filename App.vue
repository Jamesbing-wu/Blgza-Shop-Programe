<script>
	import utils from './utils/util.js'
	import apis from './utils/api.js'

	export default {

		onLaunch: function() {
			// this.autoLogin()
			// this.getMainData()
		},
		onShow: function() {
			// this.getMainData()
		},
		onHide: function() {

		},
		methods: {
			// utils export function
			httpRequest(opts) {
				return utils.httpRequest(opts)
			},
			apis() {
				return apis
			},

			// 获取已登录的用户业务信息
			getAuthData() {
				this.getAddress()
				this.getHistory()
				this.getLike()
				this.listOrder()
			},


			// 获取地址信息
			getAddress() {
				let getAddress = {
					url: this.apis().getAddress,
					token: this.globalData.token,
					method: 'GET',
					body: {
						default: 'all'
					}
				}
				this.httpRequest(getAddress).then(res => {
					let data = JSON.parse(res.data).data
					if (data.length > 0) {
						uni.setStorageSync('UserAddress', data)
						let flag = false
						for (let item of data) {
							if (item.is_default == 1) {
								uni.setStorageSync('defaultAddress', item)
								flag = true
								break
							}
						}
						if (!flag) {
							uni.setStorageSync('defaultAddress', data[0])
						}
					} else {
						uni.setStorageSync('defaultAddress', {})
					}
				})

				this.globalData.hooks.address = false
			},


			// 获取收藏信息
			getLike() {
				let getLike = {
					url: this.apis().getLike,
					token: this.globalData.token,
					method: "GET",
				}
				this.httpRequest(getLike).then(res => {
					uni.setStorageSync('myLike', JSON.parse(res.data).data)
					console.log('mylike:',JSON.parse(res.data).data)
				})
								
				this.globalData.hooks.collection = false
			},


			// 获取历史浏览记录
			getHistory() {
				let getHistory = {
					url: this.apis().getHistory,
					token: this.globalData.token,
					method: 'GET'
				}
				this.httpRequest(getHistory).then(res => {
					uni.setStorageSync('myHistory', JSON.parse(res.data).data)
				})
				this.globalData.hooks.history = false
			},

			// 获取订单列表详情
			listOrder() {
				let listOrder = {
					url: this.apis().listOrder,
					token: this.globalData.token,
					method: 'GET',
				}
				this.httpRequest(listOrder).then(res => {
					uni.setStorageSync('listOrder', JSON.parse(res.data).data)
				})
				this.globalData.hooks.order = false
			},




			// action function
			autoLogin() {
				let app = this
				// #ifdef MP-WEIXIN
				uni.login({
					success(res) {
						let code = res.code
						uni.request({
							url: apis.wechatLogin,
							method: "POST",
							data: {
								code
							},
							success(res) {
								console.log('autoLogin:', res)
								if (res.data.code == 400) {
									let regInfo = {
										openid: res.data.msg.openid,
										session_key: res.data.msg.session_key
									}
									app.globalData.haslogin = false
									uni.setStorageSync("regInfo", regInfo);
								} else if (res.data.code == 200) {
									app.globalData.haslogin = true
									app.globalData = Object.assign(app.globalData, res.data.data)
									console.log('globaldata:', app.globalData)
									app.getAuthData()
									uni.showToast({
										duration: 1000,
										title: '登录成功',
										icon: 'success'
									})
								} else {
									console.log("自动登录模块出错")
								}
							}
						})
					}
				})
				// #endif
			},


			getMainData() {
				// let bannerTop = {
				// 	url: this.apis().bannerTop,
				// 	method: 'GET',
				// }
				// this.httpRequest(bannerTop).then(res => {
				// 	uni.setStorageSync('bannerTop', JSON.parse(res.data).data)
				// })

				let recommendCatalog = {
					url: this.apis().recommendCatalog,
					method: 'GET',
				}
				this.httpRequest(recommendCatalog).then(res => {
					uni.setStorageSync('recommendCatalog', JSON.parse(res.data).data)
				})

				let goodList = {
					url: this.apis().goodList,
					method: 'GET',
				}
				this.httpRequest(goodList).then(res => {
					uni.setStorageSync('goodList', JSON.parse(res.data).data)
				})

				let bannerCatalog = {
					url: this.apis().bannerCatalog,
					method: 'GET',
				}
				this.httpRequest(bannerCatalog).then(res => {
					uni.setStorageSync('bannerCatalog', JSON.parse(res.data).data)
				})

				let hotWord = {
					url: this.apis().hotWord,
					method: 'GET',
				}
				this.httpRequest(hotWord).then(res => {
					uni.setStorageSync('hotWord', JSON.parse(res.data).data)
				})

				let hotNewShop = {
					url: this.apis().hotNewShop,
					method: 'GET',
				}
				this.httpRequest(hotNewShop).then(res => {
					uni.setStorageSync('hotNewShop', JSON.parse(res.data).data)
				})
			}
		},

		globalData: {
			firstLaunch: true,
			nickname: "未登录",
			token: '',
			debug: false,
			mid: 1,	
			// 触发请求的狗子
			hooks: {
				collection: false,
				address:false,
				order:false,
				history:false
			},
			// 巴郎子新增
			userInfo:null,
			code:null,
			openid:null,
			phone:null,
			sessionKey:null,
			signin:0,
			haslogin:false
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
