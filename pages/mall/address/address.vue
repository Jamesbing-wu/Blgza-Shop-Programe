<template>
	<view class="tui-safe-area">
		<view class="tui-address">
			<block v-for="(item,index) in addressList" :key="index">
				<tui-list-cell padding="0" @tap="chooseAddress(item)">
					<view class="tui-address-flex">
						<view class="tui-address-left">
							<view class="tui-address-main">
								<view class="tui-address-name tui-ellipsis">{{item.name.substr(0,4)}}</view>
								<view class="tui-address-tel">{{fixPhone(item.pho)}}</view>
							</view>
							<view class="tui-address-detail">
								<view class="tui-address-label" v-if="item.is_default!=0">默认</view>
								<view class="tui-address-label">{{item.type}}</view>
								<text>{{item.place+item.setting}}</text>
							</view>
						</view>
						<view class="tui-address-imgbox" @tap.stop="editAddr(item.id)">
							<image class="tui-address-img" src="/static/images/mall/my/icon_addr_edit.png" />
						</view>
					</view>
				</tui-list-cell>
			</block>
		</view>
		<!-- 新增地址 -->
		<view class="tui-address-new">
			<tui-button shadow shape="circle" type="danger" height="88rpx" @click="editAddr(0)">+ 新增收货地址</tui-button>
		</view>
	</view>
</template>

<script>
	let app = getApp()
	export default {
		data() {
			return {
				addressMode: false,
				addressList: [],
				
			}
		},


		onLoad: function(options) {
			if(options.chooseAddress){
				this.addressMode =true
			}
		},

		onShow: function() {

			// 获取地址信息
			let getAddress = {
				url: app.apis().getAddress,
				token: app.globalData.token,
				method: 'GET',
				body: {
					default: 'all'
				}
			}
			app.httpRequest(getAddress).then(res => {
				this.addressList = JSON.parse(res.data).data
				uni.setStorageSync('UserAddress', JSON.parse(res.data).data)
			})
		},
		computed: {
			fixPhone() {
				return (phone) => {
					return phone.toString().substr(0, 3) + '****' + phone.toString().substr(7)
				}
			},


		},
		methods: {
			// forcePull() {
			// 	this.addressMode = true
			// },
			editAddr(id) {
				uni.navigateTo({
					url: "../editAddress/editAddress?id=" + id
				})
			},

			// 隐私格式化数据
			modePhone(str) {
				if (null != str && str != undefined) {
					// console.log(str.replace(pat,'$1****$2'))
					return str.substr(0, 3) + '****' + str.substr(7);
				} else {
					return "";
				}
			},

			chooseAddress(item) {
				console.log(item)
				if (this.addressMode == true) {
					console.log(item)
					uni.setStorageSync('defaultAddress', item)
					uni.navigateBack({})
				}

			}


		}
	}
</script>

<style>
	.tui-address {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 160rpx;
	}

	.tui-address-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-address-main {
		width: 600rpx;
		height: 70rpx;
		display: flex;
		font-size: 30rpx;
		line-height: 86rpx;
		padding-left: 30rpx;
	}

	.tui-address-name {
		width: 120rpx;
		height: 60rpx;
	}

	.tui-address-tel {
		margin-left: 10rpx;
	}

	.tui-address-detail {
		font-size: 24rpx;
		word-break: break-all;
		padding-bottom: 25rpx;
		padding-left: 25rpx;
		padding-right: 120rpx;
	}

	.tui-address-label {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #e41f19;
		border-radius: 6rpx;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: center center;
		margin-right: 6rpx;
	}

	.tui-address-imgbox {
		width: 80rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 10rpx;
	}

	.tui-address-img {
		width: 36rpx;
		height: 36rpx;
	}

	.tui-address-new {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 20rpx 25rpx 30rpx;
		box-sizing: border-box;
		background: #fafafa;
	}

	.tui-safe-area {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
