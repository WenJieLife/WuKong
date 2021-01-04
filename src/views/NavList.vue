<template>
  <div class="nav-content">
    <!-- <NavList>
      <template name="before" v-slot:before />

      <template v-slot:default="props">
        <slot v-bind="props" />
      </template>

      <template name="after" v-slot:after />
    </NavList> -->

    <div class="content vue-ui-disable-scroll">
      <!-- <router-view /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "NavList",
  // props: {
  //   items: {
  //     type: Array,
  //     required: true
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.nav-content {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "nav content";

  > .nav-list {
    grid-area: nav;
  }

  > .content {
    grid-area: content;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>