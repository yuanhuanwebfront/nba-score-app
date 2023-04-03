<template>
	<view class="game-stats-area">

		<view class="team-tab">
			<view class="tab-item" :class="{active: teamType == 'home'}" @click="setTeam('home')">{{ homeTeam.profile ? homeTeam.profile.name : '-' }}</view>
			<view class="tab-item" :class="{active: teamType == 'away'}" @click="setTeam('away')">{{ awayTeam.profile ? awayTeam.profile.name : '-' }}</view>
		</view>


		<view class="stats-table">
			<view class="name-column name">
				<view class="name-header">姓名</view>
				<view class="name-text" v-for="(item, idx) in nameList" :key="idx">{{ item.name + ' - ' + item.score}}</view>
			</view>
			<!-- 可以横向滚动的区域 -->
			<scroll-view scroll-x class="data-area">
				<view class="inner">
					<view class="common-column">
						<view class="name-header">时间</view>
						<view class="name-text center" v-for="(item, idx) in timeList" :key="idx">{{ item }}</view>
					</view>
					<view class="common-column">
						<view class="name-header">得分</view>
						<view class="name-text center" v-for="(item, idx) in scoreList" :key="idx">{{ item }}</view>
					</view>
					<view class="common-column">
						<view class="name-header">篮板</view>
						<view class="name-text center" v-for="(item, idx) in reboundList" :key="idx">{{ item }}</view>
					</view>
					<view class="common-column">
						<view class="name-header">助攻</view>
						<view class="name-text center" v-for="(item, idx) in assistList" :key="idx">{{ item }}</view>
					</view>
					<view class="common-column">
						<view class="name-header">投篮</view>
						<view class="name-text center" v-for="(item, idx) in shootList" :key="idx">{{ item }}</view>
					</view>
					<view class="common-column">
						<view class="name-header">三分</view>
						<view class="name-text center" v-for="(item, idx) in threeList" :key="idx">{{ item }}</view>
					</view>
					<view class="common-column">
						<view class="name-header">罚球</view>
						<view class="name-text center" v-for="(item, idx) in freeShootList" :key="idx">{{ item }}</view>
					</view>
					<view class="common-column">
						<view class="name-header">抢断</view>
						<view class="name-text center" v-for="(item, idx) in stealList" :key="idx">{{ item }}</view>
					</view>
					<view class="common-column">
						<view class="name-header">盖帽</view>
						<view class="name-text center" v-for="(item, idx) in blockList" :key="idx">{{ item }}</view>
					</view>
					<view class="common-column">
						<view class="name-header">失误</view>
						<view class="name-text center" v-for="(item, idx) in turnoverList" :key="idx">{{ item }}</view>
					</view>
					<view class="common-column">
						<view class="name-header">犯规</view>
						<view class="name-text center" v-for="(item, idx) in foulList" :key="idx">{{ item }}</view>
					</view>
				</view>
				
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
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
				currentTeam: {},
				teamType: 'home',
				nameList: [],
				timeList: [],
				scoreList: [],
				reboundList: [],
				assistList: [],
				shootList: [],
				threeList: [],
				freeShootList: [],
				stealList: [],
				blockList: [],
				turnoverList: [],
				foulList: []
			}
		},
		created(){
			this.currentTeam = this.homeTeam;
			this.formatData();
		},
		methods: {
			setTeam(type){
				this.teamType = type;
				this.currentTeam = this[`${type}Team`];
				this.formatData();
			},
			formatNumber(number){
				return number >= 10 ? number : '0' + number;
			},
			formatData(){
				let gamers = this.currentTeam.gamePlayers;
				// 名称列表
				this.nameList = gamers.map(item => {
					return {
						name: item.profile.displayName.length > 6 ? item.profile.lastName : item.profile.displayName,
						score: parseFloat(item.statTotal.points + item.statTotal.rebs * 1.2 + item.statTotal.assists * 1.5 + item.statTotal.steals * 3 + item.statTotal.blocks * 3 - item.statTotal.turnovers).toFixed(1)
					}
				});
				// 时间列表
				this.timeList = gamers.map(item => {
					return `${this.formatNumber(item.statTotal.mins)}:${this.formatNumber(item.statTotal.secs)}`
				})
				// 得分列表
				this.scoreList = gamers.map(item => {
					return item.statTotal.points;
				})
				// 篮板列表
				this.reboundList = gamers.map(item => {
					return `${item.statTotal.rebs}${item.statTotal.offRebs > 0 ? ' (' + item.statTotal.offRebs + '前板' + ')' : ''}`;
				})
				// 助攻列表
				this.assistList = gamers.map(item => {
					return item.statTotal.assists;
				})
				// 投篮列表
				this.shootList = gamers.map(item => {
					return `${item.statTotal.fgm}-${item.statTotal.fga}`;
				})
				// 三分列表
				this.threeList = gamers.map(item => {
					return `${item.statTotal.tpm}-${item.statTotal.tpa}`;
				})
				// 三分列表
				this.freeShootList = gamers.map(item => {
					return `${item.statTotal.ftm}-${item.statTotal.fta}`;
				})
				// 抢断列表
				this.stealList = gamers.map(item => {
					return item.statTotal.steals;
				})
				// 盖帽列表
				this.blockList = gamers.map(item => {
					return item.statTotal.blocks;
				})
				// 失误列表
				this.turnoverList = gamers.map(item => {
					return item.statTotal.turnovers;
				})
				// 犯规列表
				this.foulList = gamers.map(item => {
					return item.statTotal.fouls;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.game-stats-area{
		padding: 24rpx;
		.stats-table{
			display: flex;
			border-bottom: 1px solid #efefef;
			.name-header{
				height: 72rpx;
				line-height: 72rpx;
				text-align: center;
				background-color: #efefef;
			}
			.name-text{
				font-size: 22rpx;
				font-weight: normal;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				height: 56rpx;
				line-height: 56rpx;
				text-indent: 8rpx;
				&:nth-child(2n-1){
					background-color: #f1f1f1;
				}
				&.center{
					text-align: center;
				}
			}
			.name-column{
				width: 140rpx;
				flex-shrink: 0;
				font-weight: bold;
				&.name{
					width: 200rpx;
				}
			}
			.data-area{
				
				width: calc(100% - 160rpx);
				.inner{
					display: flex;
					.common-column{
						width: 130rpx;
						flex-shrink: 0;
						font-weight: bold;
					}
				}
				
			}
		}
	}
	.team-tab{
		display: flex;
		border-radius: 40rpx;
		overflow: hidden;
		border: 1px solid #efefef;
		margin-bottom: 32rpx;
		.tab-item{
			width: 50%;
			flex-shrink: 0;
			text-align: center;
			height: 56rpx;
			line-height: 56rpx;
			&.active{
				background-color: #1c428a;
				color: #fff;
			}
		}
	}
</style>