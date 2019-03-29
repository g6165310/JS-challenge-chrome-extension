<template>
  <div class="addSentence-container">
    <span :class="{dark:nightMode}">“新增語錄”</span>
    <div class="add-input" :class="{dark:nightMode}">
      <input type="text" v-model="newSentence" placeholder="請輸入幹話語錄" :class="{dark:nightMode}">
      <span :class="{dark:nightMode}" @click="addNewSentence()">&#10010;</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "AddSentenceArea",
  data() {
    return {
      newSentence: ""
    };
  },
  methods: {
    addNewSentence(){
      if(this.newSentence){
        this.$store.dispatch('addNewSentence',this.newSentence)
      }
      this.newSentence = ''
    }
  },
  computed: {
    ...mapGetters(["nightMode"])
  }
};
</script>
<style lang="scss" scoped>
.addSentence-container {
  position: relative;
  width: calc(100% - 300px);
  max-width: 70%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  span {
    display: inline-block;
    font-size: 56px;
    font-weight: 700;
    color: #fff;
    &.dark {
      color: #000;
    }
  }
  .add-input {
    margin-top: 25px;
    padding-bottom: 13px;
    border-width: 0 0 2px 0;
    border-style: solid;
    border-color: #fff;
    &.dark {
      border-color: #000;
    }
    input {
      width: calc(100% - 48px);
      font-weight: 700;
      vertical-align: top;
      font-size: 24px;
      background: transparent;
      border: none;
      line-height: 48px;
      color: #fff;
      &.dark {
        color: #000;
      }
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #fff;
      }
      &.dark::placeholder {
        color: #000;
      }
    }
    span {
      position: relative;
      text-align: center;
      width: 48px;
      height: 48px;
      font-size: 48px;
      color: white;
      cursor: pointer;
      &.dark {
        color: #000;
      }
    }
  }
}
@media screen and(max-width:768px) {
.addSentence-container{
  position: absolute;
  width: 80%;
  height: 30%;
  bottom: 0;
}
}
</style>
