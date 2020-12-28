<template>
	<view class="tui-addr-box">
		<form :report-submit="true">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="name" placeholder="请输入收货人姓名" maxlength="9" type="text"
					 @input="getForm($event,'name')" :value="submitData.name" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="mobile" placeholder="请输入收货人手机号码" maxlength="11"
					 type="number" @input="getForm($event,'phone')" :value="showPhone" @tap="clearPhone"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" padding="0">
				<view class="tui-line-cell" @tap="showPicker">
					<view class="tui-title"><text class="tui-title-city-text">所在城市</text></view>
					<input placeholder-class="tui-phcolor" class="tui-input" disabled name="city" placeholder="请选择城市" maxlength="50"
					 type="text" :value="chooseLocation || submitData.location" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货地址</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="address" placeholder="请输入详细的收货地址" maxlength="50"
					 type="text" @input="getForm($event,'detailLocation')" :value="submitData.detailLocation" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-cell-title">地址类型</view>
					<view class="tui-addr-label">
						<text v-for="(item,index) in lists" :key="index" class="tui-label-item" :class="{'tui-label-active':chooseType==index}"
						 @tap="getType(index,item)">{{item}}</text>
					</view>
				</view>
			</tui-list-cell>

			<!-- 默认地址 -->
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-swipe-cell">
					<view>设为默认地址</view>
					<switch :checked="defaultLocation" color="#19be6b" class="tui-switch-small" @tap="getDefault(defaultLocation)" />
				</view>
			</tui-list-cell>
			<!-- 保存地址 -->
			<view class="tui-addr-save" @tap="submitAddress">
				<tui-button shadow type="danger" height="88rpx" shape="circle">保 存 收 货 地 址</tui-button>
			</view>
			<view class="tui-del" @tap="deleteAddress" v-if="editMode">
				<tui-button shadow type="gray" height="88rpx" shape="circle">删 除 收 货 地 址</tui-button>
			</view>
		</form>

		<!--地址选择浮窗-->
		<view class="tui-mask-screen" :class="[showPickerStatus?'tui-mask-show':'']" @tap="hidePicker"></view>
		<view class="tui-picker-box" :class="[showPickerStatus?'tui-pickerbox-show':'']">
			<view class="picker-header tui-list-item">
				<view class="btn-cancle" hover-class="tui-opcity" :hover-stay-time="150" @tap.stop="hidePicker">取消</view>
				<view class="btn-sure" hover-class="tui-opcity" :hover-stay-time="150" @tap.stop="picker">确定</view>
			</view>
			<picker-view indicator-style="height: 50px;" class="picker-view" :value="value" @change="columnPicker">
				<picker-view-column>
					<view v-for="(item,index) in proviceArr" :key="index" class="item">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item,index) in cityArr" :key="index" class="item">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item,index) in districtArr" :key="index" class="item">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view>

	</view>

</template>

<script>
	let app = getApp()
	const cityData = require('@/utils/newcity.js')
	export default {
		data() {
			return {
				addressId: null,
				showPhone:null,
				
				proviceArr: [],
				cityArr: [],
				districtArr: [],
				chooseLocation: '',
				value: [0, 0, 0],
				iconHidden: true,
				showPickerStatus: false,
				text: ["请选择", "请选择", "请选择"],
				searchKey: "",
				chooseType: 0,
				defaultLocation: true,
				lists: ["家", "公司", "学校", "其他"],
				editMode: false, // 编辑地址模式/新增地址模式
				submitData: {}
			}
		},
		onLoad(options) {
			console.log(options)

			let id = options.id
			this.addressId = id
			if (options.id == 0) {
				this.submitData.isDefault = true
				this.submitData.locationType = '家'
				this.editMode = false
			} else {
				// console.log(this.fetchAddress(id))
				this.editMode = true
				let add = this.fetchAddress(id)
				this.submitData.isDefault = add.is_default
				this.submitData.detailLocation = add.setting
				this.submitData.name = add.name
				this.submitData.location = add.place
				this.submitData.phone = add.pho
				this.submitData.locationType = add.type
				switch (add.type) {
					case "家":
						this.chooseType = 0
						break
					case "公司":
						this.chooseType = 1
						break
					case "学校":
						this.chooseType = 2
						break
					case "其他":
						this.chooseType = 3
						break
					default:
						this.chooseType = 3
				}
				this.defaultLocation = add.is_default
				this.showPhone = this.fixPhone(this.submitData.phone)
			}



			//初始化数据
			this.proviceArr = this.toArr(cityData);
			this.cityArr = this.toArr(cityData[0].children);
			this.districtArr = this.toArr(cityData[0].children[0].children)

		},


		computed: {
			fixPhone() {
				return (phone) => {
					return phone.toString().substr(0, 3) + '****' + phone.toString().substr(7)
				}
			},


		},


		methods: {
			clearPhone(){
				this.showPhone = ''
			},
			
			fetchAddress(id) {
				let add = uni.getStorageSync('UserAddress')
				for (let item of add) {
					if (id == item.id) {
						return item;
					}
				}
			},




			getForm(e, type) {
				// console.log(e.detail.value,type)
				let value = e.detail.value
				this.submitData[type] = value
				console.log(this.submitData)
			},

			getType(index, value) {
				this.chooseType = index
				this.submitData.locationType = value
				console.log(this.submitData)
			},
			getDefault(e) {
				this.defaultLocation = !this.defaultLocation
				this.submitData.isDefault = this.defaultLocation
				console.log(this.submitData)
			},


			// 地址选择器
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].name);
				}
				return arr;
			},
			//picker change切换事件
			columnPicker: function(e) {
				let value = e.detail.value;
				//如果两者下标不一致，表示滚动过
				if (this.value[0] !== value[0]) {
					this.proviceArr = this.proviceArr;
					this.cityArr = this.toArr(cityData[value[0]].children);
					this.districtArr = this.toArr(cityData[value[0]].children[0].children);
					this.value = [value[0], 0, 0]
				} else if (this.value[1] !== value[1]) {
					this.proviceArr = this.proviceArr;
					this.cityArr = this.cityArr;
					this.districtArr = this.toArr(cityData[value[0]].children[value[1]].children);
					this.value = [value[0], value[1], 0]
				} else {
					this.value = value
				}
			},
			//确定按钮
			picker: function(e) {
				let value = this.value;
				if (cityData.length > 0) {
					let provice = cityData[value[0]].name;
					let city = cityData[value[0]].children[value[1]].name;
					let district = cityData[value[0]].children[value[1]].children[value[2]].name;
					this.text = [provice, city, district];
					let loc = provice + " " + city + " " + district
					let locreal = provice + city + district
					this.chooseLocation = loc
					this.submitData.location = locreal
					console.log(this.submitData)
					this.showPickerStatus = false
				}
			},
			// 显示picker-view
			showPicker: function() {
				this.showPickerStatus = true
			},
			// 隐藏picker-view
			hidePicker: function() {
				this.showPickerStatus = false
			},

			submitAddress() {
				let opt = {
					url:app.apis().addAddress,
					method:'POST',
					token:app.globalData.token,
					data:{
						isDefault:this.submitData.isDefault,
						location:this.submitData.location,
						detailLocation:this.submitData.detailLocation,
						locationType: this.submitData.locationType,
						name:this.submitData.name,
						phone:this.submitData.phone
					}
				}
				if(this.editMode){
					opt.data.addressId = this.addressId
					opt.url = app.apis().editAddress
				}
				console.log(opt)
				
				app.httpRequest(opt).then(res=>{
					console.log(res)
					if (JSON.parse(res.data).msg == "success") {
						uni.showToast({
							duration: 800,
							icon: 'success',
							title: '保存成功',
							success() {
								uni.navigateBack({
								})
							}
						})
					} else {
						uni.showToast({
							duration:800,
							icon:'loading',
							title:'网络开小差~',
							success() {
								uni.navigateBack({
								})
							}
						})
					}
				})
			},
		
			deleteAddress(id) {
				let opt = {
					url: app.apis().editAddress,
					method: 'POST',
					token: app.globalData.token,
					data: {
						addressId: this.addressId,
						kill: 1
					}
				}
				app.httpRequest(opt).then(res => {
					if (JSON.parse(res.data).msg == "success") {
						uni.showToast({
							duration: 800,
							icon: 'success',
							title: '删除成功',
							success() {
								uni.navigateBack({
								})
							}
						})
					} else {
						uni.showToast({
							duration:800,
							icon:'loading',
							title:'网络开小差~',
							success() {
								uni.navigateBack({
								})
							}
						})
					}
				})
			}
			
			
		},
	}
</script>

<style>
	/* picker start*/

	.tui-mask-screen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 99996;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.tui-mask-show {
		opacity: 1;
		visibility: visible;
	}

	.tui-picker-box {
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		visibility: hidden;
		transform: translate3d(0, 100%, 0);
		transform-origin: center;
		transition: all 0.3s ease-in-out;
		min-height: 20rpx;
		background: #fff;
	}

	.tui-pickerbox-show {
		transform: translate3d(0, 0, 0);
		visibility: visible;
	}

	.picker-header {
		width: 100%;
		height: 90rpx;
		padding: 0 46rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		font-size: 32rpx;
		background: #fff;
	}

	.tui-list-item::after {
		left: 0;
	}

	.btn-cancle {
		padding: 20rpx;
		color: #888;
	}

	.btn-sure {
		padding: 20rpx;
		color: #bf0000;
	}

	.picker-view {
		width: 100%;
		height: 260px;
	}

	.item {
		line-height: 50px;
		text-align: center;
	}

	/* picker end*/

	.tui-addr-box {
		padding: 20rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 180rpx;
		font-size: 28rpx;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
	}

	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}

	.tui-cell-title {
		font-size: 28rpx;
	}

	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.9);
	}

	.tui-label-active {
		background: #E41F19;
		border-color: #E41F19;
		color: #fff;
	}

	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}

	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		padding: 24rpx;
		margin-top: 100rpx;
	}

	.tui-del {
		padding: 24rpx;
	}
</style>
