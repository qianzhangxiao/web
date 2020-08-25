// vue.config.js
module.exports = {
  // options...
  devServer:{
	  port:8088,
	  //设置域名访问系统
	  allowedHosts:[
		  'localhost',
		  '192.168.137.1',
		  'www.sso.com'
	  ]
  }
}