<template>
	<div>
		<el-container id="login">
		  <el-header class='login-header'>
				<span class="login_word">{{hello}}</span>
		  </el-header>
		  <el-main class='login-main'>
			  <div class='login-form'>
				  <span class="login-text">登录</span>
				  <el-form :model="login" :rules="rules" status-icon ref="user_form" label-width="100px" class="demo-ruleForm">
					 <el-form-item label="用户名/邮箱" prop="name">
						<el-input v-model="login.name" label='用户名'></el-input>
					  </el-form-item>
					<el-form-item label="密码" prop="pwd">
					  <el-input type="password" v-model="login.pwd" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="验证码" prop="checkCode">
					  <el-input class="code_input"  v-model="login.checkCode" autocomplete="off"></el-input>
					  <img class="code_img" @click="getCode" :src="verifyImg" alt="验证码" title="看不清楚？点击切换">
					</el-form-item>
					<el-form-item>
					  <el-button type="primary" @click="submitForm('user_form')">登录</el-button>
					  <el-button @click="resetForm('user_form')">重置</el-button>
					  <el-button type='success' @click="goRegister">前往注册</el-button>
					</el-form-item>
				  </el-form>
			  </div>
		  </el-main>
		</el-container>
		
	</div>
</template>

<script>
	import {login,verify,test} from '@/api/login'
	export default{
		data() {
			return {
				hello: '统一认证中心',
				login:{
					name:'',
					pwd: '',
					checkCode:'',
					oldCode:''
				},
				
				rules: {
					name: [
						{ required: true, message: '请输入用户名或者邮箱', trigger: 'blur' },
						{ min: 2, message: '长度最小为2个字符', trigger: 'blur' }
					],
					pwd:[
						{
							required: true,message: '请输入密码', trigger: 'blur'
						}
					],
					checkCode:[
						{ required: true, message: '请输入验证码', trigger: 'blur' }
					]
				},
				redirectUrl:'',
				verifyImg:''
			}
			
		},
		methods:{
			resetForm(formName) {
			     this.$refs[formName].resetFields();
			},
			submitForm(formName) {
				console.log(this.login)
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					login(this.login).then((res)=>{
						console.log(res);
						if(res.status=="400"){
							this.$message({
								type:'error',
								message:res.msg
							})
							this.getCode();
						}else{
							// window.location.href=this.redirctUrl+"?token="+res.result
							alert("登录成功")
							console.log(res.result)
						}
					})
				  } else {
					this.$message({
						type:'error',
						message:'表单校验失败'
					})
					this.getCode();
					return false;
				  }
				  
				});
				// 
			  },
			goRegister(){
				// test(this.login,"hello").then(res=>{
				// 	console.log("res");
				// })
				this.$router.push({
					name:'register'
				})
			},
			/* 
				流形式获取验证码
				请求方式需要加上：responseType:"blob",
				getCode(){
				verify().then(res=>{
					this.verifyImg=window.URL.createObjectURL(res);
				})
			} */
			getCode(){
				verify(this.login.oldCode).then(res=>{
					if(res.status=='200'){
						this.$message({
							type:'success',
							message:res.msg
						})
						this.login.oldCode=res.result.codeKey;
						this.verifyImg=res.result.img;
					}
				})
			},
			checkAccount(code){
				if(code==null||code==""||code==undefined){
					return;
				}
				if(code=="active"){
					this.$alert('您的账号已成功激活，请登录', '激活成功', {
					          confirmButtonText: '确定'
					          
					});
				}else if(code=="isActive"){
					this.$alert('您的账号无需再次激活', '激活失败', {
					          confirmButtonText: '确定'
					          
					});
				}else{
					this.$alert('您的账号激活失败，系统可能出现了未知错误', '激活失败', {
					          confirmButtonText: '确定'
					          
					});
				}
				
			}
		},
		mounted() {
			this.redirectUrl=this.$route.query.redirectUrl;
			this.checkAccount(this.$route.query.isActive);
			this.getCode();
		}
	}
</script>

<style scoped="scoped">
	.login-header{
		background: #007700;
		text-align: center;
		line-height: 3;
	}
	.login-main{
		background-color: #000000;
		height:600px;
		background-size:cover;
		background: url(../assets/images/login-bg.jpg) no-repeat;
		background-size:100% 100%;
	}
	.login_word{
		font-family: "PingFang SC";
		font-size: 18px;
		color: #00E0E0;
	}
	.login-logo{
		width:150px;
		height: 100%;
	}
	.login-form{
		width:400px;
		height: 400px;
		position: absolute;
		right: 60px;
		top: 100px;
		border: 1px solid #00FF00;
		background-color: #31A354;
	}
	.login-form form{
		margin-top: 40px;
	}
	.code_input{
		float: left;
		width:45%;
		padding-top: -20px;
	}
	.code_img{
		float: left;
		width: 50%;
		height: 40px;
		padding-left: 10px;
	}
	.login-text{
		display: inline-block;
		width: 100%;
		height: 20px;
		line-height: 20px;
		margin-top: 20px;
		font-size: 20px;
		text-align: center;
		color: #00E0E0;
	}
</style>
