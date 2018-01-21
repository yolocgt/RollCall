// 引入axios模块
import axios from 'axios';

export default {
	// 添加
	save(data, callback) {
		axios.post(`${global.ApiUrl}/faculty`,data).then((res) => {
			callback(res.data);
		})
	}
}