<template>
  <div class="menu-icon" @click="test()" v-if='!isShowSideBar' :class="{dark:nightMode}">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "HamburgerIcon",
  methods: {
    test() {
      this.$store.dispatch("isShowSideBar", !this.isShowSideBar);
    }
  },
  computed: {
    ...mapGetters(["nightMode","isShowSideBar"])
  }
};
</script>
<style lang="scss" scoped>
.menu-icon {
  position: absolute;
  top: 40px;
  right: 85px;
  width: 48px;
  height: 48px;
  padding: 12px 6px;
  cursor: pointer;
  span {
    display: block;
    height: 4px;
    width: 100%;
    background-color: #fff;
    margin: 6px 0;
  }
  &.dark{
    span{
      background-color: #000;
    }
  }
}
@media screen and(max-wiidth:768px){
  .menu-icon{
    right: 30px;
  }
}
</style>
