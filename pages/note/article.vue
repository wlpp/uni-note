<template>
	<div class="article-note">
		<input type="text" placeholder="标题" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				edits:'2222222222222222222222222222'
			}
		},
		methods: {
			saveEditor(){
				console.log(111); 
			},
			hideEditor(){
				console.log(222);
			},
			uploadImg(){}
		}
	}
</script>

<style lang="less">
	.article-note {
		padding: 30rpx 30rpx 80rpx;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;

		input {
			margin-bottom: 20rpx;
			padding: 10rpx 0;
			border-bottom: 1rpx solid;
		}

		textarea {
			display: block;
			width: 100%;
		}

		.submit {
			position: fixed;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			width: 100%;
			height: 80rpx;
			background-color: #00cc79;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			color: #FFFFFF;
			border: 2rpx solid #39b684;
			// border-radius: 7px;
		}

		.btn-act {
			opacity: .9;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}
</style>
