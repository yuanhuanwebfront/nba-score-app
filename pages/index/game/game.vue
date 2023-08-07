<template>
	<view class="game-area">
		<view class="flex-box tab-area">
			<view v-for="tab in tabs" :key="tab.id" class="tab-item" :class="{active: tab.id == currentTab}"
				@click="currentTab = tab.id">{{tab.label}}</view>
		</view>
		
		<view>
			
			<template v-if="currentTab == 1">
				<StatsView v-if="currentTab == 1" :homeTeam="homeTeam" :awayTeam="awayTeam"></StatsView>
				<GameStats v-if="showPage" :homeTeam="homeTeam" :awayTeam="awayTeam"></GameStats>
			</template>
			
			<template v-if="currentTab == 2 && showPage">
				<WordLive :homeTeam="homeTeam" :awayTeam="awayTeam" :options="options"></WordLive>
			</template>
		</view>
	</view>
</template>

<script>
	import { getGameStatsApi } from '@/api/home.js';
	
	import StatsView from './StatsView.vue';
	import GameStats from './GameStats.vue';
	import WordLive from './WordLive.vue';
	
	export default {
		components: {
			StatsView,
			GameStats,
			WordLive
		},
		data(){
			return {
				tabs: [
					{label: '技术统计', id: 1},
					{label: '文字直播', id: 2},
					{label: '球队对比', id: 3},
				],
				homeTeam: {},
				awayTeam: {},
				showPage: false,
				currentTab: 1,
				liveList: []
			}
		},
		onLoad(options){
			this.options = options;
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