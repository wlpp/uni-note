<template>
	<div class="cover">
		<div class="cover_box">
			<i :class="'iconfont icon-'+ (cover && cover.icon)"></i>
			<div class="title">{{cover&&cover.name}}</div>
			<div class="qty">
				已使用：<span>{{noteList.length}}</span>/100个
			</div>
			<div class="btn">
				<view class="look" :style="{'backgroundColor':(cover&&cover.color)}" hover-class="active" @click="open">笔记目录</view>
				<view class="add" hover-class="active" @click="toAdd">创建笔记</view>
			</div>
		</div>
		<lee-popup @close="close" ref="popup" type="left" width="636rpx">
			<view class="strip">
				<i class="iconfont icon-zhuye"></i>
				<span>笔记本封面</span>
			</view>
			<view class="strip" hover-class="active" v-for="(item,index) in noteList" :key="index" @click="toEdit(0,item._id)">
				<i :class="'iconfont icon-'+ (cover && cover.icon)"></i>
				<span>{{item.title}}</span>
				<i class="iconfont icon-right"></i>
			</view>
		</lee-popup>
		<i class="iconfont icon-youjiantou" v-if="back" @click="close"></i>
	</div>
</template>

<script>
	import LeePopup from '@/components/lee-popup/lee-popup.vue'
	export default {
		components: {
			LeePopup
		},
		data() {
			return {
				cover: null,
				back: false,
				paramsId: null,
				noteList: [],
				timer:null
			};
		},
		methods: {
			toAdd() {
				uni.navigateTo({
					url: '/pages/note/add'
				})
			},
			toEdit(type, id) {
				this.$refs.popup.close()
				this.back = false
				this.timer = setTimeout(()=>{
					switch (type) {
						case 0:
							uni.navigateTo({
								url: '/pages/note/text?id='+ id
							})
							break;
						default:
							break;
					}
				},1000)
			},
			open() {
				this.$refs.popup.open()
				this.back = true
			},
			close() {
				this.$refs.popup.close()
				this.back = false
			},
			getCover() {
				var app = getApp();
				uniCloud.callFunction({
					name: 'getCover',
					data: {
						_id: app.globalData.id
					}
				}).then(res => {
					uni.hideLoading()
					this.cover = res.result.data[0]
				})
			},
			getNotes() {
				var app = getApp();
				uni.showLoading({
					title: '笔记加载中'
				})
				uniCloud.callFunction({
					name: 'getNote',
					data: {
						mkdirId: app.globalData.id
					}
				}).then(res => {
					uni.hideLoading()
					this.noteList = res.result.data.sort((a, b) => {
						return b.dateTime - a.dateTime
					})
				})
			}
		},
		onLoad(option) {
			var app = getApp();
			app.globalData.id = option.id
		},
		onShow(){
			this.getCover()
			this.getNotes()
		},
		destroyed(){
			clearTimeout(this.timer)
		}
	}
</script>

<style lang="less">
	@import url('./cover.less');
</style>
