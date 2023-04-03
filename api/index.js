// const header = {}

const httpRequest = {
	get(url, data, header = {}, dataType){
		return new Promise((resolve, reject) => {
			uni.request({
				url,
				data,
				header,
				method: 'GET',
				success(res){
					resolve(res.data);
				},
				fail(){
					reject();
				}
			})
		})
	},
	post(url, data, header = {}, dataType){
		return new Promise((resolve, reject) => {
			uni.request({
				url,
				data,
				header,
				method: 'POST',
				success(res){
					resolve(res);
				},
				fail(){
					reject();
				}
			})
		})
	}
}


export default httpRequest;