<template>
	<view>
		<view class="tabs">
			<view class="tab-item" :class="{active: currentTab == 0}" @click="chooseEast">东部</view>
			<view class="tab-item" :class="{active: currentTab == 1}" @click="chooseWest">西部</view>
		</view>
		
		<view class="grid-list">
			<view v-for="(team, idx) in currentList" :key="idx" class="team-item">
				<view>
					<image class="team-icon" :src="`https://res.nba.cn/static/images/teams-logo/${team.profile.code == 'sixers' ? '76ers' : team.profile.code}.png`"></image>
					<view>{{team.profile.name}}</view>
					<view class="win">{{team.standings.wins}} - {{team.standings.losses}}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { getSeasonStandingApi } from '@/api/data';
	
	export default {
		data(){
			return {
				tabData: [],
				currentTab: 0,
				eastList: [],
				westList: [],
				currentList: []
			}
		},
		created(){
			this.initStanding()
		},
		methods: {
			initStanding(){
				getSeasonStandingApi().then(res => {
					let group = res.payload.standingGroups,
						eastGroup = group.find(item => item.conference == 'Eastern'),
						westGroup = group.find(item => item.conference == 'Western');

					this.eastList = eastGroup.teams.sort((a, b) => {
						return b.standings.wins - a.standings.wins;
					})
					this.westList = westGroup.teams.sort((a, b) => {
						return b.standings.wins - a.standings.wins;
					})
					
					this.currentList = this.eastList;
				})	
			},
			chooseEast(){
				if(this.currentTab == 0) return;
				this.currentTab = 0;
				this.currentList = this.eastList;
			},
			chooseWest(){
				if(this.currentTab == 1) return;
				this.currentTab = 1;
				this.currentList = this.westList;
			}
		}
	}
</script>

<style scoped lang="scss">
	.tabs{
		display: flex;
	}
	.tab-item{
		height: 100rpx;
		line-height: 100rpx;
		width: 50%;
		border-bottom: 1px solid #dfdfdf;
		text-align: center;
		&.active{
			background-color: #ccc;
		}
	}
	.grid-list{
		display: grid;
		grid-template-columns: 33.33vw 33.33vw 33.33vw;
		grid-template-rows: 33.33vw 33.33vw 33.33vw 33.33vw 33.33vw;
		.team-item{
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			border-bottom: 1px solid #f1f1f1;
			border-right: 1px solid #f1f1f1;
			font-size: 24rpx;
			color: #333;
			font-weight: bold;
			.team-icon{
				width: 120rpx;
				height: 120rpx;
			}
			.win{
				color: #2464b5;
				font-size: 20rpx;
				margin-top: 8rpx;
			}
		}
	}
</style>