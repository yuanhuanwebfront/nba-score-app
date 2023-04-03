<template>
	<view class="schedule-list-area">
		<view v-for="(item, idx) in listData" :key="idx" class="schedule-item">
			<view class="title">{{ formatDate(Number(item.utcMillis)) }} 共有 {{item.gameCount}} 场比赛</view>
			<view v-for="(game, i) in item.games" :key="i" class="game-item" @click="goGamePage(game)">
				<view class="team home-team">
					<view>
						<image :src="`https://res.nba.cn/static/images/teams-logo/${game.homeTeam.profile.code == 'sixers' ? '76ers' : game.homeTeam.profile.code}.png`"></image>
						<text class="name">
							<text>{{game.homeTeam.profile.name}}</text>
						</text>
					</view>
				</view>
				<view class="center-text">
					<view>{{game.boxscore.homeScore}} - {{game.boxscore.awayScore}}</view>
					<view class="status-text">{{game.boxscore.status == 1 ? formatTime(Number(game.profile.utcMillis)) : game.boxscore.statusDesc}}</view>
				</view>
				<view class="team away-team">
					<view>
						<image :src="`https://res.nba.cn/static/images/teams-logo/${game.awayTeam.profile.code == 'sixers' ? '76ers' : game.awayTeam.profile.code}.png`"></image>
						<text class="name">
							<text>{{game.awayTeam.profile.name}}</text>
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	
	export default {
		props: {
			listData: {
				type: Array,
				default: () => ([])
			}
		},
		methods: {
			formatDate(time){
				return dayjs(time).format('YYYY-MM-DD');
			},
			formatTime(time){
				return dayjs(time).format('HH:mm');
			},
			goGamePage(game){
				uni.navigateTo({
					url: `/pages/index/game/game?gameId=${game.profile.gameId}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.schedule-list-area{
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		padding: 0 24rpx;
		margin-top: 36rpx;
		.schedule-item{
			padding: 24rpx 12rpx;
			.title{
				font-size: 32rpx;
				font-weight: bold;
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #ccc;
				margin-bottom: 24rpx;
			}
			.game-item{
				display: flex;
				align-items: center;
				justify-content: center;
				padding-bottom: 32rpx;
				border-bottom: 1px solid #f1f1f1;
				margin-bottom: 24rpx;
				.team{
					text-align: center;
					font-size: 24rpx;
				}
				image{
					display: block;
					width: 84rpx;
					height: 84rpx;
					margin-bottom: 8rpx;
				}
				&:last-child{
					border-bottom: none;
					margin-bottom: 0;
					padding-bottom: 0;
				}
			}
			.center-text{
				min-width: 160rpx;
				padding: 0 96rpx;
				font-weight: bold;
				font-size: 42rpx;
				text-align: center;
				.status-text{
					font-size: 26rpx;
					font-weight: normal;
				}
			}
		}
	}
</style>