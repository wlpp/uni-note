<template>
	<div class="home">
		<div class="home_img">
			<div v-if="canIUse">
				<img :src="avatarUrl && avatarUrl" alt="">
			</div>
			<div v-else>请升级微信版本</div>
		</div>
		<scroll-view scroll-y="true" class="scroll-view">
			<div class="home_catalog">
				<div class="item" v-for="(item,index) in mkdirList" :key="index" :style="{'backgroundColor': item.color}" @click="toCover(item._id)">
					<i :class="'iconfont icon-'+item.icon"></i>
					<div class="name">{{item.name}}</div>
					<div class="qty">总共：{{item.qty || 0}} </div>
					<div class="mask" v-if="remove" >
						<i class="iconfont icon-shanchu" @click.stop="removeMkdir(item._id)"></i>
					</div>
				</div>
			</div>
		</scroll-view>
		<div class="home_option">
			<i class="iconfont icon-jia" @click="toMkdir"></i>
			<i class="iconfont" :class="!remove ? 'icon-shanchu' :'icon-chexiao'" @click="remove=!remove"></i>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mkdirList: [],
				remove: false,
				canIUse: uni.canIUse('button.open-type.getUserInfo'), //判断小程序的API，回调，参数，组件等是否在当前版本可用。
				avatarUrl:null
			};
		},
		methods: {
			toMkdir() {
				this.remove = false
				uni.navigateTo({
					url: '/pages/mkdir/mkdir'
				})
			},
			toCover(id) {
				this.remove = false
				uni.navigateTo({
					url: '/pages/cover/cover?id=' + id
				})
			},
			getMkdirList() {
				const _this = this
				const app = getApp()
				uniCloud.callFunction({
					name: 'getMkdirs',
					data:{
						openid:app.globalData.openid
					}
				}).then(res => {
					uni.hideLoading()
					if (res.result.data.length <= 0)(_this.remove = false)
					this.mkdirList = res.result.data.sort((a, b) => {
						return b.dateTime - a.dateTime
					})
				})
			},
			removeMkdir(_id) {
				const _this = this
				uni.showModal({
					content: '删除目录及相关笔记，删除后将无法恢复！',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '目录删除中'
							})
							uniCloud.callFunction({
								name: 'removeMkdir',
								data: {
									_id
								}
							}).then(res => {
								uni.hideLoading()
								uni.showToast({
									title: '删除成功'
								})
								_this.getMkdirList()
							}).catch(err => {
								uni.hideLoading()
								uni.showToast({
									title: '删除失败',
									icon: 'none'
								})
								console.error(err)
							})
						}
					}
				});

			},
			getSetting() {
				uni.showLoading({
					title: '笔记加载中'
				})
				var that = this;
				// 查看是否授权
				uni.getSetting({
					success: function(res) {
						if (res.authSetting['scope.userInfo']) {
							uni.getUserInfo({
								success: function(res) {
									// 用户授权成功后，调用微信的 wx.login 接口，从而获取code
									// 再将code传给后台获取openid
									// 前端也可以用微信自带请求获取openid（但不允许上线）
									that.avatarUrl = res.userInfo.avatarUrl
									uni.login({
										success: res => {
											uniCloud.callFunction({
												name:'getOpenid',
												data:{
													code:res.code
												}
											}).then(res=>{
												console.log(res);
												const app = getApp()
												app.globalData.openid = res.result.data.openid
												that.getMkdirList()
											}).catch(err=>{
												console.log(err);
											})
										}
									});
								}
							});
						} else {
							// 用户没有授权
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					},
				})
			},
		},
		onShow() {
			this.getSetting()
		}
	}
</script>

<style lang="less">
	@import url('./home.less');
</style>
