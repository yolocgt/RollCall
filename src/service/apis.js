// 引入c_Api模块
import c_Api from './api_common';

// 把所有的axios请求都封装到这个文件中

// 创建axios请求
var ApiAdmin = new c_Api('admin');				//管理员
var ApiCourse = new c_Api('course');			//课程
var ApiFaculty = new c_Api('faculty');			//学院
var ApiMajor = new c_Api('major');				//专业
var ApiClassInfo = new c_Api('classInfo');		//班级
var ApiStudent = new c_Api('student');			//学生
var ApiCounselor = new c_Api('counselor');		//辅导员
var ApiTeacher = new c_Api('teacher');			//教师
var ApiArrange = new c_Api('arrange');			//排课
var ApiRollcall = new c_Api('rollcall');		//点名
var ApiAbsence = new c_Api('absence');	//请假
// 导出
export {
	ApiAdmin,
	ApiCourse,
	ApiFaculty,
	ApiMajor,
	ApiClassInfo,
	ApiStudent,
	ApiCounselor,
	ApiTeacher,
	ApiArrange,
	ApiRollcall,
	ApiAbsence
}