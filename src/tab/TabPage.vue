<template>
  <div class="container" :class="{dark:nightMode}">
    <BackgroundImage/>
    <SentenceArea v-show="!isShowSideBar"/>
    <ToggleButton v-if="!isShowSideBar"/>
    <AddSentenceArea v-if="isShowSideBar"/>
    <HamburgerIcon/>
    <SideBar/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BackgroundImage from "./components/BackgroundImage";
import ToggleButton from "./components/ToggleButton";
import HamburgerIcon from "./components/HamburgerIcon";
import SideBar from "./components/SideBar";
import SentenceArea from "./components/SentenceArea";
import AddSentenceArea from "./components/AddSentenceArea";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    BackgroundImage,
    ToggleButton,
    HamburgerIcon,
    SideBar,
    SentenceArea,
    AddSentenceArea
  },
  methods: {},
  computed: {
    ...mapGetters(["nightMode", "isShowSideBar"])
  },
  created() {
    this.$store.dispatch("getloacalData");
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  padding: 40px 85px;
  overflow: hidden;
  &.dark {
    background-color: #000;
  }
  .toggle-btn {
    position: absolute;
    bottom: 40px;
    right: 85px;
  }
}
@media screen and(max-width:768px) {
  .container .toggle-btn {
    right: 30px;
  }
}
</style>