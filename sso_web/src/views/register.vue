<template>
	<div>
		
		<el-container id="register">
		  <el-header class='register-header'>
				<span class="register_word">{{register}}</span>
		  </el-header>
		  <el-main class='register-main'>
			  <div class='register-form'>
				 <p class="register-text">注册</p>
				 <el-form :model="users" status-icon :rules="rules" ref="users" label-width="100px" class="demo-ruleForm">
				   <el-form-item label="用户名" prop="userName">
				     <el-input type="text" v-model="users.userName" autocomplete="off"></el-input>
				   </el-form-item>
				   <el-form-item label="密码" prop="userPassword">
				     <el-input type="password" v-model="users.userPassword" autocomplete="off"></el-input>
				   </el-form-item>
				   <el-form-item label="确认密码" prop="checkPass">
				     <el-input type="password" v-model="users.checkPass" autocomplete="off"></el-input>
				   </el-form-item>
				   <el-form-item label="邮箱" prop="userEmail">
				     <el-input type="email" v-model="users.userEmail"></el-input>
				   </el-form-item>
				   <el-form-item>
				     <el-button type="primary" @click="submitForm('users')">提交</el-button>
				     <el-button @click="resetForm('users')">重置</el-button>
					 <el-button type='success' @click="goLogin">返回登录</el-button>
				   </el-form-item>
				 </el-form>
			  </div>
		  </el-main>
		</el-container>
		
		
	</div>
</template>

<script>
	import {checkRepeat , register} from '@/api/register/'
	
	export default{
		
		data() {
				let checkUserName=(rule,value,callback)=>{
					if(!value){
						return callback(new Error('用户名不能为空'));
					}
					if(value.length<5){
						return callback(new Error('用户名长度不能小于5'));
					}
					let nameReg=/^[A-z]+[A-z0-9]{4,}$/;
					if(!nameReg.test(value)){
						return callback(new Error('用户名以字符开头'));
					}
					this.checkName(value,callback);
				};
				let checkEmail=(rule,value,callback)=>{
					this.checkEmail(value,callback);
				}
			  let validatePass = (rule, value, callback) => {
				if (value === '') {
				  callback(new Error('请输入密码'));
				} else {
				  if (this.users.checkPass !== '') {
					this.$refs.users.validateField('checkPass');
				  }
				  let pwdReg=/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{5,}$/					if(!pwdReg.test(value)){
						return callback(new Error('密码包含五位以上大小字字母，数字和特殊符号中两种'))
					}
				  callback();
				}
			  };
			  let validatePass2 = (rule, value, callback) => {
				if (value === '') {
				  callback(new Error('请再次输入密码'));
				} else if (value !== this.users.userPassword) {
				  callback(new Error('两次输入密码不一致!'));
				} else {
				  callback();
				}
			  };
			return {
				register: "统一认证中心",
				users: {
				  userName:'',
				  userPassword: '',
				  checkPass: '',
				  userEmail: ''
				},
				rules: {
				  userName:[
					  { validator: checkUserName, trigger: 'blur' }
				  ],
				  userPassword: [
					{ validator: validatePass, trigger: 'blur' }
				  ],
				  checkPass: [
					{ validator: validatePass2, trigger: 'blur' }
				  ],
				  userEmail: [
					{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
					{ validator: checkEmail, trigger: 'blur' }
				  ]
				}
			}
		},
		methods:{
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					register(this.users).then(res=>{
						if(res.status=='200'){
							this.$alert(res.msg, '注册成功', {
							  confirmButtonText: '确定'
							});
							this.resetForm(formName);
						}else{
							this.$message({
								type:'error',
								message:"用户信息不存在"
							})
						}
						
					})
				  } else {
					this.$message({
						type:'error',
						message:'表单校验失败'
					})
					return false;
				  }
				});
			},
			  resetForm(formName) {
					this.$refs[formName].resetFields();
			  },
			  checkName(userName,callback){
				  checkRepeat(userName,null).then(res=>{
					  console.log(res);
					  if(res.status=='500'){
						  return callback(new Error(res.msg));
					  }
					  if(res.status=='200'){
						  callback();
					  }
					  
				  })
			  },
			  checkEmail(userEmail,callback){
				  checkRepeat(null,userEmail).then(res=>{
					  if(res.status=='500'){
					  		return callback(new Error(res.msg));
					  }
					  if(res.status=='200'){
					  		callback();
					  }
				  })
			  },
			  goLogin(){
					this.$router.push({
						name:'login'
					})
			  }
			  
		  }
		
		
	}
	
</script>

<style scoped="scoped">
	.register-header{
		background: #007700;
		text-align: center;
		line-height: 3;
	}
	.register-main{
		background-color: papayawhip;
		height:600px;
		background-size:cover;
		background-size:100% 100%;
	}
	.register_word{
		font-family: "PingFang SC";
		font-size: 18px;
		color: #00E0E0;
	}
	.register-form{
		width: 40%;
		height: 90%;
		margin:0 auto;
		border: 1px solid wheat;
	}
	.register-text{
		text-align: center;
		font-size: 20px;
		color: #00E0E0;
	}
	
</style>
