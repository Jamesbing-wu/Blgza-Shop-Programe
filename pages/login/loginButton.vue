<template>
	<view>
		<view style="position: relative; text-align: center;">
			<image src="https://jamesbing.cn/blgza/login/login.png" mode="widthFix"></image>
			
			<!-- <text class="text">您尚未登录，请点击下方按钮进行授权登录！</text> -->
		</view>
		<view class="line"></view>
		<view style="display: flex; flex-direction: column; align-items: flex-start;">
			<text class="h1">登陆后开发者将获取一些权限</text>
			<text class="h2">● 获取你的公开信息（昵称、头像等）</text>
			
		</view>
		<button open-type="getUserInfo" @click="getUserInfo" type="primary">微信登录</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			getUserInfo:function(){
				uni.login({
					provider:'weixin',
					success: (res) => {
						if(res.code){
							getApp().globalData.code=res.code
							console.log('code'+res.code)
							uni.getUserInfo({
								success:function(res){
									
									getApp().globalData.userInfo=res.userInfo
									console.log(res.userInfo)
									uni.request({
										url:getApp().apis().wechatLogin,
										method:'POST',
										header: {
										        'content-type': 'application/x-www-form-urlencoded'
										      },
										dataType: 'json',
										responseType: 'text',
										data:{
											code:getApp().globalData.code,
											appid:'wx43c7a28a03203079',
											secret:'ee1c4fb19a388002bdcba7df427f3f60',
											name:res.userInfo.nickName,
											url:res.userInfo.avatarUrl
										},
										success: (res) => {
											getApp().globalData.openid=res.data.openid
											getApp().globalData.sessionKey=res.data.session_key
											getApp().globalData.signin=res.data.signin
											getApp().globalData.phone=res.data.pho_num
											uni.setStorageSync('opid',res.data.openid)
											getApp().globalData.userInfo.haslogin=true
											console.log(getApp().globalData)
											
											
										},
										complete: (res) => {
											
											console.log('登录成功')
											uni.navigateBack({
												delta:1
											})
										}
									})
								}
							})
							
							
							
							
						}
					}
				})
			}
			
				
			
		}
	}
</script>

<style>
	button{
		
		width: 84%;
		margin-top: 60upx;
	}

	image{
		/* margin-top: 60upx; */
		margin-bottom: 20upx;
		margin-top: 20upx;
		width: 60%;
		height: 60%;
	}
	.text{
		position: absolute;
		z-index: 2;
		left: 10upx;
		top: 100upx;
		
		
		
		
	}
	.h1{
		font-size: 45upx;
		font-weight: bold;
		margin-left: 10%;
	}
	.h2{
		color: #999999;
		font-size: 35upx;
		margin-left: 10%;
		margin-top: 20upx;
	}
	.line{
		border-bottom: solid;
		border-color: #cecece;
		margin-bottom: 30upx;
		width: 90%;
		margin-left: 5%;
	}
</style>
