<template>
	<div class="add-note">
		<view class="type" hover-class="active" @click="toLink('/pages/note/text')">
			<i class="iconfont icon-bijiben"></i>
			<div class="info">
				<div class="title">文字</div>
				<div class="tip">发表一段文字，最多5000字</div>
			</div>
		</view>
		<view class="type" hover-class="active"  @click="toLink('/pages/note/article?id=')">
			<i class="iconfont icon-tuwen"></i>
			<div class="info">
				<div class="title">文章</div>
				<div class="tip">可发表长段文字和图片类型</div>
			</div>
		</view>
		<view class="type" hover-class="active">
			<i class="iconfont icon-tupian"></i>
			<div class="info">
				<div class="title">图片</div>
				<div class="tip">可发表多张图片</div>
			</div>
		</view>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				paramsId:null
			}
		},
		methods:{
			toLink(url){
				uni.navigateTo({
					url
				})
			}
			
		},
	}
</script>

<style lang="less">
.add-note{
	padding:30rpx 30rpx 0;
	.type{
		height: 175rpx;
		background-color: #FFFFFF;
		box-shadow: 2px 2px 10px #cfccca;
		border-radius: 10rpx;
		display: flex;
		justify-items: flex-start;
		align-items: center;
		cursor: pointer;
		margin-bottom: 20rpx;
	}
	.iconfont{
		font-size: 58rpx;
		margin: 0 50rpx;
	}
	.icon-bijiben{
		color: #fa972c;
	}
	.icon-tuwen{
		color: #46a3db;
	}
	.icon-tupian{
		color: #3ebc81;
	}
	
	.title{
		font-size: 26rpx;
		line-height: 45rpx;
	}
	.tip{
		font-size: 22rpx;
		color: #c7c7c7;
	}
	.active{
		background-color: #eee;
	}
}
</style>
