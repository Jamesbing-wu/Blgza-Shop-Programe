<template>
	<view class="container">
		<!--选项卡逻辑自己实现即可，此处未做处理-->
		<tui-tabs :tabs="tabs" :isFixed="scrollTop>=0" :currentTab="currentTab" selectedColor="#E41F19" sliderBgColor="#E41F19"
		 @change="change" itemWidth="20%"></tui-tabs>


		<!-- 全部 -->
		<view :class="{'tui-order-list':scrollTop>=0}" v-if="currentTab==0" >
			<view class="tui-order-item" v-for="(item,index) in orderSet.all" @click="detail(item.id)">
				<tui-list-cell :hover="true" :lineLeft="false">
					<view class="tui-goods-title">
						<view style="color:#555555 ">订单号：{{item.orderSn}}</view>
						<view class="tui-order-status">{{showStatus(item.status)}}</view>
					</view>
				</tui-list-cell>
				<block v-for="(citem,cindex) in item.extend">
					<tui-list-cell padding="0" >
						<view class="tui-goods-item">
							<image :src="citem.good.icon" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{citem.good.fname}}</view>
								<view class="tui-goods-attr">{{citem.good.name}}</view>
							</view>
							<view class="tui-price-right">
								<view>￥{{fixPrice(citem.good.fee)}}</view>
								<view>x{{citem.good.num}}</view>
							</view>
						</view>
					</tui-list-cell>
				</block>
			</view>
		</view>

		<!-- 待付款 -->

		<view :class="{'tui-order-list':scrollTop>=0}" v-if="currentTab==1">
			<view class="tui-order-item" v-for="(item,index) in orderSet.pay" @click="detail(item.id)">
				<tui-list-cell :hover="true" :lineLeft="false">
					<view class="tui-goods-title">
						<view style="color:#555555 ">订单号：{{item.orderSn}}</view>
						<view class="tui-order-status">{{showStatus(item.status)}}</view>
					</view>
				</tui-list-cell>
				<block v-for="(citem,cindex) in item.extend">
					<tui-list-cell padding="0">
						<view class="tui-goods-item">
							<image :src="citem.good.icon" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{citem.good.fname}}</view>
								<view class="tui-goods-attr">{{citem.good.name}}</view>
							</view>
							<view class="tui-price-right">
								<view>￥{{fixPrice(citem.good.fee)}}</view>
								<view>x{{citem.good.num}}</view>
							</view>
						</view>
					</tui-list-cell>
				</block>
			</view>
		</view>
		<!-- 待收货 -->

		<view :class="{'tui-order-list':scrollTop>=0}" v-if="currentTab==2">
			<view class="tui-order-item" v-for="(item,index) in orderSet.receive" @click="detail(item.id)">
				<tui-list-cell :hover="true" :lineLeft="false">
					<view class="tui-goods-title">
						<view style="color:#555555 ">订单号：{{item.orderSn}}</view>
						<view class="tui-order-status">{{showStatus(item.status)}}</view>
					</view>
				</tui-list-cell>
				<block v-for="(citem,cindex) in item.extend">
					<tui-list-cell padding="0">
						<view class="tui-goods-item">
							<image :src="citem.good.icon" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{citem.good.fname}}</view>
								<view class="tui-goods-attr">{{citem.good.name}}</view>
							</view>
							<view class="tui-price-right">
								<view>￥{{fixPrice(citem.good.fee)}}</view>
								<view>x{{citem.good.num}}</view>
							</view>
						</view>
					</tui-list-cell>
				</block>
			</view>
		</view>

		<!-- 待评价 -->


		<view :class="{'tui-order-list':scrollTop>=0}" v-if="currentTab==3">
			<view class="tui-order-item" v-for="(item,index) in orderSet.commit" @click="detail(item.id)">
				<tui-list-cell :hover="true" :lineLeft="false">
					<view class="tui-goods-title">
						<view style="color:#555555 ">订单号：{{item.orderSn}}</view>
						<view class="tui-order-status">{{showStatus(item.status)}}</view>
					</view>
				</tui-list-cell>
				<block v-for="(citem,cindex) in item.extend">
					<tui-list-cell padding="0">
						<view class="tui-goods-item">
							<image :src="citem.good.icon" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{citem.good.fname}}</view>
								<view class="tui-goods-attr">{{citem.good.name}}</view>
							</view>
							<view class="tui-price-right">
								<view>￥{{fixPrice(citem.good.fee)}}</view>
								<view>x{{citem.good.num}}</view>
							</view>
						</view>
					</tui-list-cell>
				</block>
			</view>
		</view>

		<!-- 已完成 -->



		<view :class="{'tui-order-list':scrollTop>=0}" v-if="currentTab==4">
			<view class="tui-order-item" v-for="(item,index) in orderSet.done" @click="detail(item.id)">
				<tui-list-cell :hover="true" :lineLeft="false">
					<view class="tui-goods-title">
						<view style="color:#555555 ">订单号：{{item.orderSn}}</view>
						<view class="tui-order-status">{{showStatus(item.status)}}</view>
					</view>
				</tui-list-cell>
				<block v-for="(citem,cindex) in item.extend">
					<tui-list-cell padding="0">
						<view class="tui-goods-item">
							<image :src="citem.good.icon" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{citem.good.fname}}</view>
								<view class="tui-goods-attr">{{citem.good.name}}</view>
							</view>
							<view class="tui-price-right">
								<view>￥{{fixPrice(citem.good.fee)}}</view>
								<view>x{{citem.good.num}}</view>
							</view>
						</view>
					</tui-list-cell>
				</block>
			</view>
		</view>

		<!-- 售后 -->

		<view :class="{'tui-order-list':scrollTop>=0}" v-if="currentTab==5">
			<view class="tui-order-item" v-for="(item,index) in orderSet.feedback" @click="detail(item.id)">
				<tui-list-cell :hover="true" :lineLeft="false">
					<view class="tui-goods-title">
						<view style="color:#555555 ">订单号：{{item.orderSn}}</view>
						<view class="tui-order-status">{{showStatus(item.status)}}</view>
					</view>
				</tui-list-cell>
				<block v-for="(citem,cindex) in item.extend">
					<tui-list-cell padding="0">
						<view class="tui-goods-item">
							<image :src="citem.good.icon" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{citem.good.fname}}</view>
								<view class="tui-goods-attr">{{citem.good.name}}</view>
							</view>
							<view class="tui-price-right">
								<view>￥{{fixPrice(citem.good.fee)}}</view>
								<view>x{{citem.good.num}}</view>
							</view>
						</view>
					</tui-list-cell>
				</block>
			</view>
		</view>
		<!-- lab end -->

		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn" backgroundColor="#fafafa"></tui-nomore>
		<!--加载loadding-->

	</view>
</template>

<script>
	let app = getApp()
	export default {
		data() {
			return {
				tabs: [{
					name: "全部"
				}, {
					name: "待付款"
				}, {
					name: "待收货"
				}, {
					name: "待评价"
				}, {
					name: "已完成"
				}, {
					name: "售后"
				}],
				currentTab: 0, // 0-4
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				scrollTop: 0,
				orderSet: {} // 订单集合
			}
		},
		onLoad(Option){
			this.currentTab = Option.tab
		},
		onShow() {
			this.classifier()
		},
		computed: {
			showStatus() {
				return (num) => {
					let show = ''
					switch (num) {
						case 0:
							show = '待付款'
							break
						case 1:
							show = '待发货'
							break
						case 2:
							show = '待收货'
							break
						case 3:
							show = '待评价'
							break
						case 4:
							show = '已完成'
							break
						case 5:
							show = '售后处理中'
							break
						case 6:
							show = '退款成功'
							break
						default:
							show = '订单出错'
							break
					}
					return show
				}

			},
			fixPrice() {
				return (price) => {
					return price.toFixed(2).toString().split(".")[0] + "." + price.toFixed(2).toString().split(".")[1]
				}
			},
			firstPrice() {
				return (price) => {
					return price.toFixed(2).toString().split(".")[0]
				}
			},
			lastPrice() {
				return (price) => {
					return price.toFixed(2).toString().split(".")[1]
				}
			}
		},

		methods: {
			classifier() {
				let listOrder = uni.getStorageSync('listOrder')
				let orderSet = {
					all: [],
					pay: [],
					receive: [],
					commit: [],
					done: [],
					feedback: []
				}
				orderSet.all = listOrder
				for (let item of listOrder) {
					switch (item.status) {
						case 0:
							orderSet.pay.push(item)
							break
						case 1:
						case 2:
							orderSet.receive.push(item)
							break
						case 3:
							orderSet.commit.push(item)
							break
						case 4:
						case 6:
							orderSet.done.push(item)
							break
						case 5:
							orderSet.feedback.push(item)
							break
						default:
							break
					}
				}
				console.log(orderSet)
				this.orderSet = orderSet
			},


			// getOrderList() {
			// 	let opts = {
			// 		url: app.apis().listOrder,
			// 		method: 'GET',
			// 		token: app.globalData.token,
			// 	}
			// 	app.httpRequest(opts).then(res => {
			// 		let rowdata = JSON.parse(res.data).data
			// 		for (let item of rowdata) {
			// 			switch (item.status) {
			// 				case 0:
			// 					item.showStatus = '待付款';
			// 					break
			// 				case 1:
			// 					item.showStatus = '待';
			// 					break
			// 				case 2:
			// 			}
			// 			item.showStatus()
			// 		}
			// 		this.orderList = JSON.parse(res.data).data
			// 	})
			// },

			change(e) {
				this.currentTab = e.index
			},
			detail(oid) {
				// console.log(oid)
				uni.navigateTo({
					url: '../orderDetail/orderDetail?oid='+oid
				})
			}
		},


		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200);
		},
		onReachBottom() {
			//只是测试效果，逻辑以实际数据为准
			this.loadding = true
			this.pullUpOn = true
			setTimeout(() => {
				this.loadding = false
				this.pullUpOn = false
			}, 1000)
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-order-list {
		margin-top: 80rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-order-status {
		color: #888;
		font-size: 26rpx;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}

	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
		font-weight: 500;
	}

	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 10rpx 30rpx 20rpx;
		box-sizing: border-box;
	}

	.tui-btn-ml {
		margin-left: 20rpx;
	}
</style>
