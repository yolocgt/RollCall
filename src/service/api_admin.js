// 引入axios模块
import axios from 'axios';

// 把所有的admin请求都封装到这个文件中
export default {
	/**
	 * @description 根据页码获取所有的管理员数据
	 * @author CGT
	 * @param {any} page 页码
	 * @param {any} word
	 * @param {function} callback 回调函数
	 */
	getDataByPage(page,word, callback) {
		axios.get(`${global.ApiUrl}/admins?word=${word}&page=${page}`)
			.then((res) => {
			console.log('回调函数。。');
			console.log(res);
			callback(res.data);
		}).catch((err) => {
			console.log(err);
		})
	},
	// 所有数据
	getData(callback) {
		axios.get(`${global.ApiUrl}/all_admin`)
		.then((res) => {
			callback(res.data);
		}).catch((err) => {
			console.log(err);
		})
	},
	// 保存
	save(data, callback) {
		axios.post(`${global.ApiUrl}/admin`, data)
		.then((res) => {
			callback(res.data);
		})
	},
	// 删除
	deleteById(id, callback) {
		axios.delete(`${global.ApiUrl}/admin/${id}`)
		.then((res) => {
			callback(res.data);
		})
	}
}