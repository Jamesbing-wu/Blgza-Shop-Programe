<template>
	<view>
		<!--header-->
		<tui-navigation-bar splitLine @init="initNavigation" @change="opacityChange" :scrollTop="scrollTop" title="我的"
		 backgroundColor="#fff" color="#333">
			<view class="tui-header-box" :style="{marginTop:top+'px'}">
				<!--个人中心页为主页面，不应有返回键-->
				<!-- #ifndef MP -->
				<view class="tui-header-icon">
					<view class="tui-icon-box tui-icon-message" @tap="href(7)">
						<tui-icon name="message" color="#333" :size="26"></tui-icon>
						<view class="tui-badge tui-badge-red">1</view>
					</view>
					<view class="tui-icon-box tui-icon-setup" @tap="href(2)">
						<tui-icon name="setup" color="#333" :size="26"></tui-icon>
					</view>
				</view>
				<!-- #endif -->
			</view>

		</tui-navigation-bar>
		<!--header-->
		<view class="tui-mybg-box">
			<!-- 背景页 -->
			<image :src="webURL+'/static/images/mall/my/img_bg_3x.png'" class="tui-my-bg" mode="widthFix"></image>
			<!-- 头像 -->
			<view class="tui-header-center">
				<image src="/static/images/my/mine_def_touxiang_3x.png" class="tui-avatar" @tap="login" v-if="!userinfo.haslogin"></image>
				<image :src="userinfo.avatarUrl" class="tui-avatar" @tap="href(3)" v-else></image>

				<view class="tui-info" v-if="!userinfo.haslogin" @tap="login">
					<view class="tui-nickname">未登录
						<!-- <image src="/static/images/mall/my/icon_vip_3x.png" class="tui-img-vip"></image> -->
					</view>
					<view class="tui-explain">Welcome ~</view>
				</view>

				<view class="tui-info" v-else>
					<view class="tui-nickname">{{userinfo.nickName}}
						<image src="/static/images/mall/my/icon_vip_3x.png" class="tui-img-vip"></image>
					</view>
					<view class="tui-explain">Welcome ~</view>
				</view>

				<!-- #ifndef MP -->
				<view class="tui-btn-edit">
					<tui-button type="white" :plain="true" shape="circle" width="92rpx" height="40rpx" :size="22" @click="href(3)">编辑</tui-button>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<view class="tui-set-box">
					<view class="tui-icon-box tui-icon-message" @tap="href(7)">
						<tui-icon name="message" color="#fff" :size="26"></tui-icon>
						<view class="tui-badge tui-badge-white">1</view>
					</view>
					<view class="tui-icon-box tui-icon-setup" @tap="href(2)">
						<tui-icon name="setup" color="#fff" :size="26"></tui-icon>
					</view>
				</view>
				<!-- #endif -->
			</view>
			<!-- 子信息栏 -->
			<view class="tui-header-btm">
				<view class="tui-btm-item" @tap="href(1)">
					<view class="tui-btm-num">{{baseData.like}}</view>
					<view class="tui-btm-text">收藏夹</view>
				</view>
				<view class="tui-btm-item" @tap="href(9)">
					<view class="tui-btm-num">{{baseData.history}}</view>
					<view class="tui-btm-text">足迹</view>
				</view>
			</view>
		</view>



		<!-- 卡片集合框 -->
		<view class="tui-content-box">
			<!-- 我的订单卡片 -->
			<view class="tui-box tui-order-box">
				<tui-list-cell :arrow="true" padding="0" :lineLeft="false" @click="href(4,0)">
					<view class="tui-cell-header">
						<view class="tui-cell-title">我的订单</view>
						<view class="tui-cell-sub">查看全部订单</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list">
					<view class="tui-order-item" @tap="href(4,1)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daifukuan_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red" v-if="lengthData.pay>0">{{lengthData.pay}}</view>
						</view>
						<view class="tui-order-text">待付款</view>
					</view>
					<view class="tui-order-item" @tap="href(4,2)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daifahuo_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red" v-if="lengthData.receive>0">{{lengthData.receive}}</view>
						</view>
						<view class="tui-order-text">待收货</view>
					</view>
<!-- 					<view class="tui-order-item" @tap="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daishouhuo_3x.png" class="tui-order-icon"></image>
						</view>
						<view class="tui-order-text">已送达</view>
					</view> -->
					<!-- <view class="tui-order-item" @tap="href(4,3)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_pingjia_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red" v-if="lengthData.commit>0">{{lengthData.commit}}</view>
						</view>
						<view class="tui-order-text">评价</view>
					</view> -->
					<view class="tui-order-item" @tap="href(4,5)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_tuikuan_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red" v-if="lengthData.feedback>0">{{lengthData.feedback}}</view>
						</view>
						<view class="tui-order-text">退款/售后</view>
					</view>
				</view>
			</view>
			<!-- 我的资产卡片 -->
			<view class="tui-box tui-assets-box" v-if="userinfo.role.length>1">
				<!-- <tui-list-cell padding="0" unlined :hover="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">我的资产</view>
					</view>
				</tui-list-cell> -->
				<view class="tui-order-list tui-assets-list">
					<view class="tui-order-item" @tap="href(8)">
						<view class="tui-assets-num">
							<text>3</text>
							<view class="tui-badge-dot"></view>
						</view>
						<view class="tui-assets-text">优惠券</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num">
							<text>7</text>
							<view class="tui-badge-dot"></view>
						</view>
						<view class="tui-assets-text">积分</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num">
							<text>0</text>
						</view>
						<view class="tui-assets-text">红包</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num">
							<text>1</text>
						</view>
						<view class="tui-assets-text">礼品卡</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num">
							<text>20</text>
						</view>
						<view class="tui-assets-text">津贴</view>
					</view>
				</view>
			</view>

			<!-- 常用工具卡片 -->
			<view class="tui-box tui-tool-box">  <!--  v-if="userinfo.role.length>1"  -->
				<tui-list-cell :arrow="true" padding="0" :lineLeft="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">常用工具</view>
						<!-- <view class="tui-cell-sub">查看更多</view> -->
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item" @tap="href(12)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_gift_3x.png" class="tui-tool-icon"></image>
							<image src="/static/images/mall/my/icon_tab_3x.png" class="tui-badge-icon"></image>
						</view>
						<view class="tui-tool-text">免费领好礼</view>
					</view>
					<view class="tui-tool-item" @tap="href(11)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_purse_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">钱包</view>
					</view>
					<!-- <view class="tui-tool-item" @tap="href(6)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_ticket_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">领券中心</view>
					</view> -->
					<view class="tui-tool-item" @tap="href(10)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_kefu_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">客服服务</view>
					</view>
					<!-- <view class="tui-tool-item">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_fanxian_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">每日返现</view>
					</view> -->
					<view class="tui-tool-item" @tap="href(13)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_tuan_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">超值拼团</view>
					</view>
					<!-- <view class="tui-tool-item">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_zhihuan_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">闲置换钱</view>
					</view> -->
					<!-- <view class="tui-tool-item">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_kaipiao_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">开发票</view>
					</view> -->
				</view>
			</view>

			<!--为你推荐-->
			<tui-divider :size="28" :bold="true" color="#333" width="50%">为你推荐</tui-divider>
			<view class="tui-product-list">
				<view class="tui-product-container">
					<block v-for="(item,index) in goodList" :key="index" v-if="(index+1)%2!=0">
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
					<block v-for="(item,index) in goodList" :key="index" v-if="(index+1)%2==0">
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
			<!--加载loadding-->
			<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		</view>
	</view>
</template>

<script>
	let app = getApp()
	export default {
		onLoad: function(options) {
			this.showGood()


			this.userinfo = app.globalData.userInfo;

			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth * 0.6
				}
			})
		},
		onShow() {
			this.userinfo = app.globalData.userInfo;
			console.log('onshow',this.userinfo)
			this.hooks()
			this.initialData()
		},
		data() {
			return {
				userinfo:app.globalData.userInfo,
				webURL: "https://www.thorui.cn/wx",  //获取图片地址
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0.5,
				productList: [],
				goodList: [],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,

				baseData: {},
				lengthData:{}
			}
		},
		methods: {

			hooks(){
				if(app.globalData.hooks.collection){
					app.getLike()
				}
			},
			
			initialData() {
				let like = uni.getStorageSync('myLike').length ? uni.getStorageSync('myLike').length : 0
				let history = uni.getStorageSync('myHistory').data.length ? uni.getStorageSync('myHistory').data.length : 0
				this.baseData.like = like
				this.baseData.history = history
				this.classifier()
			},

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
				let lengthData = {
					pay:orderSet.pay.length,
					receive:orderSet.receive.length,
					commit:orderSet.commit.length,
					done:orderSet.done.length,
					feedback:orderSet.feedback.length
				}
				this.lengthData = lengthData
			},



			showGood() {
				let goodObj = uni.getStorageSync("goodList").data
				let goodList = new Array()
				for (let item of goodObj) {
					let tempobj = {
						gid:item.id,
						img: item.icon,
						name: item.name,
						sale: item.fee,
						factory: item.oldfee,
						payNum: item.paynum
					}
					goodList.push(tempobj)
				}
				this.goodList = goodList
			},

   
  
			href(page,tab) {
				let url = "";
				switch (page) {
					case 1:
						url = "../myCollections/myCollections"
						break
					case 2:
						url = "../set/set"
						break;
					case 3:
						url = "../userInfo/userInfo"
						break;
					case 4:
						url = "../myOrder/myOrder?tab="+tab
						break;
					case 6:
						url = "../coupon/coupon"
						break;
					case 7:
						url = "../message/message"
						break;
					case 8:
						url = "../myCoupon/myCoupon"
						break;
					case 9:
						url = "../myHistory/myHistory"
						break;
					case 10:
						url = "../userInfo/kefu"
						break;
					default:
						break;
				}
				if (url) {
					uni.navigateTo({
						url: url
					})
				} else {
					uni.showModal({
						content:"正在开发中，敬请期待！"
					})
				}
			},
			login() {
				uni.navigateTo({
					url: '../../login/loginButton'
				})
			},
			detail: function(gid) {
				uni.navigateTo({
					url: '../productDetail/productDetail?gid='+gid
				})
			},
			initNavigation(e) {
				this.opacity = e.opacity;
				this.top = e.top;
			},
			opacityChange(e) {
				this.opacity = e.opacity;
			},
			back() {
				uni.navigateBack();
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200)
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
		}
	}
</script>

<style>
	.tui-header-box {
		width: 100%;
		padding: 0 30rpx 0 20rpx;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 32px;
		transform: translateZ(0);
		z-index: 9999;
	}

	/* #ifndef MP */
	.tui-header-icon {
		min-width: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	/* #ifdef MP */
	.tui-set-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	.tui-icon-box {
		position: relative;
	}

	.tui-icon-setup {
		margin-left: 8rpx;
	}

	.tui-badge {
		position: absolute;
		font-size: 24rpx;
		height: 32rpx;
		min-width: 20rpx;
		padding: 0 6rpx;
		border-radius: 40rpx;
		right: 10rpx;
		top: -5rpx;
		transform: scale(0.8) translateX(60%);
		transform-origin: center center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.tui-badge-red {
		background: #F74D54;
		color: #fff;
	}

	.tui-badge-white {
		background: #fff;
		color: #F74D54;
	}

	.tui-badge-dot {
		position: absolute;
		height: 12rpx;
		width: 12rpx;
		border-radius: 50%;
		right: -12rpx;
		top: 0;
		background: #F74D54;
	}

	.tui-mybg-box {
		width: 100%;
		height: 464rpx;
		position: relative;
	}

	.tui-my-bg {
		width: 100%;
		height: 464rpx;
		display: block;
	}

	.tui-header-center {
		position: absolute;
		width: 100%;
		height: 128rpx;
		left: 0;
		top: 120rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-avatar {
		border-radius: 50%;
		box-shadow: #222222;
		flex-shrink: 0;
		width: 108rpx;
		height: 108rpx;
		display: block;
	}

	.tui-info {
		width: 60%;
		padding-left: 30rpx;

	}

	.tui-nickname {
		font-size: 30rpx;
		font-weight: 500;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-img-vip {
		width: 56rpx;
		height: 24rpx;
		margin-left: 18rpx;
	}

	.tui-explain {
		width: 80%;
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
		opacity: 0.75;
		padding-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-btn-edit {
		flex-shrink: 0;
		padding-right: 22rpx;
	}

	.tui-header-btm {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 280rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
	}

	.tui-btm-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tui-btm-num {
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
	}

	.tui-btm-text {
		font-size: 24rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}

	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		top: -72rpx;
		z-index: 10;
	}

	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-order-box {
		height: 208rpx;
	}

	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.tui-cell-sub {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
		padding-right: 28rpx;
	}

	.tui-order-list {
		width: 100%;
		height: 134rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

	}

	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: #666;
		padding-top: 4rpx;
	}

	.tui-tool-text {
		font-size: 24rpx;
	}

	.tui-order-icon {
		width: 56rpx;
		height: 56rpx;
		display: block;
	}

	.tui-assets-box {
		height: 178rpx;
		margin-top: 20rpx;
	}

	.tui-assets-list {
		height: 84rpx;
	}

	.tui-assets-num {
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
		position: relative;
	}

	.tui-assets-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #666;
		padding-top: 6rpx;
	}

	.tui-tool-box {
		margin-top: 20rpx;
	}

	.tui-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 30rpx;
	}

	.tui-tool-item {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-tool-icon {
		width: 64rpx;
		height: 64rpx;
		display: block;
	}

	.tui-badge-icon {
		width: 66rpx;
		height: 30rpx;
		position: absolute;
		right: 0;
		transform: translateX(88%);
		top: -15rpx;
	}

	/*为你推荐*/
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

	.tui-btn-back {
		width: 88rpx;
		height: 88rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, .5);
		color: #fff;
		position: fixed;
		bottom: 60rpx;
		right: 30rpx;
		z-index: 9999;
	}
</style>
