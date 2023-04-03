<template>
	<view class="stats-view-container">
		<view class="flex-box header">
			<view class="cell-item first">球队</view>
			<view class="cell-item">第一节</view>
			<view class="cell-item">第二节</view>
			<view class="cell-item">第三节</view>
			<view class="cell-item">第四节</view>
			<view class="cell-item total">合计</view>
		</view>
		<view class="flex-box content home-team">
			<view class="cell-item first">{{ homeTeam.profile ? homeTeam.profile.name : '-' }}</view>
			<view class="cell-item">{{homeTeam.score ? homeTeam.score.q1Score : '-'}}</view>
			<view class="cell-item">{{homeTeam.score ? homeTeam.score.q2Score : '-'}}</view>
			<view class="cell-item">{{homeTeam.score ? homeTeam.score.q3Score : '-'}}</view>
			<view class="cell-item">{{homeTeam.score ? homeTeam.score.q4Score : '-'}}</view>
			<view class="cell-item total">{{homeTeam.score ? homeTeam.score.score : '-'}}</view>
		</view>
		<view class="flex-box content away-team">
			<view class="cell-item first">{{awayTeam.profile ? awayTeam.profile.name : '-'}}</view>
			<view class="cell-item">{{awayTeam.score ? awayTeam.score.q1Score : '-'}}</view>
			<view class="cell-item">{{awayTeam.score ? awayTeam.score.q2Score : '-'}}</view>
			<view class="cell-item">{{awayTeam.score ? awayTeam.score.q3Score : '-'}}</view>
			<view class="cell-item">{{awayTeam.score ? awayTeam.score.q4Score : '-'}}</view>
			<view class="cell-item total">{{awayTeam.score ? awayTeam.score.score : '-'}}</view>
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
		}
	}
</script>

<style lang="scss" scoped>
	.stats-view-container{
		padding: 24rpx;
		font-size: 24rpx;
		padding-bottom: 12rpx;
		.first{
			width: 18%;
			flex-shrink: 0;
		}
		.total{
			width: 14%;
			flex-shrink: 0;
		}
	}
	.cell-item{
		height: 72rpx;
		line-height: 72rpx;
		border-bottom: 1px solid #c1c1c1;
		flex-grow: 1;
		text-align: center;
		width: 16%;
	}
	.header, .content{
		border: 1px solid #c1c1c1;
		border-bottom: none;
		flex-wrap: nowrap;
	}
	.header{
		background-color: #f1f1f1;
	}
	.content{
		border-top: none;
	}
</style>