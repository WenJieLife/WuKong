<template>
  <div>
    <div class="tools-head">
      <!-- <div class="head"></div> -->
      <!-- <el-button size="small" @click="addTab(editableTabsValue)">
        add tab
      </el-button> -->
      <el-dropdown @command="createTab" class="dropdown-position">
        <span class="el-dropdown-link">
          数据格式化<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="Json">Json格式化</el-dropdown-item>
            <el-dropdown-item command="Schema">Schema</el-dropdown-item>
            <el-dropdown-item command="A_to_U">ASCII转UTF-8</el-dropdown-item>
            <el-dropdown-item command="Py_Object" disabled>Python对象</el-dropdown-item>
            <el-dropdown-item command="Check_Res" divided>Unicode转UTF-8</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown @command="createTab" class="dropdown-position">
        <span class="el-dropdown-link">
          造数据<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="generate_uuid">UUID</el-dropdown-item>
            <el-dropdown-item command="generate_ts">时间戳</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div>
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        closable
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          {{ item.content }}
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editableTabsValue: "0",
      editableTabs: [
        // {
        //   title: "Tab 1",
        //   name: "1",
        //   content: "Tab 1 content",
        // },
      ],
      tabIndex: 0,
    };
  },
  methods: {
    // addTab(targetName) {
    //   let newTabName = ++this.tabIndex + "";
    //   this.editableTabs.push({
    //     title: "New Tab",
    //     name: newTabName,
    //     content: "New Tab content",
    //   });
    //   this.editableTabsValue = newTabName;
    //   console.log(targetName);
    // },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
    createTab(command) {
      let feature;
      // function feature(a){};
      switch (command) {
        case "Json":
          feature = "星期天";
          break;
        case "Check_Res":
          feature = "Check_Res";
          break;
        case "A_to_U":
          feature = "A_to_U";
          break;
        case "Schema":
          feature = "schema";
          break;
        case "e":
          feature = "星期四";
          break;
        case "generate_uuid":
          feature = "generate_uuid";
          break;
        case "generate_ts":
          feature = "generate_ts";
      }
      this.$message("click on item " + feature);
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: feature,
        name: newTabName,
        content: feature + '{"key":"value"}',
      });
      this.editableTabsValue = newTabName;
    },
  },
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  /* color: #ffffff; */
}
.el-icon-arrow-down {
  font-size: 13px;
}
.tools-head {
  background-color: rgb(199, 237, 204);
  height: 50px;
  width: auto;
  margin-bottom: 13px;
  border-radius: 5px;
  /* text-align: initial; */
  line-height: 50px;
  /* padding: 3px, 3px; */
}
/* .dropdown-position{
    margin: auto;
} */

.el-dropdown{
    margin-left: 20px;
    font-size: 15px;
    color: #354046;
}
</style>