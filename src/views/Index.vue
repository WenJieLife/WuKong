<template>
  <el-container style="height: 100vh">
    <el-aside
      width="auto"
      style="z-index: 2; box-shadow: 2px 0 10px rgba(1, 171, 251, 0.1)"
      @mouseenter="open"
      @mouseleave="close"
    >
      <el-menu
        class="muf_menu"
        @select="handleSelect"
        mode="vertical"
        :collapse="data.menu_pull_open"
        :default-active="$route.path"
        router
      >
        <template v-for="(item, index) in data.routers" :key="index">
          <el-menu-item
            :index="item.path"
            style="width: auto; min-width: 180px"
          >
            <i
              :class="item.class"
              style="margin-right: 25px; font-size: 25px"
            ></i>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header div="header" style="height: 55px">
        <div class="model-title">
          {{ data.current_title }}
        </div>
        <div class="model-title-spacer"></div>

        <div class="el-icon-user">
          <span style="font-size: 15px; margin-left: 5px">{{
            data.user.username
          }}</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div>
          <button
            @click="logout"
            class="el-icon-switch-button model-close"
          ></button>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div>
          <img
            src="../assets/wk128.png"
            alt="logo"
            style="width: 32px; height: 32px"
          />
        </div>

        <!-- <div class="sys-version-info">{{data.release}}</div> -->
        <!-- <ul class="nav">
          <li class="nav-item">
            <span class="minor">{{ data.gitTag }}</span>
          </li>
          <li class="nav-item">
            <el-divider direction="vertical"></el-divider>
          </li>
          <li class="nav-item">
            <span class="minor">{{ data.release }}</span>
          </li>
          <li class="nav-item">
            <el-divider direction="vertical"></el-divider>
          </li>
          <li class="nav-item"> -->
        <!-- <span class="minor"
              ><i class="el-icon-user-solid">{{ data.user.username }}</i></span
            > -->
        <!-- </li>
          <li class="nav-item">
            <el-divider direction="vertical"></el-divider>
          </li>
          <li class="nav-item" @click="logout">
            <span class="minor"><i class="el-icon-switch-button">退出</i></span>
          </li>
        </ul> -->
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
  <el-backtop />
</template>

<script>
import { reactive } from "vue";
import { getUser } from "@/utils/lib/user";
export default {
  methods: {
    open() {
      this.data.menu_pull_open = false;
    },
    close() {
      this.data.menu_pull_open = true;
    },
    logout() {
      console.log("logout!");
      this.$router.push("/login");
      // this.data.user.logout().then((state) => {
      //   if (state) {
      //     location.reload();
      //   }
      // });
    },
    handleSelect(key) {
      this.data.current_title = key;
      //console.log(key);
      this.$router.push({
        path: key,
      });
    },
  },
  setup() {
    const data = reactive({
      current_title: "Hello,欢迎回来 ~",
      menu_pull_open: true,
      user: getUser(),
      routers: [
        {
          class: "el-icon-s-grid",
          title: "Dashboard",
          path: "/dashboard",
        },
        {
          class: "el-icon-thumb",
          title: "用例管理",
          path: "/case_reactor",
        },
        {
          class: "el-icon-truck",
          title: "用例执行",
          path: "/case_launch",
        },
        {
          class: "el-icon-odometer",
          title: "性能测试",
          path: "/performance_assessment",
        },
        {
          class: "el-icon-attract",
          title: "MagicMock",
          path: "/magic_mock",
        },
        {
          class: "el-icon-data-analysis",
          title: "报告收集",
          path: "/result_analysis",
        },
        {
          class: "el-icon-s-cooperation",
          title: "常用工具",
          path: "/tools",
        },
        {
          class: "el-icon-s-custom",
          title: "账户管理",
          path: "/account_management",
        },
        {
          class: "el-icon-s-tools",
          title: "系统设置",
          path: "/sys_setting",
        },
        {
          class: "el-icon-s-opportunity",
          title: "关于悟空",
          path: "/about",
        },
      ],
    });
    return { data };
  },
};
</script>

<style scoped>
.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out,
    0s padding-right ease-in-out;
}

/* .menu-logo {
  height: 58px;
} */
.muf_menu {
  margin: 55px 5px 5px 5px;
  padding-left: 0;
  background-color: #fff;
}

.nav {
  float: right;
}

.nav-item {
  margin: 0;
  float: left;
  list-style: none;
  position: relative;
  cursor: pointer;
}

.el-aside {
  overflow-x: hidden;
  background-color: #ffffff;
  line-height: 200px;
}

.el-row {
  margin-top: 15px;
}

.el-main {
  background-color: #f2f6fc;
}
.el-header {
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  z-index: 1;
  /* font-size: 16px; */
  /* background: #1c2018; */
}
.model-title {
  display: block;
  font-size: 28px;
  font-weight: normal;
  color: #22ad79;
}

.model-title-spacer {
  flex: auto 1 1 !important;
  width: 0;
  height: 0;
}

.model-close {
  display: block;
  color: #ff0000;
}

.sys-version-info {
  color: #747070;
}

a {
  color: #333;
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

/* * {
  font-size: 14px;
} */

.el-table .cell {
  white-space: pre-line;
}

.el-scrollbar__wrap {
  overflow: scroll;
  margin-right: -60px;
  height: 110%;
}

.el-autocomplete {
  width: 200px;
}

.el-dialog {
  margin: 5vh auto !important;
  max-height: 90vh !important;
  min-height: 5vh;
  overflow-y: auto;
}

.el-dialog__body {
  overflow: auto;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #eaecf1;
  border-radius: 3px;
}
</style>

