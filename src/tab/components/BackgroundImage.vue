<template>
  <div class="bg-container" :class="{left:isShowSideBar,dark:!nightMode}">
    <div
      class="bg-img"
      :style="nightMode!=true?
  {'backgroundImage':'url(https://source.unsplash.com/collection/3405681/1600x900)'}:
  {'backgroundImage':'url(https://source.unsplash.com/collection/2737036/1600x900)'}"
    ></div>
    
  </div>
</template>

<script>

import { mapGetters } from "vuex";
export default {
  name: "BackgroundImage",
  components: {
  },
  computed:{
    ...mapGetters(["nightMode","isShowSideBar"])
  }
};
</script>

<style scoped lang="scss">
.bg-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  transition: all .3s;
  &.left{
    transform: translateX(-40%)
  }
  &.left::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: .8;
  }
    &.left.dark::before{
    background-color: #000;
    opacity: .6;
  }
}
.bg-img{
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
@media screen and(max-width:768px) {
  .bg-container{
    width: 100%;
    &.left{
      transform: none
    }
  }
 
}
</style>