<template>
	<view>
		<div class="login">
			<p>申请获取以下权限</p>
			<p>获取您的公开信息（昵称，头像等）</p>

			<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" hover-class="hover-active">点击授权</button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			bindGetUserInfo(e) {
				if (e.detail.userInfo) {
					uni.showToast({
						title: '授权成功'
					})
					uni.navigateBack()
				} else {
					//用户按了拒绝按钮
					wx.showModal({
						title: '警告',
						content: '您点击了拒绝授权，将无法使用小程序，请重新授权登录后再使用!!!',
						showCancel: false,
						confirmText: '返回授权',
					});
				}
			}
		}
	}
</script>

<style lang="less">
	.login {
		padding: 100px 50rpx 0;

		p {
			padding: 20rpx 30rpx;
			font-size: 34rpx;

			&:last-of-type {
				color: #CCCCCC;
			}
		}

		button {
			height: 80rpx;
			background-color: #00cc79;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			color: #FFFFFF;
			border: 2rpx solid #39b684;
			border-radius: 40rpx;
			margin-top: 100rpx;
			border: none;

			&::after {
				display: none;
			}
		}

		.hover-active {
			opacity: .8;
		}
	}
</style>
