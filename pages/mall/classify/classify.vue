<template>
	<view class="container">
		<!-- 搜索框 -->
		<view class="tui-searchbox">
			<view class="tui-search-input" @tap="search">
				<icon type="search" :size="13" color="#999"></icon>
				<text class="tui-search-text">搜索巴郎子商品</text>
			</view>
		</view>
		<!-- 垂直滑动栏 -->
		<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-into-view="scrollViewId" :style="{ height: height + 'px', top: top + 'px' }">
			<view :id="`id_${index}`" v-for="(item, index) in tabbar" :key="index" class="tab-bar-item" :class="[currentTab == index ? 'active' : '']"
			 :data-current="index" @tap.stop="swichNav">
				<text>{{ item }}</text>
			</view>
		</scroll-view>

		<!-- 右侧分类栏 -->
		<block v-for="(item, index) in tabbar" :key="index">
			<scroll-view scroll-y class="right-box" :style="{ height: height + 'px', top: top + 'px' }" v-if="currentTab == index">
				<view class="page-view">
					<!-- 分类banner -->
					<swiper indicator-dots autoplay circular :interval="5000" :duration="150" class="swiper">
						<swiper-item @tap.stop="detail" v-for="(banner,index) in bannerList">
							<image :src="banner" class="slide-image" />
						</swiper-item>
					</swiper>

					<view class="class-box">
						<!-- 品牌推荐子分类栏 -->
						<view class="class-item" v-for="obj in tabbar_brands[index]">
							<view class="class-name">{{obj.name}}</view>
							<view class="g-container">
								<view class="g-box" @tap.stop="productList" :data-key="child.name" v-for="child in obj.child">
									<image :src="child.icon" class="g-image" />
									<view class="g-title">{{child.name}}</view>
								</view>
							</view>
						</view>
						<!-- 默认子分类栏 -->
						<view class="class-item">
							<view class="class-name">{{tabbar_child[index].name}}</view>
							<view class="g-container">
								<view class="g-box" @tap.stop="productList" :data-key="child.name" v-for="child in tabbar_child[index].child">
									<image :src="child.icon" class="g-image" />
									<view class="g-title">{{child.name}}</view>
								</view>
							</view>
						</view>


					</view>



				</view>

			</scroll-view>
		</block>
	</view>
</template>

<script>
	let app = getApp()
	export default {
		data() {
			return {
				current: 1,
				bannerList: [],
				tabbar_brands: [],
				tabbar_child: [],
				tabbar: [],
				height: 0, //scroll-view高度
				top: 0,
				currentTab: 0, //预设当前项的值
				scrollViewId: "id_0"
			};
		},
		onLoad: function(options) {
			this.showBanner()
			this.getCatalogFind()
			setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						let header = 92;
						let top = 0;
						//#ifdef H5
						top = 44;
						//#endif
						this.height = res.windowHeight - uni.upx2px(header);
						this.top = top + uni.upx2px(header);
					}
				});
			}, 50);
		},
		methods: {


			getCatalogFind() {
				let catalogFind = {
					url: app.apis().catalogFind,
					method: 'GET',
				}
				app.httpRequest(catalogFind).then(res => {
					let rowdata = JSON.parse(res.data).data
					let classify_tabbar = new Array()
					let tabbar_brands = new Array()
					let tabbar_child = new Array()
					for (let item of rowdata) {
						classify_tabbar.push(item.name)
						tabbar_brands.push(item.brand)
						let temp_child = {
							name: item.name,
							child: item.child
						}
						tabbar_child.push(temp_child)
					}
					uni.setStorageSync('classify_tabbar', classify_tabbar)
					uni.setStorageSync('tabbar_brands', tabbar_brands)
					uni.setStorageSync('tabbar_child', tabbar_child)
					this.tabbar = uni.getStorageSync('classify_tabbar')
					this.tabbar_brands = uni.getStorageSync('tabbar_brands')
					this.tabbar_child = uni.getStorageSync('tabbar_child')
				})
			},



			showBanner() {
				let bannerObj = uni.getStorageSync("bannerCatalog")
				let bannerList = new Array()
				for (let item of bannerObj) {
					bannerList.push(item.url)
				}
				// console.log(bannerList)
				this.bannerList = bannerList
			},

			mall: function() {
				uni.navigateTo({
					url: '../mall/mall'
				});
			},


			// 点击标题切换当前页时改变样式
			swichNav: function(e) {
				let cur = e.currentTarget.dataset.current;
				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur;
					this.checkCor();
				}
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				if (this.currentTab > 6) {
					this.scrollViewId = `id_${this.currentTab - 2}`;
				} else {
					this.scrollViewId = `id_0`;
				}
			},
			detail(e) {
				uni.navigateTo({
					url: '../productDetail/productDetail'
				});
			},
			productList(e) {
				let key = e.currentTarget.dataset.key;
				uni.navigateTo({
					url: '../productList/productList?searchKey=' + key
				});
			},
			search: function() {
				uni.navigateTo({
					url: '../search/search'
				});
			}
		}
	};
</script>

<style>
	page {
		background: #fcfcfc;
	}

	/*tabbar*/

	.tui-tabbar {
		width: 100%;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 99999;
		background: #fff;
		height: 100rpx;
		left: 0;
		bottom: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
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

	.tui-tabbar-item {
		flex: 1;
		width: 25%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		font-size: 24rpx;
		color: #666;
		height: 80rpx;
	}

	.tui-ptop-4 {
		padding-top: 4rpx;
	}

	.tui-scale {
		font-weight: bold;
		transform: scale(0.8);
		transform-origin: center 100%;
		line-height: 30rpx;
	}

	.tui-item-active {
		color: #e41f19 !important;
	}

	/*tabbar*/
	/* 左侧导航布局 start*/

	/* 隐藏scroll-view滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tui-searchbox {
		width: 100%;
		height: 92rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 100;
	}

	.tui-searchbox::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #d2d2d2;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tui-search-input {
		width: 100%;
		height: 60rpx;
		background: #f1f1f1;
		border-radius: 30rpx;
		font-size: 26rpx;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-search-text {
		padding-left: 16rpx;
	}

	.tab-view {
		/* height: 100%; */
		width: 200rpx;
		position: fixed;
		left: 0;
		z-index: 10;
	}

	.tab-bar-item {
		width: 200rpx;
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
	}

	.active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fcfcfc;
	}

	.active::before {
		content: '';
		position: absolute;
		border-left: 8rpx solid #e41f19;
		height: 30rpx;
		left: 0;
	}

	/* 左侧导航布局 end*/

	.right-box {
		width: 100%;
		position: fixed;
		padding-left: 220rpx;
		box-sizing: border-box;
		left: 0;
	}

	.page-view {
		width: 100%;
		overflow: hidden;
		padding-top: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.swiper {
		width: 100%;
		height: 220rpx;
		border-radius: 12rpx;
		overflow: hidden;
		transform: translateZ(0);
	}

	/* #ifdef MP-WEIXIN */
	.swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	.swiper .wx-swiper-dot-active::before {
		background: #fff;
	}

	.swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	/* #ifndef MP-WEIXIN */
	>>>.swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	>>>.swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	>>>.swiper .uni-swiper-dot-active::before {
		background: #fff;
	}

	>>>.swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	.slide-image {
		width: 100%;
		height: 220rpx;
	}

	.class-box {
		padding-top: 30rpx;
	}

	.class-item {
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 12rpx;
	}

	.class-name {
		font-size: 22rpx;
	}

	.g-container {
		/* padding-top: 20rpx; */
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.g-box {
		width: 33.3333%;
		text-align: center;
		padding-top: 40rpx;
	}

	.g-image {
		width: 120rpx;
		height: 120rpx;
	}

	.g-title {
		font-size: 22rpx;
	}
</style>
