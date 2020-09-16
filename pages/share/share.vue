<template>
	<div class="box">
		<canvas  style="width: 200px; height: 200px;" canvas-id="myQrcode"></canvas>
	</div>
</template>

<script>
	import drawQrcode from '@/static/js/weapp-qrcode.js'
	export default{
		methods:{
			drawQrcode(){
				drawQrcode({
				  width: 200,
				  height: 200,
				  canvasId: 'myQrcode',
				  text: '/page/home/home',
				  ctx: wx.createCanvasContext('myQrcode'),
				  // image: {
				  //     imageResource: '../../static/img/logo.png',
				  //     dx: 70,
				  //     dy: 70,
				  //     dWidth: 60,
				  //     dHeight: 60
				  //   },
				})
			}
		},
		onLoad(){
			this.drawQrcode()
		}
	}
</script>
<style lang="less" scoped>
	.box{
		width: 100%;
		height: 100vh;
		background-color: skyblue;
	}
</style>