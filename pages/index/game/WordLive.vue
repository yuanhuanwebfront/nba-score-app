<template>
	<view class="word-live-container">
			
		
		<view class="flex-box tab-header">
			<view class="tab-item" :class="{active: tab.id == currentTab}" @click="changeTab(tab)"
				v-for="tab in periodList" :key="tab.id">{{tab.label}}</view>
		</view>
		
		<view>
			<view class="flex-box data-item" v-for="(data, idx) in currentList" :key="idx">
				<view class="time">
					<view>{{data.gameClock}}</view>
					<view class="score">
						<text class="home-team" :style="{backgroundImage: `url(https://res.nba.cn/static/images/teams-logo/${homeTeam.profile.code}.png)`}">{{data.homeScore}}</text>
						<text class="devide">-</text>
						<text class="away-home" :style="{backgroundImage: `url(https://res.nba.cn/static/images/teams-logo/${awayTeam.profile.code}.png)`}">{{data.awayScore}}</text>
					</view>
				</view>
				<view class="desc">{{data._desc}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getGameLiveDataApi } from '@/api/home';
	
	export default {
		props: {
			options: {
				type: Object,
				default: () => ({})
			},
			homeTeam: {
				type: Object,
				default: () => ({})
			},
			awayTeam: {
				type: Object,
				default: () => ({})
			}
		},
		data(){
			return {
				periodList: [
					{label: '第一节', id: 1},
					{label: '第二节', id: 2},
					{label: '第三节', id: 3},
					{label: '第四节', id: 4},
				],
				currentTab: 1,
				currentList: []
			}
		},
		created(){
			this.getLiveData()
			console.log(this.homeTeam)
		},
		methods: {
			changeTab(tab){
				this.currentTab = tab.id;
				this.getLiveData()
			},
			getLiveData(){
				let params = {
					gameId: this.options.gameId,
					period: this.currentTab
				}
				getGameLiveDataApi(params).then(res => {
					let data = res.payload.playByPlays[0].events;
					
					data.forEach(item => {
						item._desc = item.description.indexOf(']') > -1 ? item.description.split(']')[1] : item.description;
					})
					
					this.currentList = data;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.word-live-container{
		padding: 24rpx 32rpx;
		.tab-header{
			border: 1px solid #e1e1e1;
			border-radius: 24rpx;
			overflow: hidden;
			margin-bottom: 36rpx;
			.tab-item{
				height: 48rpx;
				line-height: 48rpx;
				font-size: 28rpx;
				flex-grow: 1;
				text-align: center;
				border-right: 1px solid #e1e1e1;
				&.active{
					border-right-color: #fff;
					background-color: #1c428a;
					color: #fff;
				}
				&:last-child{
					border-right: none;
				}
			}
		}
		.data-item{
			font-size: 26rpx;
			margin-bottom: 24rpx;
			border-bottom: 1px solid #f0f0f0;
			padding-bottom: 12rpx;
			.time{
				width: 160rpx;
				flex-shrink: 0;
				text-align: center;
				margin-right: 16rpx;
			}
			.score{
				color: #1c428a;
				.devide{
					padding: 0 4rpx;
				}
				.home-team, .away-home{
					padding-left: 32rpx;
					background-size: 28rpx 28rpx;
					background-repeat: no-repeat;
					background-position: left;
				}
				.away-home{
					padding-left: 0;
					padding-right: 32rpx;
					background-position: right;
				}
			}
		}
	}
</style>