<template>
  <div class="toggle-btn" @click='changeMode()' :class='{night:nightMode}'>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ToggleButton",
  methods:{
    changeMode(){
      this.$store.dispatch("changeMode", !this.nightMode);
    }
  },
  computed:{
    ...mapGetters(['nightMode','isShowSideBar'])
  },
  created(){
  },
};
</script>

<style scoped lang="scss">
.toggle-btn{
  position: relative;
  width: 65px;
  height: 32px;
  background-color: rgba(237, 237, 237, .7);
  border-radius: 15px;
  cursor: pointer;
  &::before{
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: #fff;
    transition: all .3s;
  }
  &.night::before{
      background-color: #000;
      left: 37px;
    }
  &.night{
    background-color: rgba(87, 87, 87, .7);
  }
}

</style>