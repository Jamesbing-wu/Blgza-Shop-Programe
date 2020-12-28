<template>
	<view class="container">
		<!-- #ifdef MP-WEIXIN -->
		<button open-type="getUserInfo">
			<view class="tui-login-way" style="bottom: 180rpx;" @click="getUserInfo">
				<view class="loginbtn" style="display: flex;">
					<view class="logintext">登 录</view>
				</view>
			</view>
		</button>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="tui-login-way" style="bottom: 180rpx;" v-if="!popupShow" @click="getUserInfo">
			<view class="loginbtn" style="display: flex;">
				<text>登 录</text>
			</view>
		</view>
		<!-- #endif -->

		<view class="tui-login-way" style="bottom: 80rpx;" v-if="!popupShow">
			<view hover-class="tui-opcity" :hover-stay-time="150" @tap="showOtherLogin">其他方式登录</view>
		</view>

		<tui-bottom-popup :mask="false" backgroundColor="transparent" :show="popupShow">
			<view class="tui-auth-login">
				<!-- #ifndef MP -->
				<view class="tui-icon-platform" hover-class="tui-opcity" :hover-stay-time="150">
					<image src="/static/images/share/icon_qq.png" class="tui-login-logo"></image>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS || MP-WEIXIN || H5 -->
				<view class="tui-icon-platform" hover-class="tui-opcity" :hover-stay-time="150">
					<image src="/static/images/share/icon_wechat.png" class="tui-login-logo"></image>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP -->
				<view class="tui-icon-platform" hover-class="tui-opcity" hover-stay-time="150">
					<image src="/static/images/share/icon_sina.png" class="tui-login-logo"></image>
				</view>
				<!-- #endif -->
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	let app = getApp();
	import {
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			disabled: function() {
				let bool = true;
				if (this.mobile && this.password) {
					bool = false;
				}
				return bool;
			}
		},
		data() {
			return {
				entry:'',
				
			};
		},
		onLoad(options) {
			if(options){
				this.entry = options.entry
			}
			// setTimeout(() => {
			// 	this.logout();
			// }, 0);
		},
		methods: {
			...mapMutations(['login', 'logout']),
			getUserInfo() {
				if (!app.globalData.haslogin) {
					uni.getUserInfo({
						success(res) {
							let data = {
								iv: res.iv,
								ed: res.encryptedData,
								se: uni.getStorageSync("regInfo").session_key
							}
							uni.request({
								url: app.apis().wechatInfo,
								method: 'POST',
								data: data,
								success(res) {
									app.globalData.haslogin = true
									if (res.data.code == 200) {
										app.globalData = Object.assign(app.globalData, res.data.data)
										console.log(app.globalData)
										uni.setStorageSync('global', app.globalData)
										uni.showModal({
											title: '登录',
											content: '登录成功~',
											confirmText: '确定',
											confirmColor: '#8778ff', 
											showCancel: false,
											success: function(res) {
												if (res.confirm) {
													if(this.entry=='productDetail'){
														uni.navigateBack({})
													}else{
														uni.switchTab({
															url: '../mall/mall/mall'
														})
													}
													
												}
											}
										})
									} else if (res.statusCode == 500) {
										uni.showToast({
											title: '已经注册',
											icon: 'loading',
											duration: 800,
										})
										uni.switchTab({
											url: '../mall/mall/mall'
										})
									}
								}
							})
						},
						fail(res) {
							uni.showModal({
								title: '登录提示',
								content: '登录后发现更能精彩的世界哦~',
								confirmColor: '#877bff',
								confirmText: '知道啦',
								showCancel: false
							})
						},
					})
				} else {
					uni.showToast({
						title: '已经注册',
						icon: 'loading',
						duration: 1500,
					})
					uni.showModal({
						title: '登录提示',
						content: '登录成功~',
						confirmColor: '#877bff',
						confirmText: '知道啦',
						showCancel: false,
						success(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '../mall/mall/mall'
								})
							}
						}
					})
				}
			},

			inputMobile: function(e) {
				this.mobile = e.detail.value;
			},

			inputPwd: function(e) {
				this.password = e.detail.value;
			},
			clearInput(type) {
				if (type == 1) {
					this.mobile = '';
				} else {
					this.password = '';
				}
			},
			href(type) {
				let url = '../forgetPwd/forgetPwd';
				if (type == 2) {
					url = '../reg/reg';
				}
				this.tui.href(url);
			},
			showOtherLogin() {
				//打开后 不再关闭
				this.popupShow = true;
			}
		}
	};
</script>

<style lang="scss">
	.container {
		.tui-login-way {
			width: 100%;
			font-size: 26rpx;
			color: $uni-color-primary;
			display: flex;
			justify-content: center;
			position: fixed;
			left: 0;
			bottom: 280rpx;

			view {
				padding: 12rpx 0;
			}
		}

		.loginbtn {
			display: flexbox;
			bottom: 180rpx;
			width: 448rpx;
			height: 100rpx;
			border-radius: 77.76px;
			background: linear-gradient(223deg, #87A0FF, #876AFF);
			box-shadow: 0px 12px 29px rgba(83, 114, 222, 0.4);

			.logintext {
				margin: auto;
				line-height: 50rpx;/*让黄色div中的文字内容垂直居中*/
				text-align: center;
				height: 70rpx;
				font-size: 44rpx;
				color: #FFFFFF;
			}
		}

		.tui-status-bar {
			width: 100%;
			height: var(--status-bar-height);
		}

		.tui-btn-box {
			width: 532rpx;
			height: 92rpx;
			border-radius: 77.76px;
			background: linear-gradient(223deg, #87A0FF, #876AFF);
			box-shadow: 0px 12px 29px rgba(83, 114, 222, 0.4);
		}

		.tui-header {
			width: 100%;
			padding: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
		}

		.tui-page-title {
			width: 100%;
			font-size: 48rpx;
			font-weight: bold;
			color: $uni-text-color;
			line-height: 42rpx;
			padding: 40rpx;
			box-sizing: border-box;
		}

		.tui-form {
			padding-top: 50rpx;

			.tui-view-input {
				width: 100%;
				box-sizing: border-box;
				padding: 0 40rpx;

				.tui-cell-input {
					width: 100%;
					display: flex;
					align-items: center;
					padding-top: 48rpx;
					padding-bottom: $uni-spacing-col-base;

					input {
						flex: 1;
						padding-left: $uni-spacing-row-base;
					}

					.tui-icon-close {
						margin-left: auto;
					}
				}
			}

			.tui-cell-text {
				width: 100%;
				padding: $uni-spacing-col-lg $uni-spacing-row-lg;
				box-sizing: border-box;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.tui-color-primary {
					color: $uni-color-primary;
				}
			}
		}

		.tui-auth-login {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-bottom: 80rpx;
			padding-top: 20rpx;

			.tui-icon-platform {
				width: 90rpx;
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				margin-left: 40rpx;

				&::after {
					content: '';
					position: absolute;
					width: 200%;
					height: 200%;
					transform-origin: 0 0;
					transform: scale(0.5, 0.5) translateZ(0);
					box-sizing: border-box;
					left: 0;
					top: 0;
					border-radius: 180rpx;
					border: 1rpx solid $uni-text-color-placeholder;
				}
			}

			.tui-login-logo {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
</style>
