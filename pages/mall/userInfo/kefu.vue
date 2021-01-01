<template>
	<view class="main">
		<!-- <web-view src="https://mp.weixin.qq.com/s/N35JQuWEbxEw7ekM2CA5GQ"></web-view> -->
		<image src="https://jamesbing.cn/blgza/kefu/%E5%AE%A2%E6%9C%8D.png" mode="widthFix"></image>
		<view class="line"></view>
		<button open-type="contact" type="primary">联系客服</button>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			// BigImage:function(){
			// 	var list=[];
			// 	list.push(this.imageUrl)
			// 	uni.previewImage({
			// 		urls:list,
			// 		current:0
			// 	})
			// }
		}
	}
</script>

<style>
	.main{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.image{
		margin-top: 100upx;
		
	}
	.line{
		border-bottom: solid;
		border-color: #cecece;
		margin-bottom: 30upx;
		width: 90%;
		margin-left: 5%;
		}
	button{
		width: 90%;
		margin-top: 30upx;
	}
</style>
