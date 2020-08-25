import request from '@/utils/http'

export function login(login){
	return request({
		url:'/users/login',
		method:'post',
		// params:{"name":user.userName,"pwd":user.userPassword,"oldCode":oldCode,"checkCode":user.checkCode}
		data:login
	})
}

export function verify(oldCode){
	console.log(oldCode)
	return request({
		url: '/users/verify',
		method:'post',
		// responseType:"blob",  //加载流形式验证码
		params:{"oldCode":oldCode}
	})
}

/* 
同时传递对象和一个字符串
 控制层接受数据：
 @RequestBody SUsers users,String test
 */
export function test(user,test){
	console.log(user);
	console.log(test);
	return request({
		url: '/users/test',
		method:'post',
		data:user,
		params:{"test":test}
	})
}