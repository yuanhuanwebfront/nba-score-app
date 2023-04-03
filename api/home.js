import httpRequest from './index.js';

// const 
// 获取首页banner新闻
export const getHomeNewsApi = function(data){
	let params = {
		column_id: 13,
		page_no: 1,
		page_size: 5,
		...data
	};
	return httpRequest.get('https://m.china.nba.cn/cms/v1/news/list', params)
}

// 获取赛程
export const getScheduleApi = function(data){
	return httpRequest.get('https://m.china.nba.cn/stats2/season/schedule.json?countryCode=CN&days=7&locale=zh_CN');
}

// 获取比赛详情
export const getGameStatsApi = function(data){
	return httpRequest.get('https://m.china.nba.cn/stats2/game/snapshot.json?countryCode=CN&locale=zh_CN&tz=%2B8', data);
}