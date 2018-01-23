import axios from 'axios';

// 把所有登录请求封装于此
export default {
	// 登录
	login(data, callback) {
		axios.post(`${global.ApiUrl}/${this.mName}`, data)
			.then((res) => {
				callback(res.data);
			})
	}

}	