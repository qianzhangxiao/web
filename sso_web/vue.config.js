// vue.config.js
module.exports = {
	publicPath: './',  //解决打包静态资源无法访问
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