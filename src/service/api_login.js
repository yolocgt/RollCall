import axios from 'axios';

// 把所有登录请求封装于此
export default {
	// 登录
	login(data, role, callback) {
		axios.post(`${global.ApiUrl}/${role}/login`, data)
			.then((res) => {
				callback(res.data);
			})
	}

}	