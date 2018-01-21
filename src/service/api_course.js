import axios from './api_common';



// 把所有的course请求都封装到这个文件中
class ApiCourse  {
	constructor() {
		this.mName = mName;
	}
	/**
	 * @description 根据页码获取所有的管理员数据
	 * @author CGT
	 * @param {any} page 页码
	 * @param {any} word
	 * @param {function} callback 回调函数
	 */
	getDataByPage(page, word, callback) {
		axios.get(`${global.ApiUrl}/courses?word=${word}&page=${page}`)
			.then((res) => {
				// console.log('回调函数。。');
				// 获取的分页数据
				console.log(res);
				callback(res.data);
			}).catch((err) => {
				console.log(err);
			})
	};
	// 所有数据
	getData(callback) {
		axios.get(`${global.ApiUrl}/all_course`)
			.then((res) => {
				callback(res.data);
			}).catch((err) => {
				console.log(err);
			})
	};
	// 保存
	save(data, callback) {
		axios.post(`${global.ApiUrl}/course`, data)
			.then((res) => {
				callback(res.data);
			})
	};
	// 修改
	update(id, data, callback) {
		axios.put(`${global.ApiUrl}/course/${id}`, data)
			.then((res) => {
				callback(res.data);
			})
	};
	// 删除
	deleteById(id, callback) {
		axios.delete(`${global.ApiUrl}/course/${id}`)
			.then((res) => {
				callback(res.data);
			})
	};
	// 查找
	getDataById(id, callback) {
		axios.get(`${global.ApiUrl}/course/${id}`)
			.then((res) => {
				callback(res.data);
			})
	}
}
export { ApiCourse}