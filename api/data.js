import httpRequest from './index.js';

// const 

export const getScheduleApi = function(data){
	return httpRequest.get('https://m.china.nba.cn/stats2/season/schedule.json?countryCode=CN&days=7&locale=zh_CN');
}


export const getSeasonStandingApi = function(data){
	return httpRequest.get('https://m.china.nba.cn/stats2/season/conferencestanding.json?locale=zh_CN');
}