<template>
	<view class="home-area">
		<HomeBanner></HomeBanner>
		<ScheduleList :listData="scheduleList"></ScheduleList>
	</view>
</template>

<script>
	import { getScheduleApi } from '@/api/home';
	
	import ScheduleList from  './components/ScheduleList.vue';
	import HomeBanner from './components/HomeBanner.vue';
	
	export default {
		components: {
			ScheduleList,
			HomeBanner
		},
		onLoad() {
			this.getScheduleList();
			
			setInterval(() => {
				this.getScheduleList();
			}, 10000)
		},
		onPullDownRefresh(){
			this.getScheduleList(true);
		},
		data(){
			return {
				scheduleList: []
			}
		},
		methods: {
			getScheduleList(isRefresh){
				getScheduleApi().then(res => {
					this.scheduleList = res.payload.dates || [];
					if(isRefresh){
						uni.showToast({
							title: '刷新成功'
						})
					}
				}).finally(() => {
					uni.stopPullDownRefresh();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-area{
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f4f8;
		padding: 32rpx;
		box-sizing: border-box;
		padding-top: 0	
	}
</style>
