<template>
	<div class="mkdir">
		<div class="option">
			<i class="iconfont icon-logo"></i>
			<div class="name type">
				<div class="title">笔记本名称：</div>
				<input type="text" v-model="name" />
			</div>
			<div class="icon type">
				<div class="title">选择图标：</div>
				<div class="select-box">
					<i :class="'iconfont icon-' + name" :style="{'border':(name===icon ? '5rpx solid #fff':'')}" v-for="(name,index) in iconList"
					 :key="index" @click="selectType(0,name)"></i>
				</div>
			</div>
			<div class="color type">
				<div class="title">选择颜色：</div>
				<div class="select-box">
					<!-- 'backgroundColor': name, -->
					<i :style="{'backgroundColor': name, 'border':(name===color ? '5rpx solid #fff':'')}" v-for="(name,index) in colorList"
					 :key="index" @click="selectType(1,name)"></i>
				</div>
			</div>
		</div>
		<view class="submit" @click="handleSubmit" hover-class="btn-act">确定提交</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				icon: 'shuben',
				color: '#25af7b',
				iconList: ['bijiben','tuwen','weizhidingwei','tupian','shijianlishi', 'shebei',  'gengduo'],
				colorList: ['#25af7b', '#1a1a1a', '#d49b7d', '#314f6d', '#37424d', '#404b76', '#21a2f5', '#254989']
			};
		},
		methods: {
			handleSubmit() {
				const app = getApp()
				if (this.name === '') {
					uni.showToast({
						title: '名称不能为空',
						icon: 'none',
					});
					return;
				}
				uni.showLoading({
					title: '目录提交中'
				})
				uniCloud.callFunction({
					name: 'addMkdir',
					data: {
						name: this.name,
						icon: this.icon,
						color: this.color,
						openid:app.globalData.openid,
						dateTime: new Date().getTime()
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
			},
			selectType(type, name) {
				type === 0 ? this.icon = name : this.color = name
			}
		},
		onShow() {}
	}
</script>

<style lang="less">
	@import url('./mkdir.less');
</style>
