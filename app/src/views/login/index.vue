<template>
    <div class="login">
        <el-form :label-position="labelPosition" label-width="80px" :rules="rules" ref="formLabelAlign" :model="formLabelAlign">
            <el-form-item label="账号:" prop="username">
                <el-input v-model="formLabelAlign.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input type="password" v-model="formLabelAlign.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formLabelAlign')">登录</el-button>
                <el-button @click="resetForm('formLabelAlign')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss" scoped>
    .login {
        width: 400px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-200px, -200px);
    }
</style>
<script>
import { login, getCode } from '@/api/login'
export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          username: "",
          password: ''
        },
        rules: {
            username: [
                { required: true, message: '请输入账号', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ]
        }
      };
    },
    created() {
     
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login("GET", "/api/user/login",this.$data.formLabelAlign).then(res => {
              if(res.status == 200) {
                this.$router.push({
                  path: '/home'
                })
              }
            }).catch(err => {
              throw err
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>


