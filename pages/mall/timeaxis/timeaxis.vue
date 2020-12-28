<template>
	<view class="container">
		<view class="tui-order-header">
			<view class="tui-text">订单编号：
				<text class="tui-bold">{{express.eid}}</text>
			</view>
			<view class="tui-text">快递公司：{{express.company}}</view>
			<view class="tui-text">预计送达：
				<text class="tui-bold">{{express.expReach}}</text>
			</view>
		</view>
		<view class="tui-order-tracking">
			<tui-time-axis>

				<tui-timeaxis-item backgroundColor="transparent" v-for="(item,index) in express.extends">
					<template v-slot:node>
						<view class="tui-node" :style="{backgroundColor:backgroundColor}" v-if="index === 0">
							<tui-icon :name="fixIcon(item.status)" color="#fff" :size="14" :bold="true"></tui-icon>
						</view>
						<view class="tui-node" v-else>
							<tui-icon :name="fixIcon(item.status)" color="#fff" :size="13"></tui-icon>
						</view>
					</template>
					<template v-slot:content>
						<view v-if="item.status=='运输中'">
							<view class="tui-order-title">{{item.status}}</view>
							<view class="" v-for="(citem,cindex) in item.detail">
								<view class="tui-order-desc">{{citem.subDetail}}</view>
								<view class="tui-order-time tui-gray" style="margin-bottom: 20rpx;">{{citem.subtime}}</view>
							</view>
						</view>
						<view v-else>
							<view class="tui-order-title">{{item.status}}</view>
							<view class="tui-order-desc">{{item.detail}}</view>
							<view class="tui-order-time tui-gray">{{item.time}}</view>
						</view>
					</template>
				</tui-timeaxis-item>
			</tui-time-axis>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				express: {},
				color:true,
				backgroundColor:"#5677fc",
				// 绑定样式
				presentColor: {
					color:"#5677fc",
					border:"solid 3rpx #fff"
					
				}
			}
		},
		onLoad(options) {
			let page = getCurrentPages()
			let prepage = page[page.length - 2]
			this.express = prepage.data.orderDetail.express
		},
		computed: {

		},
		methods: {
			fixIcon(status) {
				let icon = ""
				switch (status) {
					case "已签收":
						icon = "check"
						break
					case "派送中":
						icon = "people"
						break
					case "运输中":
						icon = "transport"
						break
					case "仓库处理中":
						icon = "home"
						break
					case "已下单":
						icon = "order"
						break
					case "温馨提示":
						icon = "notice"
						break
					default:
						break
				}
				return icon
			}
		}

	}
</script>

<style>
	.tui-order-header {
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-text {
		font-size: 28rpx;
		color: #333;
		padding: 4rpx;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-node {
		height: 44rpx;
		width: 44rpx;
		border-radius: 50%;
		background-color: #ddd;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		flex-shrink: 0;
	}



	.tui-node-dot {
		height: 16rpx;
		width: 16rpx;
		background-color: #ddd;
		border-radius: 50%;
		/* transform: translateY(45%); */
		margin-top: 6rpx;
	}

	.tui-bg-primary {
		background: #EB0909 !important;
	}

	.tui-order-tracking {
		padding: 30rpx 30rpx 30rpx 40rpx;
		background: #fff;
		margin-top: 20rpx;
		box-sizing: border-box;
	}

	.tui-order-title {
		padding-bottom: 12rpx;
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
	}

	.tui-order-desc {
		padding-bottom: 12rpx;
		font-size: 28rpx;
		color: #333;
	}

	.tui-ptop {
		display: flex;
		justify-content: flex-start;
		line-height: 28rpx;
	}

	.tui-order-time {
		font-size: 24rpx;
		font-weight: bold;
	}

	.tui-gray {
		color: #848484 !important;
	}

	.tui-light-gray {
		color: #888 !important;
	}

	.tui-primary {
		color: #5677fc;
	}
</style>
