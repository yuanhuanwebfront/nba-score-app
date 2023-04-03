<template>
	<view class="banner-area">
		<swiper autoplay class="swiper-container" :style="{height: imgHeight}">
			<swiper-item class="swiper-item" v-for="(swiper, idx) in listData" :key="swiper.news_id">
				<image class="news-img" mode="widthFix" :src="swiper.thumbnail_2x"></image>
				<view class="title-area">{{swiper.title}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { getHomeNewsApi } from '@/api/home.js';
	
	export default {
		data(){
			return {
				listData: [],
				imgHeight: '360rpx',
				hasGetHeight: false
			}
		},
		created(){
			this.getNews();
		},
		methods: {
			getNews(){
				getHomeNewsApi().then(res => {
					this.listData = res.data;
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-container{
		overflow: hidden;
	}
	.swiper-item{
		position: relative;
		height: 100%;
		border-radius: 8rpx;
		.title-area{
			position: absolute;
			z-index: 1000;
			font-size: 20rpx;
			color: #fff;
			bottom: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.7);
			width: 100%;
			height: 48rpx;
			line-height: 48rpx;
			text-align: right;
			padding-right: 24rpx;
			box-sizing: border-box;
			border-bottom-left-radius: 16rpx;
			border-bottom-right-radius: 16rpx;
		}
	}
	.news-img{
		width: 100%;
	}
	/deep/ .uni-swiper-dots{
		left: 96rpx;
	}
</style>