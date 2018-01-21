// 引入c_Api模块
import c_Api from './api_common';

// 把所有的axios请求都封装到这个文件中

// 创建axios请求
var ApiAdmin = new c_Api('admin');
var ApiCourse = new c_Api('course');

// 导出
export { ApiAdmin, ApiCourse }