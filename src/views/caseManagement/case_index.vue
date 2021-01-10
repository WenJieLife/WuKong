<template>
  <!-- <div>
    <el-menu
      :default-active="$route.path"
      class="case-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">查询用例</el-menu-item>
      <el-menu-item index="2">设计用例</el-menu-item>
    </el-menu>
  </div> -->
  <el-tabs type="border-card">
    <el-tab-pane label="查询用例">
      <div class="WKCaseQueryContainer case"><WKCaseQuery /></div>
    </el-tab-pane>
    <el-tab-pane label="设计用例">
      <div class="WKCaseDesignContainer"><WKCaseDesign /></div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import WKCaseDesign from "./case_design";
import WKCaseQuery from "./case";
export default {
  components: {
    WKCaseDesign,
    WKCaseQuery,
  },
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      //console.log(key);
      this.$router.push({
        path: key,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.case-menu {
  border-radius: 5px;
  border: 2px solid #a1a1a1;
}

.case {
  padding: 10px;
  height: 100%;
}
.WKCaseDesignContainer {
  widows: 100%;
}
</style>