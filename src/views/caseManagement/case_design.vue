<template>
  <div class="WKCaseDesign">
    <div class="WKDesignManager">
      <div class="components-container board">
        <baseboard
          :key="1"
          :list="list1"
          :group="group"
          class="WKDesignBoard"
          header-text="用例执行流程编排"
        />
      </div>
      <div class="WKCaseSave">
        <el-row>
          <el-button type="warning">重置</el-button>
          <el-button type="primary">保存</el-button>
        </el-row>
      </div>
    </div>
  </div>
  <div class="WKUseGlobalModules">
    <div class="components-container board">
      <baseboard
        :key="1"
        :list="list2"
        :group="group"
        class="WKUseModules"
        header-text="公共模块库"
      />
    </div>
  </div>
  <!-- <div class="WKCaseInfo">输出</div> -->
</template>
<script>
import baseboard from "./base_board";
export default {
  name: "DragBoard",
  components: {
    baseboard,
  },
  data() {
    return {
      group: "mission",
      list1: [
        { name: "账户登录", id: 1 },
        { name: "添加商品到购物车", id: 2 },
        { name: "提交付款", id: 3 },
        { name: "账户登出", id: 4 },
      ],
      list2: [
        { name: "ma", id: 5 },
        { name: "mb", id: 6 },
        { name: "mc", id: 7 },
      ],
      list3: [
        { name: "Mission", id: 8 },
        { name: "Mission", id: 9 },
        { name: "Mission", id: 10 },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
* {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  -webkit-touch-callout: none;
  user-select: none;
}

.WKCaseDesign {
  // display: flex;
  float: left;
  width: 61.8%;
}
.WKCaseSave {
  margin-top: 20px;
}
.WKCaseInfo {
  margin-top: 20px;
  height: auto;
  border-radius: 3px;
  background: rgb(170, 166, 166);
}
.board {
  // margin-left: 20px;
  // display: flex;
  // justify-content: space-around;
  // flex-direction: row;
  // align-items: flex-start;
}

.WKDesignBoard {
  min-width: 500px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
}
.WKUseGlobalModules {
  float: right;
}

.WKUseModules {
  // background: rgb(58, 55, 55);
  min-width: 400px;
}

.control {
  width: 100%;
  height: auto;
  border-radius: 3px 3px 0 0;
  background: rgb(170, 166, 166);
}
// .kanban {
//   &.todo {
//     .board-column-header {
//       background: #4a9ff9;
//     }
//   }
//   &.working {
//     .board-column-header {
//       background: #f9944a;
//     }
//   }
//   &.done {
//     .board-column-header {
//       background: #2ac06d;
//     }
//   }
// }
</style>