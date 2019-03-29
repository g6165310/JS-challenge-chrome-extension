<template>
  <div class="sidebar" :class="{show:isShowSideBar,dark:nightMode}">
    <div class="sidebar-content">
      <div class="night-mode">
        <h4 :class="{dark:nightMode}">夜間模式</h4>
        <ToggleButton/>
      </div>
      <div class="table" :class="{dark:nightMode}">
        <div class="table-thead">我的語錄</div>
        <div class="table-body">
          <div class="table-row" v-for="(item,index) in sentences" :key="index">
            <p v-if="editingIndex!=index">{{item}}</p>
            <input
              type="text"
              :value="item"
              @blur="changeEditingText"
              @keydown.enter="changeEditingText"
              v-if="editingIndex===index"
              v-focus
            >
            <div @click="edit(index)">
              <i class="fas fa-pen"></i>
            </div>
            <div @click="del(index)">
              <i class="fas fa-trash"></i>
            </div>
          </div>
          <div v-if="isAdding" class="table-row">
            <input type="text" @keydown.enter="addNew" @blur="addNew" v-focus>
          </div>
        </div>
      </div>
      <div class="add-btn" :class="{dark:nightMode}" @click="isAdding = true">+ 新增語錄</div>
    </div>
  </div>
</template>

<script>
import ToggleButton from "./ToggleButton";
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  data() {
    return {
      editingText: "",
      isEditing: false,
      editingIndex: null,
      isAdding: false,
      newSentence: ""
    };
  },
  components: {
    ToggleButton
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    hideSideBar() {
      this.$store.dispatch("isShowSideBar", !this.isShowSideBar);
    },
    changeEditingText(e) {
      this.editingText = e.target.value;
      this.$store.dispatch("updateSentence", {
        ctx: this.editingText,
        index: this.editingIndex
      });
      this.editingIndex = null;
    },
    addNew(e) {
      this.newSentence = e.target.value;
      if (
        this.newSentence &&
        this.$store.state.sentences.indexOf(this.newSentence) == -1
      ) {
        this.$store.dispatch("addNewSentence", this.newSentence);
      }
      this.editingIndex = null;
      this.isAdding = false;
    },
    edit(index) {
      this.isEditing = true;
      this.editingIndex = index;
    },
    del(index) {
      this.$store.dispatch("deleteSentence", index);
    }
  },
  computed: {
    ...mapGetters(["nightMode", "isShowSideBar", "sentences"])
  },
  created() {
    this.$store.dispatch("getloacalData");
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  width: 100%;
  height: 100%;
  padding: 28px 24px;
  background-color: #fff;
  &.dark {
    background-color: #000;
    .night-mode {
      border-bottom: 1px solid #fff;
    }
  }
}
.sidebar-content {
  height: 100%;
  width: 100%;
  .night-mode {
    display: flex;
    justify-content: space-between;
    padding-bottom: 24px;
    border-bottom: 1px solid;
  }
  .toggle-btn {
    display: block;
  }
}
h4 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  &.dark {
    color: #fff;
  }
}
.table {
  margin-top: 16px;
  width: 100%;
  height: calc(100% - 138px);
  &.dark {
    div,
    p {
      color: #fff;
    }
    .table-row {
      border-bottom: 1px solid #fff;
    }
    input {
      color: #fff;
      background-color: #000;
    }
  }
}
.table-thead {
  font-weight: 700;
  text-align: left;
  font-size: 24px;
  padding: 16px 0;
}
.table-body {
  height: calc(100% - 96px);
  overflow: auto;
}
.table-row {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #000;
  p,
  div {
    font-size: 16px;
  }
  p {
    flex: 4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div {
    text-align: center;
    flex: 1;
    i {
      cursor: pointer;
    }
  }
}
input {
  border: none;
  font-size: 16px;
  flex: 4;
  &:focus {
    outline: none;
    font-weight: 700;
  }
}
::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
  border-radius: 10px;
}
.add-btn {
  position: relative;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  background-color: transparent;
  line-height: 60px;
  text-align: center;
  width: 100%;
  height: 60px;
  margin-top: 16px 0;
  z-index: 12;
  &::after {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    transform-origin: center;
    transition: width 0.3s, height 0.3s;
    z-index: -1;
  }
  &::before {
    content: "";
    position: absolute;
    height: 60px;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    z-index: -1;
  }

  &.dark {
    color: #000;
  }
  &.dark::before {
    background-color: #fff;
  }
  &.dark::after {
    background-color: #000;
  }
  &:hover {
    color: #000;
    transition: color 0.3s;
  }
  &.dark:hover {
    color: #fff;
  }
  &:hover::after {
    height: 55px;
    width: calc(100% - 5px);
  }
}
</style>