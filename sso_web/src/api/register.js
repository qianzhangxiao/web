import request from '@/utils/http'

export function checkRepeat(userName,userEmail){
	return request({
		url:'/users/checkUser',
		method:'get',
		params:{
			'userName':userName,
			'userEmail':userEmail
		}
	})
}

export function register(users){
	return request({
		url: '/users/register',
		method: 'post',
		data:users
	})
}