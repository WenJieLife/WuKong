<template>
  <div class="case_design">
    <div class="design_manager">
      <div class="components-container board">
        <baseboard
          :key="1"
          :list="list1"
          :group="group"
          class="design_board"
          header-text="编排器"
        />
        <!-- <baseboard
          :key="2"
          :list="list2"
          :group="group"
          class="module_selector"
          header-text="模块库"
        /> -->
      </div>
    </div>

    <div class="module_selector">
      <div class="components-container board">
        <baseboard
          :key="1"
          :list="list2"
          :group="group"
          class="design_selector"
          header-text="模块库"
        />
      </div>
    </div>
  </div>
  <div class="board control">控制面板</div>
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

.case_design {
  display: flex;
  height: 60%;
}

.board {
  margin-left: 20px;
  // display: flex;
  // justify-content: space-around;
  // flex-direction: row;
  // align-items: flex-start;
}

.design_board {
  min-width: 500px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
}
.module_selector {
}

.design_selector {
  // background: rgb(58, 55, 55);
}

.control{
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