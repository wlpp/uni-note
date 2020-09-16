<template>
	<div class="text-note">
		<input type="text" placeholder="标题" v-model="title" />
		<textarea placeholder="随便写写" maxlength="5000" auto-height v-model="content" />
		<view class="submit" hover-class="btn-act" @click="handleNote">{{!paramsId ?'确定创建':'确定更新'}}</view>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				title:'',
				content:'',
				paramsId:null
			}
		},
		methods:{
			handleNote(){
				const app = getApp();
				if (this.title === '') {
					uni.showToast({
						title: '标题不能为空',
						icon: 'none',
					});
					return;
				}
				if (this.content === '') {
					uni.showToast({
						title: '内容不能为空',
						icon: 'none',
					});
					return;
				}
				uni.showLoading({
					title: '笔记提交中'
				})
				if(!this.paramsId){
					uniCloud.callFunction({
						name:'addNote',
						data:{
							title:this.title,
							content:this.content,
							mkdirId:app.globalData.id,
							dateTime:new Date().getTime()
						}
					}).then((res) => {
						uni.hideLoading()
						uni.showToast({
							title: '提交成功'
						});
						uni.navigateBack()
					}).catch((err) => {
						uni.hideLoading()
						uni.showToast({
							title: '提交失败',
							icon: 'none',
						});
						console.error(err)
					})
				}else{
					uniCloud.callFunction({
						name:'updateNote',
						data:{
							id:this.paramsId,
							title:this.title,
							content:this.content,
							dateTime:new Date().getTime()
						}
					}).then((res) => {
						uni.hideLoading()
						uni.showToast({
							title: '提交成功'
						});
						uni.navigateBack()
					}).catch((err) => {
						uni.hideLoading()
						uni.showToast({
							title: '提交失败',
							icon: 'none',
						});
						console.error(err)
					})
				}
				
			},
			getNote(){
				if(!this.paramsId) return;
				uni.showLoading({
					title: '笔记加载中'
				})
				uniCloud.callFunction({
					name: 'getNote',
					data: {
						_id: this.paramsId
					}
				}).then(res => {
					uni.hideLoading()
					this.title = res.result.data[0].title
					this.content = res.result.data[0].content
				})
			}
		
		},
		onLoad(option){
			this.paramsId = option.id
			this.getNote()
		}
	}
</script>

<style lang="less">
	.text-note{
		padding: 30rpx 30rpx 80rpx;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		input{
			margin-bottom: 20rpx;
			padding: 10rpx 0;
			border-bottom: 1rpx solid;
		}
		textarea{
			display: block;
			width: 100%;
		}
		.submit{
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
		.btn-act{
			opacity: .9;
		}
	}
</style>
