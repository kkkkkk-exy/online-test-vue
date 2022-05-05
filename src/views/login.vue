<template>
  <div class="login_page fillcontain">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      v-loading="loading"
      element-loading-text="正在登录……"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="login-box"
    >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="name" label-position="top">
        <el-input
          type="text"
          placeholder="请输入用户名"
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="button" @click="submitForm('form')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../api/getData";
import { instance } from "../api/getData";
// import { resolve } from "core-js/fn/promise";

export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        // loading:false
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            username: this.form.name,
            password: this.form.password,
          };
          login(data).then((res) => {
            if (res.status == 200) {
              if (res.data.code == 1) {
                instance.defaults.headers.common["Authorization"] =
                  "Bearer" + res.data.token;
                window.localStorage.setItem("token", res.data.token);
                console.log(window.localStorage.getItem("token"));
                console.log("已存入localstorage");
                // resolve(res)
                this.$message({
                  type: "success",
                  message: "登录成功",
                });
                this.$router.push("/main");
                
                
              }
            }
          });
          

          // this.loading = true;
        } else {
          this.$message({
            message: "请输入用户名和密码",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}
.login_page {
  /* display: flex; */
  position: fixed;
  background-image: url("../assets/Honeyview_few things about me.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
.button {
  background-color: #d1c7b7;
  border: none;
  margin: 0 auto;
}
.login-box {
  width: 350px;
  margin: 120px auto;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 5px;
  /* box-shadow: 0 0 30px #dcdfe6; */
  background: white;
}
.login-title {
  text-align: center;
}
.fillcontain {
  width: 100%;
  height: 100%;
}
</style>