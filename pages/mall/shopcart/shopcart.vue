<template>
	<view class="container">
		<!-- #ifdef MP || H5-->
		<view class="tui-edit-goods">
			<view>购物车共<text class="tui-goods-num">{{shopcartList.length}}</text>件商品</view>
			<view>
				<tui-button width="160rpx" height="60rpx" :size="24" :plain="true" shape="circle" type="gray" @click="editGoods">{{isEdit?"返回":"编辑商品"}}</tui-button>
			</view>
		</view>
		<!-- #endif -->

		<!-- 展示状态 -->
		<checkbox-group v-if="!isEdit">
			<view class="tui-cart-cell  tui-mtop" v-for="(item,index) in shopcartList" :key="index">
				<!-- 框标题栏 -->
				<!--<view class="tui-activity">
					<view class="tui-bold">满3件享受优惠</view>
					<view class="tui-buy">去凑单
						<tui-icon name="arrowright" :size="18" color="#333"></tui-icon>
					</view>
				</view> -->
				<!-- 商品单框body -->
				<tui-swipe-action>
					<template v-slot:content>
						<view class="tui-goods-item">
							<label class="tui-checkbox" @tap="selected(index)">
								<checkbox :value="item.id" :checked="item.selected" color="#fff"></checkbox>
							</label>
							<image :src="item.type.icon" class="tui-goods-img" />
							<view class="tui-goods-info">
								<view class="tui-goods-title">
									{{item.good.name}}
								</view>
								<view class="tui-goods-model">
									<view class="tui-model-text">类型：{{item.type.name}}</view>
									<!-- <tui-icon name="arrowdown" :size="16" color="#333"></tui-icon> -->
								</view>
								<view class="tui-price-box">
									<view class="tui-goods-price">￥{{item.type.fee.toFixed(2).toString().split(".")[0]}}.{{item.type.fee.toFixed(2).toString().split(".")[1]}}</view>
									<tui-numberbox :value="item.num" :height="36" :width="64" :min="1" :index="index" @change="changeNum"></tui-numberbox>
								</view>
							</view>
						</view>
					</template>
				</tui-swipe-action>
				<!-- <view class="tui-sub-info" v-if="index%2==0">赠品：柔色尽情丝柔口红唇膏1支柔色尽情丝柔口红唇膏1支</view> -->
			</view>
		</checkbox-group>

		<!-- 编辑状态，别问为什么走选择渲染，问就是js协同渲染逻辑太f**k了 -->
		<checkbox-group v-else>
			<view class="tui-cart-cell  tui-mtop" v-for="(item,index) in shopcartList" :key="index">
				<!-- 框标题栏 -->
				<!--<view class="tui-activity">
					<view class="tui-bold">满3件享受优惠</view>
					<view class="tui-buy">去凑单
						<tui-icon name="arrowright" :size="18" color="#333"></tui-icon>
					</view>
				</view> -->
				<!-- 商品单框body -->
				<tui-swipe-action>
					<template v-slot:content>
						<view class="tui-goods-item">
							<label class="tui-checkbox" @tap="selected(index)">
								<checkbox :value="item.id" :checked="item.isDelete" color="#fff"></checkbox>
							</label>
							<image :src="item.type.icon" class="tui-goods-img" />
							<view class="tui-goods-info">
								<view class="tui-goods-title">
									{{item.good.name}}
								</view>
								<view class="tui-goods-model">
									<view class="tui-model-text">类型：{{item.type.name}}</view>
									<!-- <tui-icon name="arrowdown" :size="16" color="#333"></tui-icon> -->
								</view>
								<view class="tui-price-box">
									<view class="tui-goods-price">￥{{item.type.fee.toFixed(2).toString().split(".")[0]}}.{{item.type.fee.toFixed(2).toString().split(".")[1]}}</view>
									<tui-numberbox :value="item.num" :height="36" :width="64" :min="1" :index="index" @change="changeNum"></tui-numberbox>
								</view>
							</view>
						</view>
					</template>
				</tui-swipe-action>
				<!-- <view class="tui-sub-info" v-if="index%2==0">赠品：柔色尽情丝柔口红唇膏1支柔色尽情丝柔口红唇膏1支</view> -->
			</view>
		</checkbox-group>


		<!--商品失效-->
		<!-- 		<view class="tui-cart-cell  tui-mtop">
			<view class="tui-activity">
				<view class="tui-bold">失效商品</view>
				<view class="tui-buy">
					<tui-button type="gray" :plain="true" shape="circle" width="200rpx" height="56rpx" :size="24">清空失效商品</tui-button>
				</view>
			</view>
			<view :class="{'tui-invalid-ptop':index!==0}" v-for="(item,index) in 2" :key="index">
				<tui-swipe-action :actions="actions2">
					<template v-slot:content>
						<view class="tui-goods-item">
							<view class="tui-checkbox tui-invalid-pr">
								<view class="tui-invalid-text">失效</view>
							</view>
							<image src="/static/images/mall/product/4.jpg" class="tui-goods-img opcity" />
							<view class="tui-goods-info">
								<view class="tui-goods-title tui-gray">
									欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜彩粉嫩透亮修颜霜透亮修颜霜透亮修颜霜
								</view>
								<view class="tui-price-box tui-flex-center">
									<view class="tui-goods-invalid">产品失效</view>
									<view class="tui-btn-alike">
										<tui-button type="white" :plain="true" shape="circle" width="120rpx" height="48rpx" :size="24">找相似</tui-button>
									</view>
								</view>
							</view>
						</view>
					</template>
				</tui-swipe-action>
			</view>
		</view> -->

		<!--猜你喜欢-->

		<tui-divider :size="28" :bold="true" color="#333" width="50%">
			<tui-icon name="like" :size="18" color="#e41f19"></tui-icon>
			<text class="tui-youlike">猜你喜欢</text>
		</tui-divider>
		<view class="tui-product-list">
			<view class="tui-product-container">
				<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2!=0">
					<!--商品列表-->
					<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item.gid)">
						<image :src="item.img" class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit">{{item.name}}</view>
							<view>
								<view class="tui-pro-price">
									<text class="tui-sale-price">￥{{item.sale}}</text>
									<text class="tui-factory-price">￥{{item.factory}}</text>
								</view>
								<view class="tui-pro-pay">{{item.payNum}}人付款</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
					<!-- <template is="productItem" data="{{item,index:index}}" /> -->
				</block>
			</view>
			<view class="tui-product-container">
				<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2==0">
					<!--商品列表-->
					<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item.gid)">
						<image :src="item.img" class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit">{{item.name}}</view>
							<view>
								<view class="tui-pro-price">
									<text class="tui-sale-price">￥{{item.sale}}</text>
									<text class="tui-factory-price">￥{{item.factory}}</text>
								</view>
								<view class="tui-pro-pay">{{item.payNum}}人付款</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>

		<!--tabbar-->
		<view class="tui-tabbar" v-if="shopcartList.length>0">
			<view class="tui-checkAll">
				<checkbox-group @change="checkAll">
					<label class="tui-checkbox">
						<checkbox :checked="isAll" color="#fff"></checkbox>
						<text class="tui-checkbox-pl">全选</text>
					</label>
				</checkbox-group>
				<view class="tui-total-price" v-if="!isEdit">合计:<text class="tui-bold">￥{{totalPrice | getPrice}}</text> </view>
			</view>
			<view>
				<tui-button width="200rpx" :disabled="buyNum==0 " height="70rpx" :size="30" type="danger" shape="circle" v-if="!isEdit"
				 @click="btnPay">去结算({{buyNum}})</tui-button>
				<tui-button width="200rpx" height="70rpx" :size="30" type="danger" shape="circle" :plain="true" @tap="deleteGood"
				 v-else>删除</tui-button>
			</view>
		</view>

		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
	</view>
</template>

<script>
	let app = getApp()
	export default {
		data() {
			return {
				shopcartList: [],
				dataList: [{
						id: "t2020003120",
						buyNum: 2,
						price: 299.5,
						selected: false
					},
					{
						id: 't1020003120',
						buyNum: 1,
						price: 499,
						selected: false
					}
				],
				isAll: false,
				totalPrice: 0,
				buyNum: 0,
				// cartIds: [], //购物车id
				actions: [{
						name: '收藏',
						width: 64,
						color: '#fff',
						fontsize: 28,
						background: '#FFC600'
					},
					{
						name: '看相似',
						color: '#fff',
						fontsize: 28,
						width: 64,
						background: '#FF7035'
					},
					{
						name: '删除',
						color: '#fff',
						fontsize: 28,
						width: 64,
						background: '#F82400'
					}
				],
				actions2: [{
						name: '看相似',
						color: '#fff',
						fontsize: 28,
						width: 64,
						background: '#FF7035'
					},
					{
						name: '删除',
						color: '#fff',
						fontsize: 28,
						width: 64,
						background: '#F82400'
					}
				],
				isEdit: false,
				productList: [],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				selectedList: [],
			}
		},
		filters: {
			getPrice(price) {
				price = price || 0;
				return price.toFixed(2)
			}
		},
		onLoad() {
			this.showGood()
		},
		onShow() {
			this.getshopCart()
		},

		methods: {
			typenumber() {
				let cnt = 0
				let del = 0
				for (let item of this.shopcartList) {
					if (item.selected) {
						cnt++
					}
					if (item.isDelete) {
						del++
					}
				}
				this.buyNum = cnt
				this.deleteNum = del
				this.getSelectedGood()
			},

			deleteGood() {
				this.typenumber()
				let self = this
				uni.showModal({
					title: "提示",
					content: '确定要删除' + this.deleteNum + "个商品吗？",
					success(res) {
						if (res.confirm) {
							for (let i = 0; i < self.shopcartList.length; i++) {
								if (self.shopcartList[i].isDelete) {
									let opts = {
										url: app.apis().killCart,
										method: "POST",
										data: {
											cartid: self.shopcartList[i].id,
										},
										token: app.globalData.token
									}
									app.httpRequest(opts).then(res => {
										if (JSON.parse(res.data).code == 200) {
											self.getshopCart()
											uni.showToast({
												title: '操作成功~',
												duration: 900,
												icon: 'success'
											})
										} else {
											uni.showToast({
												title: '网络繁忙',
												duration: 900,
												icon: 'loading'
											})
										}
									})
								}
							}
						}
					}
				})
			},

			getshopCart() {
				let opts = {
					url: app.apis().getCart,
					token: app.globalData.token,
					methods: 'GET'
				}
				app.httpRequest(opts).then(res => {
					this.shopcartList = JSON.parse(res.data).data
					for (let i = 0; i < this.shopcartList.length; i++) {
						this.shopcartList[i].selected = false;
						this.shopcartList[i].isDelete = false;
					}
					this.countPrice()
					console.log('shopcart:', JSON.parse(res.data).data)
				})
			},
			showGood() {
				let goodObj = uni.getStorageSync("goodList").data
				let goodList = new Array()
				for (let item of goodObj) {
					let tempobj = {
						gid: item.id,
						img: item.icon,
						name: item.name,
						sale: item.fee,
						factory: item.oldfee,
						payNum: item.paynum
					}
					goodList.push(tempobj)
				}
				this.productList = goodList
			},

			selected(index) {
				if (this.isEdit) {
					this.shopcartList[index].isDelete = !this.shopcartList[index].isDelete
					console.log(this.shopcartList[index].isDelete)
				} else {
					this.shopcartList[index].selected = !this.shopcartList[index].selected
					this.countPrice()
				}

			},

			calcHandle() {
				// let buyNum = 0;
				// let totalPrice = 0;
				// let selectedNum = 0;
				// this.dataList.map((item) => {
				// 	if (item.selected) {
				// 		buyNum += item.buyNum;
				// 		totalPrice += item.price * item.buyNum;
				// 		selectedNum++
				// 	}
				// })
				// this.isAll = selectedNum === this.dataList.length
				// this.buyNum = buyNum
				// this.totalPrice = totalPrice
			},
			changeNum: function(e) {
				this.shopcartList[e.index].num = e.value
				this.countPrice()
				setTimeout(() => {
					this.calcHandle()
				}, 0)
			},
			// handlerButton: function(e) {
			// 	// let index = e.index;
			// 	// let item = e.item;
			// 	// this.tui.toast(`商品id：${item.id}，按钮index：${index}`);
			// },
			editGoods: function() {
				// #ifdef H5 || MP
				if (this.isEdit) {
					// http
				} else {

				}
				this.isEdit = !this.isEdit;
				// #endif
			},
			detail: function(gid) {
				uni.navigateTo({
					url: '../productDetail/productDetail?gid='+gid
				})
			},
			btnPay() {
				uni.navigateTo({
					url: '../submitOrder/submitOrder'
				})
			},
			checkAll(e) {
				this.isAll = !this.isAll;
				if (this.isEdit) {
					if (this.isAll) {
						for (let item of this.shopcartList) {
							item.isDelete = true
						}
					} else {
						for (let item of this.shopcartList) {
							item.isDelete = false
						}
					}
					this.countPrice()
				} else {
					if (this.isAll) {
						for (let item of this.shopcartList) {
							item.selected = true
						}
					} else {
						for (let item of this.shopcartList) {
							item.selected = false
						}
					}
					this.countPrice()
				}

			},

			countPrice() {
				let total = 0
				for (let item of this.shopcartList) {
					if (item.selected) {
						total += item.num * item.type.fee
					}
				}
				this.totalPrice = total
				this.typenumber()
			},

			getSelectedGood() {
				this.selectedList = []
				for (let item of this.shopcartList) {
					if (item.selected) {
						this.selectedList.push(item)
					}
				}
				uni.setStorageSync('submitOrder',this.selectedList)
			}
		},


		// onPullDownRefresh() {
		// 	setTimeout(() => {
		// 		uni.stopPullDownRefresh()
		// 	}, 200)
		// 	console.log('fuc1')
		// },
		onPullDownRefresh: function() {
			this.getshopCart()
			
			let loadData = JSON.parse(JSON.stringify(this.productList));
			loadData = loadData.splice(0, 10)
			this.productList = loadData;
			this.pageIndex = 1;
			this.pullUpOn = true;
			this.loadding = false
			uni.stopPullDownRefresh()
		},
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.pageIndex == 4) {
				this.loadding = false;
				this.pullUpOn = false
			} else {
				let loadData = JSON.parse(JSON.stringify(this.productList));
				loadData = loadData.splice(0, 10)
				if (this.pageIndex == 1) {
					loadData = loadData.reverse();
				}
				this.productList = this.productList.concat(loadData);
				this.pageIndex = this.pageIndex + 1;
				this.loadding = false
			}
		},
		onNavigationBarButtonTap(e) {
			this.isEdit = !this.isEdit;
			let text = this.isEdit ? "完成" : "编辑";
			// #ifdef APP-PLUS
			let webView = this.$mp.page.$getAppWebview();
			webView.setTitleNViewButtonStyle(0, {
				text: text
			});
			// #endif
		}
	}
</script>

<style>
	.container {
		padding-bottom: 120rpx;
	}

	.tui-mtop {
		margin-top: 24rpx;
	}

	.tui-edit-goods {
		width: 100%;
		border-radius: 12rpx;
		overflow: hidden;
		padding: 24rpx 30rpx 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-size: 24rpx;
	}

	.tui-goods-num {
		font-weight: bold;
		color: #e41f19;
	}

	.tui-cart-cell {
		width: 100%;
		border-radius: 12rpx;
		background: #FFFFFF;
		padding: 40rpx 0;
		overflow: hidden;
	}

	.tui-goods-item {
		display: flex;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-checkbox {
		min-width: 70rpx;
		display: flex;
		align-items: center;
	}

	/* #ifdef MP-WEIXIN */
	.tui-checkbox .wx-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		margin-right: 0 !important;
		border-radius: 50% !important;
		transform: scale(0.8);
		border-color: #d1d1d1 !important;
	}

	.tui-checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #eb0909;
		width: 44rpx !important;
		height: 44rpx !important;
		border: none;
	}

	/* #endif */
	/* #ifndef MP-WEIXIN */

	>>>.tui-checkbox .uni-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		margin-right: 0 !important;
		border-radius: 50% !important;
		transform: scale(0.8);
		border-color: #d1d1d1 !important;
	}

	>>>.tui-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background: #eb0909;
		width: 45rpx !important;
		height: 45rpx !important;
		border: none;
	}

	/* #endif */
	.tui-goods-img {
		width: 220rpx;
		height: 220rpx !important;
		border-radius: 12rpx;
		flex-shrink: 0;
		display: block;
	}

	.tui-goods-info {
		width: 100%;
		padding-left: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-goods-title {
		white-space: normal;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 24rpx;
		color: #333;
	}

	.tui-goods-model {
		max-width: 100%;
		color: #333;
		background: #F5F5F5;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.tui-model-text {
		max-width: 100%;
		transform: scale(0.9);
		transform-origin: 0 center;
		font-size: 24rpx;
		line-height: 32rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-price-box {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.tui-goods-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-scale {
		transform: scale(0.8);
		transform-origin: 100% 100%;
	}

	.tui-activity {
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx 20rpx 100rpx;
		box-sizing: border-box;
	}

	.tui-buy {
		display: flex;
		align-items: center
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-sub-info {
		max-width: 532rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		padding: 20rpx 30rpx 10rpx 30rpx;
		box-sizing: border-box;
		color: #333;
		transform: scale(0.8);
		transform-origin: 100% center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: auto
	}

	.tui-invalid-text {
		width: 66rpx;
		margin-right: 4rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		background: rgba(0, 0, 0, .3);
		transform: scale(0.8);
		transform-origin: center center;
		border-radius: 4rpx;
		flex-shrink: 0;
	}

	.tui-gray {
		color: #B2B2B2 !important;
	}

	.tui-goods-invalid {
		color: #555;
		font-size: 24rpx;
	}

	.tui-flex-center {
		align-items: center !important;
	}

	.tui-invalid-ptop {
		padding-top: 40rpx;
	}

	/* #ifdef H5 */
	.tui-tabbar {
		/* border: #000000 3rpx solid; */
		width: 100%;
		height: 100rpx;
		background: #fff;
		position: fixed;
		left: 0;
		/* bottom: 80px; */
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30px 30px;
		box-sizing: border-box;
		font-size: 24px;
		z-index: 99999;
		margin-bottom: 100rpx;
	}

	/* #endif */
	/* #ifdef MP */
	.tui-tabbar {
		width: 100%;
		height: 100rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		z-index: 99999;
	}

	/* #endif */
	.tui-tabbar {
		width: 100%;
		height: 100rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		z-index: 99999;
	}

	.tui-tabbar::before {
		content: '';
		width: 100%;
		border-top: 1rpx solid #d9d9d9;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-checkAll {
		display: flex;
		align-items: center;
	}

	.tui-checkbox-pl {
		padding-left: 12rpx;
	}

	.tui-total-price {
		padding-left: 30rpx;
		font-size: 30rpx !important;
	}

	/*猜你喜欢*/
	.tui-youlike {
		padding-left: 12rpx
	}

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		padding-top: 18rpx;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
</style>
