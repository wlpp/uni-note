<template>
	<div>
	
		<canvas canvas-id="shareCanvas" :style="{'width':'375px','height':height+'px'}"></canvas>
		<p>{{content}}</p>
		<button @click="copy">点击复制</button>
		<button open-type="share">点击转发</button>
		<button>点击分享二维码</button>
		<button type="default" @click="saveImages">点击生成图片</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				content: '我是内容哦 ',
				height:600
			}
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: this.content,
					success: function() {
						console.log('success');
					}
				});
			},
			getSystemInfo(){
				const _this = this
				uni.getSystemInfo({
				  success: function(res) {
					  _this.height = res.windowHeight
				  }
				})
			},
			getShareCanvas() {
				// const wxGetImageInfo = uni.promisify(wx.getImageInfo)
				const _this = this
				Promise.all([
					wx.getImageInfo({
						src: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-note-cloud/7ba42d70-f7e5-11ea-8a36-ebb87efcf8c0.jpg'
					}),
					wx.getImageInfo({
						src: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-note-cloud/3645dbe0-f725-11ea-9dfb-6da8e309e0d8.jpg'
					})
				]).then(res => {
					const ctx = wx.createCanvasContext('shareCanvas')

					// 底图
					ctx.drawImage(res[0].path, 0, 0, 375, _this.height)

					// 作者名称
					ctx.setTextAlign('center') // 文字居中
					ctx.setFillStyle('#000000') // 文字颜色：黑色
					ctx.setFontSize(22) // 文字字号：22px
					ctx.fillText('作者： 一斤代码', 375 / 2, 500)

					// 小程序码
					const qrImgSize = 146
					ctx.drawImage(res[1].path, (375 - qrImgSize) / 2, 230, qrImgSize, qrImgSize)
					ctx.stroke()
					ctx.draw()
				})
			},
			saveImages(){
				// const wxCanvasToTempFilePath = promisify(wx.canvasToTempFilePath)
				// const wxSaveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum)
				
				uni.canvasToTempFilePath({
				    canvasId: 'shareCanvas'
				}, this).then(res => {
					console.log(res,'111');
				    return uni.saveImageToPhotosAlbum({
				        filePath: res[1].tempFilePath
				    })
				}).then(res => {
					console.log(res);
				    uni.showToast({
				        title: '已保存到相册'
				    })
				}).catch(err => {
					console.log(err,'err');
				})
			}
		},
		onShareAppMessage() {
			return {
				title: '自定义分享标题',
				path: '/pages/note/read',
				// imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
				bgImgUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png'
			}
		},
		onLoad() {
			this.getSystemInfo()
			this.getShareCanvas()
		}
	}
</script>

<style>
</style>
