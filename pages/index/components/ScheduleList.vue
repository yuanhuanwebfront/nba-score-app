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
					<!-- 已经结束的比赛 -->
					<view v-if="game.boxscore.status == 3" class="finish-score">
						<text class="left-text score" :class="{lose: game.boxscore.homeScore < game.boxscore.awayScore}">{{game.boxscore.homeScore}}</text>
						<text class="center-text">已结束</text> 
						<text class="right-text score" :class="{lose: game.boxscore.homeScore > game.boxscore.awayScore}">{{game.boxscore.awayScore}}</text>
					</view>
					<!-- 待开始 -->
					<view v-else-if="game.boxscore.status == 1">
						<view class="clock-text">{{formatTime(Number(game.profile.utcMillis))}}</view>
						<view class="order-btn" @click.stop="subscibeGame(game)">订阅比赛</view>
					</view>
					<view v-else>
						<view class="status-text">{{game.boxscore.status == 1 ? formatTime(Number(game.profile.utcMillis)) : game.boxscore.statusDesc}}</view>
					</view>	
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
			},
			subscibeGame(game){
				uni.showToast({
					icon: 'none',
					title: '订阅成功，比赛开始前15分钟会通知您。'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.schedule-list-area{
		margin-top: 36rpx;
		.schedule-item{
			.title{
				position: relative;
				font-size: 26rpx;
				padding-left: 24rpx;
				margin-bottom: 16rpx;
				margin-top: 24rpx;
				&::before{
					content: "";
					position: absolute;
					left: 0;
					width: 6rpx;
					height: 70%;
					top: 15%;
					border-radius: 8rpx;
					background-color: #3c5cf9;
				}
			}
			.game-item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 36rpx 42rpx;
				background-color: #fff;
				border-bottom: 1px solid #f1f1f1;
				margin-bottom: 24rpx;
				border-radius: 24rpx;
				.team{
					text-align: center;
					font-size: 24rpx;
				}
				image{
					display: block;
					width: 84rpx;
					height: 84rpx;
					margin-bottom: 18rpx;
				}
				&:last-child{
					border-bottom: none;
					margin-bottom: 0;
				}
				.finish-score{
					display: flex;
					align-items: center;
					.score{
						line-height: 48rpx;
						font-family: meslo;
						color: #080a1f;
						font-weight: bold;
						width: 100rpx;
						&.lose{
							color: #bbbcbf;
						}
					}
					.center-text{
						font-size: 26rpx;
						color: #d1d1db;
						font-weight: normal;
						letter-spacing: 0;
					}
				}
				.clock-text{
					font-size: 32rpx;
					font-family: meslo;
				}
				.order-btn{
					font-size: 24rpx;
					color: #fff;
					background-color: #3c5df8;
					padding: 4rpx 0;
					border-radius: 20rpx;
					margin-top: 8rpx;
				}
			}
			.center-text{
				min-width: 160rpx;
				font-weight: bold;
				font-size: 48rpx;
				text-align: center;
				.status-text{
					font-size: 26rpx;
					font-weight: normal;
				}
			}
		}
	}
</style>