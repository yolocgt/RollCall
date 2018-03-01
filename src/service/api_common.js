// 引入axios模块
import axios from 'axios';

// 创建axios请求（增删改查）通用方法
export default class c_Api {
	constructor(mName) {
		this.mName = mName;
	}

	// 保存
	save(data, callback) {
		axios.post(`${global.ApiUrl}/${this.mName}`, data)
			.then((res) => {
				callback(res.data);
			})
	};
	// 删除
	deleteById(id, callback) {
		axios.delete(`${global.ApiUrl}/${this.mName}/${id}`)
			.then((res) => {
				callback(res.data);
			})
	};
	// 修改
	update(id, data, callback) {
		axios.put(`${global.ApiUrl}/${this.mName}/${id}`, data)
			.then((res) => {
				callback(res.data);
			})
	};
	// 查找
	getDataById(id, callback) {
		axios.get(`${global.ApiUrl}/${this.mName}/${id}`)
			.then((res) => {
				callback(res.data);
			})
	}

	// 所有数据
	getData(obj,callback) {
		axios.post(`${global.ApiUrl}/all_${this.mName}`,obj)
			.then((res) => {
				callback(res.data);
			}).catch((err) => {
				console.log(err);
			})
	};
	// 模糊查询所有数据
	// getDataByFuzzyquery(obj,callback) {
	// 	axios.post(`${global.ApiUrl}/all_${this.mName}`,obj)
	// 		.then((res) => {
	// 			callback(res.data);
	// 		}).catch((err) => {
	// 			console.log(err);
	// 		})
	// };
	
	/**
	 * @description 根据页码获取所有的管理员数据
	 * @author CGT
	 * @param {any} page 页码
	 * @param {any} word
	 * @param {function} callback 回调函数
	 */
	getDataByPage(obj, callback) {
		console.log('那个筛选的obj：');
		console.log(obj);
		// var obj = { page, word, word2 };
		// axios.get(`${global.ApiUrl}/${this.mName}s?word=${word}&page=${page}`)
		axios.post(`${global.ApiUrl}/${this.mName}s`, obj)
			.then((res) => {
				// console.log('回调函数。。');
				// 获取的分页数据
				console.log(res.data.data);
				callback(res.data);
			}).catch((err) => {
				console.log(err);
			})
	};

	// 判断一个实体是否存在
	isExist(name, callback) {
		axios.get(`${global.ApiUrl}/${this.mName}/exists/${name}`).then((res) => {
			console.log(res.data);
			callback(res.data);
		}).catch((err) => {
			console.log(err);
		})
	}


	// 查询学生数量
	queryStuCount(classidObj, callback) {
		axios.post(`${global.ApiUrl}/${this.mName}/count/`, classidObj).then((res) => {
			console.log(res);
			callback(res);
		}).catch((err) => {
			console.log(err);
		})
	}
}