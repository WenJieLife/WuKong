<template>
  <div class="WK-login-plan">
    <div class="WK-login-bg"></div>
    <div class="WK-login-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="WK-login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="WK-title-container">
          <h3 class="WK-title">{{ title }}</h3>
        </div>

        <el-form-item prop="username">
          <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
          </span>-->
          <el-input
            prefix-icon="el-icon-user"
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
          </span>-->
          <el-input
            prefix-icon="el-icon-key"
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click="handleLogin"
          >Login</el-button
        >

        <div class="tips">
          <!-- <span style="margin-right:20px;">username: admin</span>
          <span>password: any</span> -->
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/lib/validate";
import { login } from "@/utils/api/login";

export default {
  name: "Login",

  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "admin",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      title: process.env.VUE_APP_TITLE,
    };
  },
  // watch: {
  //   $route: {
  //     handler: function (route) {
  //       this.redirect = route.query && route.query.redirect;
  //     },
  //     immediate: true,
  //   },
  // },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      if (login(this.loginForm)) {
        this.$router.push("/");
      }

      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true;
      //     this.$store
      //       .dispatch("user/login", this.loginForm)
      //       .then(() => {
      //         this.$router.push({ path: this.redirect || "/" });
      //         this.loading = false;
      //       })
      //       .catch(() => {
      //         this.loading = false;
      //       });
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #289dde;

.WK-login-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/bg.svg");
  background-size: cover;
  background-repeat: no-repeat;
}

.WK-title {
  width: 100%;
  line-height: 20px;
  text-align: center;
  font-size: 30px;
  color: $light_gray;
  font-weight: bold;
  // border-bottom: 1px solid #ddd;
}
.WK-login-container {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 430px;
  transform: translate(-50%, -61.8%);
  // margin: -190px 0 0 -175px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  overflow: hidden;
}
.WK-login-form {
  padding: 16px 30px;
}
</style>
