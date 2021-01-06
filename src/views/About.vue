<template>
  <div>
    <el-card shadow="hover" class="box-card">
      <div class="about">
        <div class="text">
          <h1 style="margin: 10px; font-size: 26px">
            智能测试中台 - <span style="color: red">悟空</span>
            <img
              src="../assets/wk_64.png"
              alt="logo"
              style="width: 25px; height: 25px;"
            />
          </h1>
          <div >
            
            <el-tag>{{ " " + this.version }}</el-tag>
          </div>
        </div>

        <!-- <div v-for="o in 4" :key="o" class="text item">
        {{ "列表内容 " + o }}
      </div> -->
        <hr />
        <div style="text-align: left"><h1>项目简介:</h1></div>
        <p>名称:{{ " " + this.project_name }}</p>
        <p>作者: {{ this.author }}</p>
        <p>技术栈: Vue3 + Flask + Locust 前后端分离</p>
        <p>反馈和建议: 微信加xiyou51666</p>
        <hr />
        <div style="text-align: left"><h1>版权声明:</h1></div>

        <p>
          <el-tag type="warning" style="font-size: 15px"
            >copyright: © 2021 Terry Li</el-tag
          >
        </p>
        <hr />
        <div style="text-align: left"><h1>项目地址:</h1></div>
        <el-link type="primary" :href="this.github_link" target="_blank" style="font-size: 18px"
          >GitHub - WuKong</el-link
        >
      </div>
    </el-card>
  </div>
</template>

<script>
// import { ref } from "vue";
export default {
  data() {
    return {
      version: process.env.VUE_APP_RELEASE,
      project_name: process.env.VUE_APP_TITLE,
      author: process.env.VUE_APP_AUTHOR,
      github_link: process.env.VUE_APP_SOURCE,
    };
  },
};
</script>


<style>
.text {
  text-align: center;
}

.about {
  margin: 0 auto;

  width: 350px;
  height: auto;
}
p {
  font-size: 15px;
}

.box-card {
  padding: 25px;
}
</style>