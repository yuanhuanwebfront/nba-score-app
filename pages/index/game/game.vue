<template>
	<view class="game-area">
		<view class="flex-box tab-area">
			<view class="tab-item active">技术统计</view>
			<view class="tab-item">文字直播</view>
			<view class="tab-item">球队对比</view>
		</view>
		
		<view>
			<StatsView :homeTeam="homeTeam" :awayTeam="awayTeam"></StatsView>
			
			<GameStats v-if="showPage" :homeTeam="homeTeam" :awayTeam="awayTeam"></GameStats>
		</view>
	</view>
</template>

<script>
	import { getGameStatsApi } from '@/api/home.js';
	
	import StatsView from './StatsView.vue';
	import GameStats from './GameStats.vue';
	
	export default {
		components: {
			StatsView,
			GameStats
		},
		data(){
			return {
				homeTeam: {},
				awayTeam: {},
				showPage: false
			}
		},
		onLoad(options){
			this.getStats(options);
		},
		methods: {
			getStats({gameId}){
				getGameStatsApi({gameId}).then(res => {
					let data = res.payload;
					
					this.homeTeam = data.homeTeam;
					this.awayTeam = data.awayTeam;
					
					this.showPage = true;
					// 设置页面标题
				})
			},
			setDetail(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-item{
		flex-grow: 1;
		height: 96rpx;
		line-height: 96rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		&.active{
			border-bottom: 3px solid #187fe9;
		}
	}
</style>