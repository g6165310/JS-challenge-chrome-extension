<template>
  <div>
    <div class="sentence-container" @dblclick="isEditing=true" v-if="!isEditing">
      <div class="sentence-text" v-for="(item,index) in adjustedText" :key="index">
        <p :class="{dark:nightMode}">{{item}}</p>
        <br v-if="index!=adjustedText.length-1">
      </div>
    </div>
    <div class="sentence-container" v-if="isEditing">
      <input
        type="text"
        class="edit-text"
        v-model="currentSentence.ctx"
        v-focus
        :class="{dark:nightMode}"
      >
      <div class="edit-btn" :class="{dark:nightMode}">
        <div class="btn" @click="updateSentence(currentSentence)">SAVE</div>
        <div class="btn" @click="cancel()">CANCLE</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "SentenceArea",
  data() {
    return {
      isEditing: false
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    cancel() {
      this.isEditing = !this.isEditing;
    },
    updateSentence(currentSentence) {
      this.$store.dispatch("updateSentence", currentSentence);
      this.isEditing = !this.isEditing;
    }
  },
  watch: {},
  computed: {
    ...mapGetters(["nightMode", "sentences"]),
    currentSentence: {
      get() {
        return this.$store.getters.currentSentence;
      },
      set(value) {
        this.$store.commit("SETSENTENCE", value);
      }
    },
    adjustedText: function() {
      if (
        !this.currentSentence ||
        typeof this.currentSentence.ctx != "string"
      ) {
        return;
      }
      let splitSymbol = null;
      if (this.currentSentence.ctx.indexOf("，") != -1) {
        splitSymbol = "，";
      } else {
        splitSymbol = ",";
      }
      let arr = this.currentSentence.ctx.split(splitSymbol);
      let result = [];
      if (arr.length > 1) {
        for (let i = 0; i < arr.length; i++) {
          if (i != arr.length - 1) {
            result.push(arr[i] + splitSymbol);
          } else {
            result.push(arr[i]);
          }
        }
      } else {
        result.push(this.currentSentence.ctx);
      }
      return result;
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.sentence-container {
  display: inline-flex;
  flex-direction: column;
  position: relative;
  margin-top: 336px;
  padding: 0 95px;
  font-weight: 700;
  &::before {
    content: "“";
    position: absolute;
    top: -192px;
    left: 0px;
    color: #000;
    text-shadow: -2px 0 #fff, 0 2px #fff, 2px 0 #fff, 0 -2px #fff;
    font-size: 160px;
    height: 187px;
  }
  input {
    font-size: 56px;
    border: none;
    box-shadow: 8px 8px #000;
    &.dark {
      background-color: #000;
      color: #fff;
      box-shadow: 8px 8px #fff;
    }
  }
  input:focus {
    outline: none;
  }
}
.sentence-text {
  p {
    display: inline-block;
    background-color: #fff;
    color: #000;
    font-size: 56px;
    line-height: 72px;
    &.dark {
      background-color: #000;
      color: #fff;
    }
  }
}
.edit-btn {
  margin-top: 45px;
  position: absolute;
  top: 117px;
  left: 16.1vw;
  .btn {
    display: inline-block;
    background: #000;
    color: #fff;
    padding: 16px 24px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }
  .btn:nth-child(2) {
    background: #fff;
    color: #000;
  }
  &.dark {
    .btn {
      background: #fff;
      color: #000;
    }
    .btn:nth-child(2) {
      background: #000;
      color: #fff;
    }
  }
}
@media screen and(max-width:768px) {
  .sentence-container {
    padding: 0 30px;
  }
}
</style>
