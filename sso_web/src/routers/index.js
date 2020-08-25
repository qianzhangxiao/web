import Vue from 'vue';
import Router from "vue-router";

import login from '@/views/login';
import error from '@/views/error/404';
import register from '@/views/register';

Vue.use(Router)
export default new Router({
	 mode:'history',
	routes: [
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login/',
			name: 'login',
			component: login
		},
		{
			path: '*',
			component: error
		},
		{
			path: '/register',
			name: 'register',
			component: register
		}
		
	]
})

